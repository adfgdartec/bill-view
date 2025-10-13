from fastapi import FastAPI
import httpx # or import requests
import ollama
import duckduckgo_search 
import psycopg2
from asyncio import run
import json
import requests





db = psycopg2.connect(database="bill-view-test",
                        host="localhost",
                        user="postgres",
                        password="52215",
                        port="5432")

cursor = db.cursor()

app = FastAPI()


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
    print(text)
    print(text_html)
    # print(json.dumps(data, indent=4))
    print(data["bills"][i]["congress"])
    # print(summary["summaries"])
    # print(summary["summaries"][0]["text"] if len(summary["summaries"]) > 0 else "null" )
    cursor.execute("INSERT INTO test (title, congress, bill_number, summary, text) VALUES (%s, %s, %s, %s, %s)", (data["bills"][i]["title"],  data["bills"][i]["congress"], data["bills"][i]["number"], summary["summaries"][0]["text"] if len(summary["summaries"]) > 0 else "null", text_html ))
    db.commit()