const fs = require('fs');
const path = require('path');
const https = require('https');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');

const baseUrl = 'https://club.fractalfantasy.net';

async function findAnimationFiles() {
  console.log('Scanning for animation files...');
  const browser = await puppeteer.launch({
    headless: false,  // Make browser visible
    timeout: 60000    // Increase timeout to 60 seconds
  });
  const page = await browser.newPage();

  const animFiles = new Set();

  // Listen for all network requests
  page.on('requestfinished', request => {
    const url = request.url();
    if (url.includes('/assets/fbx/anims/') && url.endsWith('.glb')) {
      console.log('Found animation:', url);
      animFiles.add(url);
    }
  });

  try {
    // Set a longer timeout and handle page load errors
    await page.goto(baseUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000  // 60 seconds timeout
    });

    // Wait a bit to ensure all resources are loaded
    await page.waitForTimeout(5000);

    // Interact with the page to trigger animation loads
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait another moment for any lazy-loaded resources
    await page.waitForTimeout(5000);

  } catch (error) {
    console.log('Page load error:', error.message);
    console.log('Continuing with any files found...');
  } finally {
    await browser.close();
  }

  return Array.from(animFiles);
}

async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url}`);

    const request = https.get(url, response => {
      if (response.statusCode === 404) {
        console.log(`File not found: ${url}`);
        resolve(false);
        return;
      }

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${outputPath}`);
        resolve(true);
      });
    });

    request.on('error', error => {
      console.error(`Error downloading ${url}:`, error);
      resolve(false);
    });

    // Set timeout for the request
    request.setTimeout(30000, () => {
      request.abort();
      console.log(`Download timeout for: ${url}`);
      resolve(false);
    });
  });
}

async function downloadAnimations() {
  console.log('Starting animations download...');

  // Create the anims directory if it doesn't exist
  const animsDir = path.join('.', 'assets', 'fbx', 'anims');
  if (!fs.existsSync(animsDir)) {
    mkdirp.sync(animsDir);
  }

  try {
    // Find all animation files
    const animUrls = await findAnimationFiles();
    console.log(`Found ${animUrls.length} animation files`);

    // Download each animation file
    for (const url of animUrls) {
      const fileName = url.split('/').pop();
      const outputPath = path.join(animsDir, fileName);
      await downloadFile(url, outputPath);
    }

    console.log('Animation download complete!');
  } catch (error) {
    console.error('Error during download:', error);
  }
}

// Run the script
downloadAnimations().catch(console.error);
