from fastapi import FastAPI
import httpx # or import requests
import ollama
import duckduckgo_search 
import psycopg2
from asyncio import run
import json

db = psycopg2.connect(database="bill-view-test",
                        host="localhost",
                        user="postgres",
                        password="52215",
                        port="5432")

cursor = db.cursor()

app = FastAPI()
limit = 250

def get_results(query):
      """
    enter a search query, and return results

    Args:
        query (set): The search query the user types inint

    Returns:
        the result of ddgs
    """
      return duckduckgo_search.DDGS().text(query, max_results=5)

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

async def fetch_data(page: str):
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

for i
print(json.dumps(data, indent=4))
print(data["bills"][0]["congress"])
cursor.execute("INSERT INTO test (title, congress, bill_number) VALUES (%s, %s, %s)", (data["bills"][0]["title"],  data["bills"][0]["congress"], data["bills"][0]["number"]))
db.commit()
