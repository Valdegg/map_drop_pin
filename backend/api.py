from fastapi import FastAPI, WebSocket
import uvicorn

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Map load command received for address: {data}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
