// Script para baixar imagens reais do @ketrancass
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram');
fs.mkdirSync(OUT_DIR, { recursive: true });

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
};

function fetchPage(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : 'https://www.instagram.com' + res.headers.location;
        res.resume();
        return fetchPage(loc, redirects + 1).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(body));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadBinary(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close(); try { fs.unlinkSync(dest); } catch {}
        return downloadBinary(res.headers.location, dest, redirects + 1).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(fs.statSync(dest).size); });
    }).on('error', (e) => { file.close(); try { fs.unlinkSync(dest); } catch {}; reject(e); });
  });
}

function getOgImage(html) {
  const patterns = [
    /property="og:image"\s+content="([^"]+)"/,
    /content="([^"]+)"\s+property="og:image"/,
    /"og:image","content":"([^"]+)"/,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1].replace(/&amp;/g, '&').replace(/\\u0026/g, '&');
  }
  return null;
}

function extractPostIds(profileHtml) {
  // Extrai shortcodes dos posts da página do perfil
  const ids = new Set();
  const patterns = [
    /\"shortcode\":\"([A-Za-z0-9_-]{10,12})\"/g,
    /\/p\/([A-Za-z0-9_-]{10,12})\//g,
  ];
  for (const p of patterns) {
    let m;
    const re = new RegExp(p.source, 'g');
    while ((m = re.exec(profileHtml)) !== null) {
      ids.add(m[1]);
    }
  }
  return [...ids].slice(0, 24); // pega até 24 posts
}

async function main() {
  console.log('📸 Buscando posts de @ketrancass...\n');

  // Todos os IDs coletados do perfil @ketrancass (64 posts)
  const allIds = [...new Set([
    'DU6mMcqga1Q', 'DUvip3bkTom', 'DUl3ueygcSy', 'DUEzHb0Dl3T', 'DTycs4RiQm2',
    'DRzqKh6ESsl', 'DRxOp2vEZpM', 'DRXQbL1EYuq', 'DRNk6hFgb0-', 'DRCtb6JEYcd',
    'DOTiaOqDgd-', 'DOJSuQnjtcA', 'DM6GPltxuE9', 'DMyNb9GRJeU', 'DIe4kK7R4v7',
    'DGYTEQyRWYf', 'DGGS5ZuRiTD', 'DFSyxNXxDbL', 'DE8P6lLRatM', 'DDvACZDhR8J',
    'DDsgQ9UBZpw', 'DDe4kXMOnEu', 'DDX1A7XBEDa', 'DDLH4I1Rvrz', 'DC9j3RaRiN7',
    'DC4aomuRWd4', 'DCU2uAxRtQv', 'DB9FkB-Rkxl', 'DBzjrNIu8CR', 'DByyrCcNLHa',
    'DBMMd8axa2l', 'DBB4HWBt3Qr', 'DA0_ie0t4wZ', 'DAtQ_3bRO1j', 'C_dceQQtroc',
    'C_imGBhNMay', 'C-tKI8mxShC', 'C96aMb1tYjn', 'C9xStXOxxsP', 'C9LR8IuPEne',
    'C8fjXqUPTnV', 'C8aZvddPjSc', 'C8M4L49NwcY', 'C7kRK-RtIeK', 'C7UOo65g3_A',
    'C7PFE4KNN85', 'C6l4R3ANHIx', 'C6ZAVEbtQ7Y', 'C5mGONGvs2S', 'C5Yod4pth6W',
    'C5RSK8TAZOs', 'C4_e4R3v9Uw', 'Cq3rTyrueoc', 'CpV1DHQtgzZ', 'CpQrfWgtuBF',
    'CpLh6sItVq7', 'CpDzkTrNqY9', 'Co-p9PPNAz6', 'Co5gYy4tNyc', 'CkyU-Ubu7KP',
    'ChU3jWJOhAr', 'ChFaIhtulvU', 'ChA7MQRv3Py', 'Cg9jbFnuk2x',
  ])];

  const downloaded = [];

  for (let i = 0; i < allIds.length; i++) {
    const postId = allIds[i];
    process.stdout.write(`  [${i+1}/${allIds.length}] ${postId}... `);

    try {
      const html = await fetchPage(`https://www.instagram.com/p/${postId}/`);
      const imgUrl = getOgImage(html);

      if (!imgUrl) {
        console.log('⚠️  sem imagem (privado ou reel)');
        continue;
      }

      // Verifica se é foto de trança (filtra posts gráficos)
      const isLikelyPhoto = imgUrl.includes('t51.82787-15') || imgUrl.includes('t51.71878-15') || imgUrl.includes('t51.2885-15');

      const filename = `ig-${postId}.jpg`;
      const dest = path.join(OUT_DIR, filename);

      if (fs.existsSync(dest)) {
        const kb = Math.round(fs.statSync(dest).size / 1024);
        console.log(`⏭  já existe (${kb}KB)`);
        downloaded.push({ postId, filename, webPath: `/images/instagram/${filename}`, sizeKb: kb, url: `https://www.instagram.com/p/${postId}/` });
        continue;
      }

      const size = await downloadBinary(imgUrl, dest);
      const kb = Math.round(size / 1024);
      console.log(`✅ ${kb}KB${isLikelyPhoto ? '' : ' (pode ser gráfico)'}`);

      downloaded.push({
        postId,
        filename,
        webPath: `/images/instagram/${filename}`,
        sizeKb: kb,
        url: `https://www.instagram.com/p/${postId}/`,
      });
    } catch (e) {
      console.log(`❌ ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\n✅ ${downloaded.length} imagens salvas em public/images/instagram/\n`);

  if (downloaded.length > 0) {
    console.log('Caminhos disponíveis:');
    downloaded.forEach(d => console.log(`  ${d.webPath}  (${d.sizeKb}KB)  ${d.url}`));

    fs.writeFileSync(
      path.join(OUT_DIR, 'manifest.json'),
      JSON.stringify(downloaded, null, 2)
    );
    console.log('\nManifest salvo em public/images/instagram/manifest.json');
  }
}

main().catch(console.error);
