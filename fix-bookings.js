const fs = require('fs');
const bookingsRoute = './app/api/bookings/route.ts';

if (fs.existsSync(bookingsRoute)) {
  let content = fs.readFileSync(bookingsRoute, 'utf8');
  
  // 1. Remove the duplicate date in destructuring
  content = content.replace(/date,\s*date,/g, 'date,');
  content = content.replace(/date,\s*date\s*}/g, 'date }');
  
  // 2. Strip out 'notes' as it does not exist in the ServiceBooking schema
  content = content.replace(/,\s*notes\s*(?=[,}])/g, '');
  content = content.replace(/notes\s*,\s*/g, '');
  content = content.replace(/notes\s*:/g, '// notes:'); 
  
  fs.writeFileSync(bookingsRoute, content);
}
console.log('Bookings route cleaned up!');
