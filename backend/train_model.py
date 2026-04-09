import numpy as np
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import fetch_california_housing
import os

MODEL_PATH = 'model.pkl'

# Train only if model doesn't exist
if not os.path.exists(MODEL_PATH):
    print("Training new model...")
    housing = fetch_california_housing()
    X = pd.DataFrame(housing.data, columns=housing.feature_names)
    y = housing.target

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])
    pipeline.fit(X, y)

    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(pipeline, f)
    print("✅ Model saved as 'model.pkl'")
else:
    print("✅ Model already exists. Skipping training.")