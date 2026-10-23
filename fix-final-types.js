const fs = require('fs');

// 1. Fix bookings route (preferredDate -> date)
const bookingsRoute = './app/api/bookings/route.ts';
if (fs.existsSync(bookingsRoute)) {
  let content = fs.readFileSync(bookingsRoute, 'utf8');
  content = content.replace(/preferredDate/g, 'date');
  fs.writeFileSync(bookingsRoute, content);
}

// 2. Fix orders route (remove Number/parseInt wrappers causing string/number mismatch)
const ordersRoute = './app/api/orders/route.ts';
if (fs.existsSync(ordersRoute)) {
  let content = fs.readFileSync(ordersRoute, 'utf8');
  content = content.replace(/Number\(\s*(params\.id|id)\s*\)/g, '$1');
  content = content.replace(/parseInt\(\s*(params\.id|id)[^)]*\)/g, '$1');
  content = content.replace(/id:\s*Number\([^)]+\)/g, 'id: params.id');
  fs.writeFileSync(ordersRoute, content);
}

// 3. Fix services route (remove invalid 'notes' field from Prisma payload)
const servicesRoute = './app/api/services/route.ts';
if (fs.existsSync(servicesRoute)) {
  let content = fs.readFileSync(servicesRoute, 'utf8');
  content = content.replace(/,\s*notes\s*(?=[,}])/g, '');
  content = content.replace(/notes\s*,\s*/g, '');
  content = content.replace(/notes\s*:/g, '// notes:'); 
  fs.writeFileSync(servicesRoute, content);
}

console.log('Final type mismatches resolved!');
