const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, 'docs', 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  {
    name: 'desktop_preview.png',
    url: 'http://localhost:8081',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'unregistered_preview.png',
    url: 'http://localhost:8081/?user=priya',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'hindi_preview.png',
    url: 'http://localhost:8081/?lang=hi',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'submission_modal.png',
    url: 'http://localhost:8081/?modal=submission',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'video_modal.png',
    url: 'http://localhost:8081/?modal=video',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'switcher_modal.png',
    url: 'http://localhost:8081/?modal=switcher',
    size: '480,960',
    budget: 6000,
  },
  {
    name: 'desktop_preview_scrolled.png',
    url: 'http://localhost:8081/?scroll=bottom',
    size: '480,960',
    budget: 7000,
  },
];

console.log('Capturing application screenshots via Chrome Headless...');
for (const t of targets) {
  const filePath = path.join(outDir, t.name);
  console.log(`Capturing ${t.name} from ${t.url}...`);
  try {
    const cmd = `"${chromePath}" --headless --disable-gpu --virtual-time-budget=${t.budget} --window-size=${t.size} --screenshot="${filePath}" "${t.url}"`;
    execSync(cmd, { stdio: 'ignore', timeout: 20000 });
    const stats = fs.statSync(filePath);
    console.log(`Saved ${t.name} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`Failed to capture ${t.name}:`, err.message);
  }
}
console.log('All screenshots captured!');
