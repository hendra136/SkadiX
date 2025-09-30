# backend/model.py
# TODO: replace this with your real logic (moved from the notebook)

IDEAL_SST = 18.0  # example target temp

def compute_score(sst: float, elec_cost: float, throughput: float) -> float:
    """
    Return a suitability score (example).
    Replace this with your notebook's calculation or a loaded model.
    """
    score = 0.5*throughput - 0.3*elec_cost - 0.2*abs(sst - IDEAL_SST)
    return float(round(score, 3))