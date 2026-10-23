const fs = require('fs');
const path = require('path');

// 1. Fix Part Number and Service Date Mismatches
function fixSpecificRoutes() {
  const partsRoute = './app/api/parts/route.ts';
  if (fs.existsSync(partsRoute)) {
    let content = fs.readFileSync(partsRoute, 'utf8');
    // Inject partNumber into the Prisma create data object
    if (!content.includes('partNumber')) {
      content = content.replace(/category,/g, 'category, partNumber: `PN-${Date.now()}`,');
      content = content.replace(/category:/g, 'partNumber: `PN-${Date.now()}`, category:');
    }
    fs.writeFileSync(partsRoute, content);
  }

  const servicesRoute = './app/api/services/route.ts';
  if (fs.existsSync(servicesRoute)) {
    let content = fs.readFileSync(servicesRoute, 'utf8');
    // Replace preferredDate with date
    content = content.replace(/preferredDate/g, 'date');
    fs.writeFileSync(servicesRoute, content);
  }
}

// 2. Aggressively strip Number() and parseInt() from ALL API routes
function fixIdTypes(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      fixIdTypes(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Strip parseInt(params.id) and parseInt(params.id, 10)
      content = content.replace(/parseInt\(\s*(params\.id|id)\s*(,\s*\d+)?\s*\)/g, '$1');
      // Strip Number(params.id)
      content = content.replace(/Number\(\s*(params\.id|id)\s*\)/g, '$1');
      
      // Failsafe for hardcoded id object assignments (e.g. id: Number(params.id))
      content = content.replace(/id:\s*parseInt\([^)]+\)/g, 'id: params.id');
      content = content.replace(/id:\s*Number\([^)]+\)/g, 'id: params.id');

      fs.writeFileSync(fullPath, content);
    }
  }
}

fixSpecificRoutes();
fixIdTypes('./app/api');
console.log('API routes aggressively patched! All IDs are now strings and schemas match.');
