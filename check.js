const https = require('https');
https.get('https://resume-analyzer-frontend-eight-nu.vercel.app/', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    const scripts = html.match(/\/(_next\/static\/chunks\/[^"]+)/g);
    if (!scripts) { console.log('No scripts found'); return; }
    
    let pending = scripts.length;
    scripts.forEach(src => {
      const url = 'https://resume-analyzer-frontend-eight-nu.vercel.app' + src;
      https.get(url, (chunkRes) => {
        let js = '';
        chunkRes.on('data', d => js += d);
        chunkRes.on('end', () => {
          if (js.includes('http://localhost:5000')) console.log('Found localhost in', src);
          if (js.includes('onrender')) console.log('Found render in', src);
          if (js.includes('Failed to fetch')) console.log('Found Failed to fetch in', src);
          pending--;
          if (pending === 0) console.log('DONE');
        });
      });
    });
  });
});
