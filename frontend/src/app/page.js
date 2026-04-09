'use client';   // required for useState and event handlers

import { useState } from 'react';
import './page.css';   // we'll create this file

export default function Home() {
  const [formData, setFormData] = useState({
    MedInc: 4.0,
    HouseAge: 30,
    AveRooms: 5.5,
    AveBedrms: 1.0,
    Population: 1000,
    AveOccup: 3.0,
    Latitude: 34.5,
    Longitude: -118.2
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_price);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Cannot connect to backend. Make sure Flask is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🏠 California House Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Median Income (in tens of thousands)</label>
          <input type="number" name="MedInc" value={formData.MedInc} onChange={handleChange} step="0.5" min="0.5" max="15" />
        </div>
        <div className="form-group">
          <label>House Age (years)</label>
          <input type="number" name="HouseAge" value={formData.HouseAge} onChange={handleChange} min="1" max="100" />
        </div>
        <div className="form-group">
          <label>Average Rooms per Household</label>
          <input type="number" name="AveRooms" value={formData.AveRooms} onChange={handleChange} step="0.1" min="1" max="20" />
        </div>
        <div className="form-group">
          <label>Average Bedrooms per Household</label>
          <input type="number" name="AveBedrms" value={formData.AveBedrms} onChange={handleChange} step="0.1" min="0.5" max="10" />
        </div>
        <div className="form-group">
          <label>Population</label>
          <input type="number" name="Population" value={formData.Population} onChange={handleChange} min="100" max="50000" />
        </div>
        <div className="form-group">
          <label>Average Occupancy (persons per household)</label>
          <input type="number" name="AveOccup" value={formData.AveOccup} onChange={handleChange} step="0.5" min="1" max="10" />
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input type="number" name="Latitude" value={formData.Latitude} onChange={handleChange} step="0.01" min="32" max="42" />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input type="number" name="Longitude" value={formData.Longitude} onChange={handleChange} step="0.01" min="-124" max="-114" />
        </div>
        <button type="submit" disabled={loading}>Predict Price</button>
      </form>

      {loading && <div className="result">⏳ Calculating...</div>}
      {prediction !== null && (
        <div className="result">
          <h2>💰 Estimated Price: ${prediction.toLocaleString()}</h2>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}