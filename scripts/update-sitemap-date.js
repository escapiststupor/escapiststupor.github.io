const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'docs', 'sitemap.xml');
const date = new Date().toISOString().slice(0, 10);
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${date}</lastmod>`);
fs.writeFileSync(p, s);
console.log('Updated sitemap.xml lastmod to', date);
