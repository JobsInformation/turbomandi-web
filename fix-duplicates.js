const fs = require('fs');

// Fix Services route duplicate 'date'
const servicesRoute = './app/api/services/route.ts';
if (fs.existsSync(servicesRoute)) {
  let content = fs.readFileSync(servicesRoute, 'utf8');
  content = content.replace(/date,\s*date,/g, 'date,');
  content = content.replace(/date,\s*date\s*}/g, 'date }');
  fs.writeFileSync(servicesRoute, content);
}

// Fix Parts route duplicate 'category'
const partsRoute = './app/api/parts/route.ts';
if (fs.existsSync(partsRoute)) {
  let content = fs.readFileSync(partsRoute, 'utf8');
  content = content.replace(/category,\s*partNumber:\s*`PN-\$\{Date\.now\(\)\}`,\s*category,/g, 'partNumber: `PN-${Date.now()}`, category,');
  content = content.replace(/category,\s*partNumber:\s*`PN-\$\{Date\.now\(\)\}`,\s*category:/g, 'partNumber: `PN-${Date.now()}`, category:');
  fs.writeFileSync(partsRoute, content);
}

console.log('Duplicate declarations successfully removed!');
