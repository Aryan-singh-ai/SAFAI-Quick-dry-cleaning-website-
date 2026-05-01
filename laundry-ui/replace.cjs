const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/anjal/OneDrive/Desktop/laundry-ui/laundry-ui/src';

const walk = (d) => {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach((file) => {
    file = path.join(d, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-white\/5/g, 'bg-[#2B7A78]');
  content = content.replace(/bg-\[\#09090b\]\/50/g, 'bg-[#2B7A78]');
  content = content.replace(/text-zinc-300/g, 'text-white');
  content = content.replace(/text-zinc-400/g, 'text-white');
  content = content.replace(/text-zinc-500/g, 'text-white');
  content = content.replace(/text-purple-400/g, 'text-white');
  content = content.replace(/text-purple-500/g, 'text-white');
  content = content.replace(/text-purple-300\/80/g, 'text-white');
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
