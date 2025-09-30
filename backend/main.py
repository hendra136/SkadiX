# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import compute_score

app = FastAPI(title="SkadiX API")

# Allow your React dev server to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Features(BaseModel):
    sst: float
    elec_cost: float
    throughput: float

@app.get("/")
def health():
    return {"ok": True, "service": "SkadiX API"}

@app.post("/predict")
def predict(features: Features):
    score = compute_score(**features.dict())
    return {"score": score}