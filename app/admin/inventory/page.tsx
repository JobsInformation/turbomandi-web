"use client";

import { useState, useEffect } from "react";

export default function InventoryPage() {
  const [formData, setFormData] = useState({ make: "", model: "", year: "", price: "" });
  const [status, setStatus] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await fetch("/api/vehicles");
    if (res.ok) {
      const data = await res.json();
      setVehicles(data);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

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
      fetchVehicles(); // Refresh the list instantly
    } else {
      setStatus("Error saving vehicle.");
    }
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h1>
      
      <form onSubmit={handleSubmit} className="flex gap-4 text-black mb-8">
        <input type="text" placeholder="Make" required className="flex-1 p-3 border rounded-lg" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} />
        <input type="text" placeholder="Model" required className="flex-1 p-3 border rounded-lg" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
        <input type="number" placeholder="Year" required className="w-24 p-3 border rounded-lg" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
        <input type="number" placeholder="Price" required className="w-32 p-3 border rounded-lg" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-6 rounded-lg font-bold hover:bg-blue-700">Add</button>
      </form>
      {status && <p className="mb-4 font-medium text-blue-600">{status}</p>}

      <h2 className="text-xl font-bold text-gray-900 mb-4">Current Stock</h2>
      <table className="w-full text-left text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 rounded-tl-lg">Make & Model</th>
            <th className="p-3">Year</th>
            <th className="p-3">Price</th>
            <th className="p-3 rounded-tr-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v: any) => (
            <tr key={v.id} className="border-b">
              <td className="p-3 font-medium">{v.make} {v.model}</td>
              <td className="p-3">{v.year}</td>
              <td className="p-3">${v.price}</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{v.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
