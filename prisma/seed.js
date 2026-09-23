const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.part.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@turbomandi.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  // Seed Parts
  await prisma.part.createMany({
    data: [
      { name: 'Civic Turbo Suspension', sku: 'HON-CIV-1234', price: 1599, category: 'Suspension', stock: 15 },
      { name: 'NGK Iridium Spark Plugs', sku: 'NGK-SPK-9988', price: 6500, category: 'Engine Maintenance', stock: 50 },
      { name: 'Liqui Moly 5W-40 Engine Oil', sku: 'LQM-OIL-5544', price: 12000, category: 'Fluids & Lubricants', stock: 30 },
      { name: 'K&N High-Flow Air Filter', sku: 'KN-FLT-3321', price: 8500, category: 'Filters', stock: 20 },
      { name: 'Brake Pads Set', sku: 'TOY-BP-12345', price: 6666, category: 'Brakes', stock: 12 },
      { name: 'LED Headlight Bulbs', sku: 'HON-HL-4321', price: 5500, category: 'Electrical & Lights', stock: 25 }
    ]
  });

  // Seed Vehicles
  await prisma.vehicle.createMany({
    data: [
      { make: 'Honda', model: 'Civic RS 1.5 Turbo', year: 2023, price: 9500000, mileage: '12,000 km', transmission: 'Automatic', type: 'Sedan', tag: 'Hot Deal' },
      { make: 'Toyota', model: 'Fortuner Legender', year: 2024, price: 19500000, mileage: '0 km', transmission: 'Automatic', type: 'SUV', tag: 'Brand New' },
      { make: 'Kia', model: 'Sportage AWD', year: 2022, price: 8200000, mileage: '35,000 km', transmission: 'Automatic', type: 'SUV', tag: 'Inspected' },
      { make: 'Suzuki', model: 'Swift GLX CVT', year: 2024, price: 4700000, mileage: '5,000 km', transmission: 'Automatic', type: 'Hatchback', tag: 'Like New' }
    ]
  });

  console.log('✅ Database seeded successfully with Pro 3.1 fixtures.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
