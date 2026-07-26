import fs from 'fs';

const html = fs.readFileSync('b:/mohamed/APP2/superbaking-astro/Trustbread Home.html', 'utf8');
const start = html.indexOf('<script type="__bundler/template">');
const end = html.indexOf('</script>', start);
const json = html.slice(start + 34, end).trim();
const template = JSON.parse(json);
const pageHtml = typeof template === 'string' ? template : template.html ?? JSON.stringify(template);

fs.writeFileSync('scripts/trustbread-home-extracted.html', pageHtml);

const classNames = [...pageHtml.matchAll(/class(?:Name)?=\"([^\"]+)\"/g)].map((m) => m[1]);
const uniqClasses = [...new Set(classNames.flatMap((c) => c.split(/\s+/)))].sort();
console.log('CLASSES:', uniqClasses.join('\n'));

const snippets = [...pageHtml.matchAll(/>([^<]{2,100})</g)]
  .map((x) => x[1].trim())
  .filter((s) => s && !/^[\W\s]*$/.test(s) && !s.includes('{') && s.length < 100);
console.log('\nTEXT:');
[...new Set(snippets)].slice(0, 150).forEach((s) => console.log(s));
