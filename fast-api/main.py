from fastapi import FastAPI
import httpx # or import requests
import ollama

app = FastAPI()
limit = 250


response = ollama.chat(
        model='qwen3',  # Replace with the model you pulled
        messages=[
            {'role': 'user', 'content': input("prompt: ")},
        ],
    )
print(response['message']['content'])

@app.get("/fetch/{page}")
async def fetch_data(page: str):
    external_api_url = "https://api.congress.gov/v3/bill/119?offset=" + page + "&limit=250&api_key=QtI83GenQb7n6jCofB5iHTYrGXzYnlDpwZ7ek4mc" # Example external API

    try:
        # Using httpx for async requests
        async with httpx.AsyncClient() as client:
            response = await client.get(external_api_url)
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
            data = response.json()
        return {"status": "success", "data": data}

    except httpx.HTTPStatusError as e:
        return {"status": "error", "message": f"HTTP error occurred: {e.response.status_code} - {e.response.text}"}
    except httpx.RequestError as e:
        return {"status": "error", "message": f"An error occurred while requesting: {e}"}