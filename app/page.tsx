import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const availableVehicles = await prisma.vehicle.findMany({
    where: { status: "Available" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-blue-900 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Royal Auto Hub</h1>
          <nav className="hidden md:flex space-x-6 font-medium items-center">
            <a href="#" className="hover:text-blue-200">Home</a>
            <a href="#" className="hover:text-blue-200">Vehicles & Stock</a>
            <a href="/admin/inventory" className="text-sm bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow">
              Admin Portal
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-white py-16 text-center shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Find Your Dream Car Today</h2>
          <p className="text-xl text-gray-600">Browse our latest premium inventory. Built on Trust. Focused on You.</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto p-8 my-8">
        <h3 className="text-2xl font-bold mb-8 border-b pb-4">Available Showroom Stock</h3>
        
        {availableVehicles.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-12 bg-white rounded-lg border border-dashed">
            No vehicles currently available. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {vehicle.imageUrl ? (
                  <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-56 object-cover border-b" />
                ) : (
                  <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400 border-b">
                    <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-gray-900">{vehicle.make} {vehicle.model}</h4>
                  <div className="flex justify-between items-center mb-4 text-gray-600">
                    <span>Model Year: <span className="font-semibold text-gray-900">{vehicle.year}</span></span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4 mt-2">
                    <span className="text-2xl font-extrabold text-blue-700">${vehicle.price.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 text-gray-400 text-center p-8 mt-12">
        <p>&copy; 2026 Royal Auto Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
