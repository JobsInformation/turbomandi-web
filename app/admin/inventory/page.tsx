"use client";

import { useState } from "react";

export default function InventoryPage() {
  const [formData, setFormData] = useState({ make: "", model: "", year: "", price: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    
    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Vehicle added successfully!");
      setFormData({ make: "", model: "", year: "", price: "" });
    } else {
      setStatus("Error saving vehicle.");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <input 
          type="text" placeholder="Make (e.g. Toyota)" required
          className="w-full p-3 border rounded-lg"
          value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})}
        />
        <input 
          type="text" placeholder="Model (e.g. Camry)" required
          className="w-full p-3 border rounded-lg"
          value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
        />
        <input 
          type="number" placeholder="Year (e.g. 2024)" required
          className="w-full p-3 border rounded-lg"
          value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}
        />
        <input 
          type="number" placeholder="Price" required
          className="w-full p-3 border rounded-lg"
          value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
          Save Vehicle
        </button>
      </form>
      {status && <p className="mt-4 text-center font-medium text-blue-600">{status}</p>}
    </div>
  );
}
