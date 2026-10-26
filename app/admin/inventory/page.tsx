"use client";

import { useState, useEffect } from "react";

export default function InventoryPage() {
  const [formData, setFormData] = useState({ make: "", model: "", year: "", price: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await fetch("/api/vehicles");
    if (res.ok) setVehicles(await res.json());
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Uploading image and saving...");
    
    // Use FormData instead of JSON to support physical file uploads
    const data = new FormData();
    data.append("make", formData.make);
    data.append("model", formData.model);
    data.append("year", formData.year);
    data.append("price", formData.price);
    if (imageFile) {
      data.append("image", imageFile);
    }

    const res = await fetch("/api/vehicles", {
      method: "POST",
      // Notice we do NOT set Content-Type; the browser handles it automatically for FormData
      body: data,
    });

    if (res.ok) {
      setStatus("Vehicle added successfully!");
      setFormData({ make: "", model: "", year: "", price: "" });
      setImageFile(null);
      (document.getElementById("image-upload") as HTMLInputElement).value = "";
      fetchVehicles();
    } else {
      setStatus("Error saving vehicle.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    const res = await fetch(`/api/vehicles?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchVehicles();
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Available" ? "Sold" : "Available";
    const res = await fetch("/api/vehicles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (res.ok) fetchVehicles();
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h1>
      
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 border">
        <div className="flex flex-wrap gap-4 text-black mb-4">
          <input type="text" placeholder="Make" required className="flex-1 p-3 border rounded-lg min-w-[150px]" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} />
          <input type="text" placeholder="Model" required className="flex-1 p-3 border rounded-lg min-w-[150px]" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
          <input type="number" placeholder="Year" required className="w-24 p-3 border rounded-lg" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
          <input type="number" placeholder="Price" required className="w-32 p-3 border rounded-lg" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        </div>
        <div className="flex gap-4 items-center">
          <input id="image-upload" type="file" accept="image/*" className="flex-1 p-2 border rounded-lg bg-white text-black" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 whitespace-nowrap">Add Vehicle</button>
        </div>
        {status && <p className="mt-4 font-medium text-blue-600">{status}</p>}
      </form>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Current Stock</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 rounded-tl-lg">Image</th>
              <th className="p-3">Make & Model</th>
              <th className="p-3">Year</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v: any) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {v.imageUrl ? (
                    <img src={v.imageUrl} alt={v.make} className="w-16 h-16 object-cover rounded-md border" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md border flex items-center justify-center text-xs text-gray-500">No Img</div>
                  )}
                </td>
                <td className="p-3 font-medium">{v.make} {v.model}</td>
                <td className="p-3">{v.year}</td>
                <td className="p-3">${v.price}</td>
                <td className="p-3">
                  <span className={`text-sm px-2 py-1 rounded-full ${v.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                    {v.status}
                  </span>
                </td>
                <td className="p-3 flex gap-3 items-center h-full mt-4">
                  <button onClick={() => handleStatusUpdate(v.id, v.status)} className="text-blue-600 font-medium hover:underline">
                    Mark {v.status === "Available" ? "Sold" : "Available"}
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="text-red-600 font-medium hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
