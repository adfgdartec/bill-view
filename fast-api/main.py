from fastapi import FastAPI
import httpx # or import requests
from ollama import chat
import duckduckgo_search
import psycopg2
from asyncio import run
import json
import os
import requests
from bs4 import BeautifulSoup
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import re




db = psycopg2.connect(database="BillView",
                        host="localhost",
                        user="postgres",
                        password="Reddy123!",
                        port="5432")

cursor = db.cursor()

app = FastAPI()



HEADERS = {"User-Agent": "BillAnalyzer/1.0 (+https://example.com)"}

LEGI_SCAN_API_KEY = os.getenv("LEGI_SCAN_API_KEY")
PROPUBLICA_API_KEY = os.getenv("PROPUBLICA_API_KEY")



"""async def fetch_data(page: str):
    external_api_url = "https://api.congress.gov/v3/bill/119?offset=" + str(page) + "&limit="+ str(limit) + "&api_key=QtI83GenQb7n6jCofB5iHTYrGXzYnlDpwZ7ek4mc" # Example external API

    try:
        # Using httpx for async requests
        async with httpx.AsyncClient() as client:
            response = await client.get(external_api_url)
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
            data = response.json()
        return data

    except httpx.HTTPStatusError as e:
        return {"status": "error", "message": f"HTTP error occurred: {e.response.status_code} - {e.response.text}"}
    except httpx.RequestError as e:
        return {"status": "error", "message": f"An error occurred while requesting: {e}"}
data = run(fetch_data(0))

for i in range(0, limit):
    print(json.dumps(data, indent=4))
    print(data["bills"][i]["congress"])
    cursor.execute("INSERT INTO test (title, congress, bill_number) VALUES (%s, %s, %s)", (data["bills"][i]["title"],  data["bills"][i]["congress"], data["bills"][i]["number"]))
    db.commit()"""

# Utils functions
def extract_bill_ids(text):
    # Gets bill identifieers like House or Senate Bills with id of bill based on classification
    pattern=r'\b(H\.?R\.?S\/?)\s*\.?\s*(\d{1,6})\b'
    # Uses re to find all matches of encoded pattern in document and returns them
    matches = re.findall(pattern, text, re.IGNORECASE)
    ids = []
    for pfx, num in matches:
        p = pfx.upper().replace(".", "")
        ids.append(f"{p} {num}")
    return list(dict.fromkeys(ids))

def safe_get(url, params=None, headers=None, timeout=10):
    try:
        r = requests.get(url, params=params, headers=headers or HEADERS, timeout=timeout)
        r.raise_for_status()
        return r
    except Exception as e:
        print(f"[WARN] Failed {url}: {e}")
        return None

# All Web Scrapers
def fetch_legiscan(bill_id: str) -> list[dict]:
    """
    Use LegiScan API to fetch bill info, texts, votes, amendments.
    Returns list of document dicts (id, text, metadata).
    """
    if LEGI_SCAN_API_KEY is None:
        return []
    # Legiscan uses bill and text endpoints. First, get search of bill.
    # The “bill” endpoint: https://api.legiscan.com/?key=APIKEY&op=getBill&id=BILLID or
    # also you can search by bill number with op=search.  
    out = []
    # 1. Search by bill number
    num = bill_id.split(" ")[1]
    pfx = bill_id.split(" ")[0].lower() # -> hr or s (house of reps or senate)
    # LegiScan search: op=search & state=US & billnumber=...
    params = {
        "key": LEGI_SCAN_API_KEY,
        "op": "search",
        "state": "US",
        "billnumber": num
    }
    # Run request
    r = safe_get("https://api.legiscan.com/", params=params)
    if not r:
        return []
    js = r.json()
    
    bills = js.get("searchResult", [])
    target = None
    for b in bills:
        if b.get("bill_number") == num and b.get("bill_type").lower() == pfx:
            target = b
            break
    if target is None and bills:
        target = bills[0]
    if not target:
        return []
    
    internal_bill_id = target.get("bill_id")
    #2. Fetch detailed bill
    params2 = {
        "key": LEGI_SCAN_API_KEY,
        "op": "getBill",
        "id": internal_bill_id
    }
    r2 = safe_get("https://api.legiscan.com/", params=params2)
    if not r2:
        return []
    bj = r2.json().get("bill")
    if not bj:
        return []
    
    # Construct metadata and bill text
    metadata = {
        "source": "legiscan",
        "bill_id_internal": internal_bill_id,
        "title": bj.get("title"),
        "status": bj.get("status"),
        "sponsor": bj.get("sponsor"),
        "cosponsers": bj.get("cosponsors"),
        "ammendments": bj.get("ammendments"),
        "subjects": bj.get("subjects"),
        "actions": bj.get("history"),
        "votes": bj.get("votes"),
        "committees": bj.get("commitee_ids")
    }

    texts = bj.get("texts", [])
    combined_text = ""
    for t in texts:
        combined_text += tget("text", "") + "\n"
    out.append({
        "id": f"legiscan_{internal_bill_id}",
        "text": combined_text,
        "metadata": metadata
    })
    return out

def fetch_propublica(bill_id: str) -> list[dict]:
    """
    Use ProPublica Congress API to fetch bill + vote + cosponsor data.
    Returns list of doc dicts.
    """
    if PROPUBLICA_API_KEY is None:
        return []
    results = []
    # Use Search Endpoint
    url = "https://api.propublica.org/congress/v1/bills/search.json"
    params = {"query": bill_id}
    headers = {"X-API-KEY": PROPUBLICA_API_KEY}
    r = safe_get(url, params=params, headers=headers)
    if not r:
        return []
    js = r.json()
    bills = js.get("results", [])[0].get("bills", []) if js.get("results") else []
    # Find matches and store them
    for b in bills:
        if b.get("bill_id") and (b.get("short_title") or ""):
            metadata = b.copy()
            # also fetches votes, amendments, etc from detailed endpoint
            # e.g. GET /congress/v1/{congress}/{chamber}/bills/{bill-id}.json
            cid = metadata.get("congress")
            chamber = metadata.get("bill_type")
            bid = metadata.get("bill_id")
            detail_url = f"https://api.propublica.org/congress/v1/{cid}/{chamber}/bills/{bid}.json"
            rd = safe_get(detail_url, headers=headers)
            if rd:
                md = rd.json()
                # nested inside
                metadata.update(md.get("results", {}))
            # combine summary + texts if available
            text_ = metadata.get("latest_major_action") or metadata.get("summary") or ""
            results.append({
                "id": f"propublica_{bid}",
                "text": text_,
                "metadata": metadata
            })

    return results




def scrape_congress_gov(bill_id):
    # same as earlier scraping logic for congress.gov
    from bs4 import BeautifulSoup
    search_url = f"https://www.congress.gov/search?q={{%22source%22:%22legislation%22,%22search%22:%22{bill_id.replace(' ', '+')}%22}}"
    r = safe_get(search_url)
    out = []
    if not r:
        return out
    s = BeautifulSoup(r.text, "html.parser")
    link = s.select_one("ol.basic-search-results li a")
    if not link:
        return out
    full = "https://www.congress.gov" + link["href"]
    r2 = safe_get(full)
    if not r2:
        return out
    s2 = BeautifulSoup(r2.text, "html.parser")
    text = s2.get_text(" ", strip=True)
    metadata = {"source": "congress.gov", "url": full}
    out.append({"id": full, "text": text, "metadata": metadata})
    return out

def scrape_govtrack(bill_id):
    """ Fetch data from govtrack search"""
    r = safe_get(f"https://www.govtrack.us/search?q={bill_id}")
    if not r:
        return None
    soup = BeautifulSoup(r.text, "html.parser")
    first_link = soup.select_one(".result .title a")
    if not first_link:
        return None
    link = "https://www.govtrack.us" + first_link["href"]
    r2 = safe_get(link)
    if not r2:
        return None
    s2 = BeautifulSoup(r2.text, "html.parser")
    text = s2.get_text(" ", strip=True)
    return {"source": "govtrack", "url": link, "text": text}

# RAG + OLLAMA
def build_context(bill_text: str, docs: list[dict], persist_dir="./data/index"):
    """ Constructs vectorstore of bill text and scraped documents as tokens for RAG Context"""
    texts = [bill_text] + [d.get("text", "") for d in docs]
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs_lc = [Document(page_content=chunk) for txt in texts for chunk in text_splitter.split_text(txt)]

    # Set up vector embeddings and store in ChromaDB vectorstore
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    db = Chroma.from_documents(docs_lc, embedding=embeddings, persist_directory=persist_dir)
    db.persist()
    return db


def call_ollama(bill_text: str, docs: list[dict]):
    # Set up prompt
    context_repr = "\n\n".join([
        f"### SOURCE: {d.get('metadata', {}).get('source')} ###\n" + json.dumps(d.get("metadata", {}), indent=2)
        for d in docs
    ])
    prompt = f"""You are a legislative analysis AI.

BILL TEXT:
{bill_text}

SCRAPED / API CONTEXT METADATA:
{context_repr}

Given the bill text + all context metadata, respond with JSON with these keys:
- deep_summary
- short_summary
- subject_area
- committees
- sponsors
- status
- amendments
- house_senate_differences
- votes_summary
- chance_to_pass_percent

Make sure the JSON is valid.
"""
    resp = chat(model="bill-analyzer", messages=[{"role":"user", "content":prompt}])
    out = resp["message"]["content"]
    try:
        return json.loads(out)
    except Exception:
        # Cleans code fences
        cleaned = re.sub(r"json|", "", out)
        try:
            return json.loads(cleaned)
        except Exception:
            return {"raw_output": out}

def analyze_bill(bill_text: str):
    ids = extract_bill_ids(bill_text)
    docs = []
    for bid in ids:
        docs.extend(fetch_legiscan(bid))
        docs.extend(fetch_propublica(bid))
        docs.extend(fetch_govtrack(bid))
        docs.extend(scrape_congress_gov(bid))
    # dedupe docs by id
    seen = set()
    unique = []
    for d in docs:
        if d["id"] in seen:
            continue
        seen.add(d["id"])
        unique.append(d)
    docs = unique

    build_context(bill_text, docs)
    result = call_ollama(bill_text, docs)
    return result

if _name_ == "_main_":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python bill_full_analyzer.py <bill_text_file>")
        sys.exit(1)
    bill = open(sys.argv[1]).read()
    res = analyze_bill(bill)
    print(json.dumps(res, indent=2))

# response: ollama.ChatResponse = ollama.chat(
#         model='llama3.2',  # Replace with the model you pulled
#         messages=[
#             {'role': 'user', 'content': input("prompt: ")},
#         ],
#         tools=[get_results],
#         stream=True
#     )
# for chunk in response:
# 	# Print model content
#   print(chunk.message.content, end='', flush=True)
#   # Print the tool call
#   if chunk.message.tool_calls:
#     print(chunk.message.tool_calls)
limit = 25
# 5744
async def fetch_data(page: str, endpoint = "", type="hr/"):
    external_api_url = "https://api.congress.gov/v3/bill/119/" + type + endpoint + "?offset=" + str(page) + "&limit="+ str(limit) + "&api_key=QtI83GenQb7n6jCofB5iHTYrGXzYnlDpwZ7ek4mc" # Example external API

    try:
        # Using httpx for async requests
        async with httpx.AsyncClient() as client:
            response = await client.get(external_api_url)
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
            data = response.json()
        return data

    except httpx.HTTPStatusError as e:
        return {"status": "error", "message": f"HTTP error occurred: {e.response.status_code} - {e.response.text}"}
    except httpx.RequestError as e:
        return {"status": "error", "message": f"An error occurred while requesting: {e}"}
data = run(fetch_data(0))
text = run(fetch_data(0, ""))

for i in range(0, limit):
    data = run(fetch_data(0))
    number = str(data["bills"][i]["number"])
    text = run(fetch_data(0, number + "/text"))["textVersions"]
    if len(text) < 1:
        print("skip")
        continue
    else:
        text = str(text[0]["formats"][0]["url"])
        r = requests.get(text)
        text_html = r.text

    summary = run(fetch_data(0, number + "/summaries"))
    subject = run(fetch_data(0, number + "/subjects"))["subjects"]#["policyArea"]["name"]
    # print(text)
    print(subject)
    # print(json.dumps(data, indent=4))
    # print(data["bills"][i]["congress"])
    # print(summary["summaries"])
    # print(summary["summaries"][0]["text"] if len(summary["summaries"]) > 0 else "null" )
    cursor.execute("INSERT INTO test (title, congress, bill_number, summary, text, subject) VALUES (%s, %s, %s, %s, %s, %s)", (data["bills"][i]["title"],  data["bills"][i]["congress"], data["bills"][i]["number"], summary["summaries"][0]["text"] if len(summary["summaries"]) > 0 else "null", text_html, subject))
    db.commit()


