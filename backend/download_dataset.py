# download_california_housing.py
import pandas as pd
from sklearn.datasets import fetch_california_housing

# Load the dataset
housing = fetch_california_housing()

# Convert to pandas DataFrame
df = pd.DataFrame(housing.data, columns=housing.feature_names)

# Add the target column (median house value in $100,000s)
df['MedHouseVal'] = housing.target

# Save to CSV
df.to_csv('california_housing.csv', index=False)

print("Dataset saved as 'california_housing.csv'")
print(f"Shape: {df.shape}")
print(f"Columns: {list(df.columns)}")