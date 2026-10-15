'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, ShieldCheck, Car, ArrowRight } from 'lucide-react';

interface VehicleItem {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  category: string;
  image: string;
}

const ALL_VEHICLES: VehicleItem[] = [
  {
    id: 'camry-2023',
    title: 'Toyota Camry Ascent',
    price: 32990,
    year: 2023,
    mileage: '45,000 km',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mazda-cx5-2022',
    title: 'Mazda CX-5 Maxx Sport',
    price: 28500,
    year: 2022,
    mileage: '62,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ford-ranger-2021',
    title: 'Ford Ranger Wildtrak 4x4',
    price: 54900,
    year: 2021,
    mileage: '78,000 km',
    transmission: 'Automatic',
    fuel: 'Diesel',
    category: 'Ute',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hyundai-tucson-2023',
    title: 'Hyundai Tucson Elite',
    price: 39500,
    year: 2023,
    mileage: '28,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'toyota-rav4-2024',
    title: 'Toyota RAV4 Cruiser Hybrid',
    price: 48990,
    year: 2024,
    mileage: '12,500 km',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80'
  }
];

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [transmission, setTransmission] = useState<string>('all');
  const [fuelType, setFuelType] = useState<string>('all');

  // Real-time filtering as user types or changes dropdowns
  const filteredVehicles = useMemo(() => {
    return ALL_VEHICLES.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPrice = true;
      if (maxPrice === '30000') matchesPrice = v.price <= 30000;
      else if (maxPrice === '40000') matchesPrice = v.price <= 40000;
      else if (maxPrice === '50000') matchesPrice = v.price <= 50000;
      else if (maxPrice === '60000') matchesPrice = v.price <= 60000;

      const matchesTransmission = transmission === 'all' || v.transmission.toLowerCase() === transmission.toLowerCase();
      const matchesFuel = fuelType === 'all' || v.fuel.toLowerCase() === fuelType.toLowerCase();

      return matchesSearch && matchesPrice && matchesTransmission && matchesFuel;
    });
  }, [searchQuery, maxPrice, transmission, fuelType]);

  const handleReset = () => {
    setSearchQuery('');
    setMaxPrice('all');
    setTransmission('all');
    setFuelType('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              VIC LMCT Certified Dealer #123456
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Certified Pre-Owned Showroom Stock
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Every vehicle undergoes a rigorous 120-point safety inspection with clear title guarantee.
            </p>
          </div>
          <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md">
            {filteredVehicles.length} Vehicles Available
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Interactive Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filter Vehicles
              </h3>
              <button
                onClick={handleReset}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Search Make / Model</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Toyota, SUV, Hybrid..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                />
              </div>
            </div>

            {/* Max Price Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Max Price ($ AUD)</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 cursor-pointer"
              >
                <option value="all">Any Price</option>
                <option value="30000">Under $30,000</option>
                <option value="40000">Under $40,000</option>
                <option value="50000">Under $50,000</option>
                <option value="60000">Under $60,000</option>
              </select>
            </div>

            {/* Transmission Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 cursor-pointer"
              >
                <option value="all">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 cursor-pointer"
              >
                <option value="all">All Fuel Types</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

          </div>
        </div>

        {/* Vehicle Grid Results */}
        <div className="lg:col-span-3 space-y-6">
          {filteredVehicles.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No Vehicles Match Your Filters</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Try adjusting your search terms or expanding your price range to view available stock.
              </p>
              <button
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-shadow">
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      VIC Certified
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{vehicle.year} Model • {vehicle.category}</span>
                        <span className="text-xs font-semibold text-gray-400">{vehicle.fuel}</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-gray-900 leading-snug">{vehicle.title}</h4>
                      <p className="text-xs text-gray-500 font-medium">{vehicle.mileage} • {vehicle.transmission}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Drive Away Price</p>
                        <p className="text-xl font-extrabold text-gray-900">${vehicle.price.toLocaleString()}</p>
                      </div>
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="bg-gray-900 hover:bg-blue-600 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-colors flex items-center gap-2 no-underline"
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
