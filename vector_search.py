import pandas as pd
import numpy as np
import torch
from sentence_transformers import SentenceTransformer, util

# 1. Load CSV
df = pd.read_csv("data.csv")   # your CSV with a column 'text'
texts = df["text"].tolist()

# 2. Load pre-trained embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# 3. Embed all texts
embeddings = model.encode(texts, convert_to_tensor=True, normalize_embeddings=True)

# 4. Define a query
query = "Women's stylish red handbag with strap"
query_emb = model.encode(query, convert_to_tensor=True, normalize_embeddings=True)

# 5. Compute cosine similarities
cosine_scores = util.cos_sim(query_emb, embeddings)[0]

# 6. Get top-5 results
top_results = torch.topk(cosine_scores, k=5)

print("\nQuery:", query)
for score, idx in zip(top_results[0], top_results[1]):
    print(f"Score: {score:.4f} | Text: {texts[idx]}")

print("\n")

# 7. Optional: Using FAISS for large-scale search





 