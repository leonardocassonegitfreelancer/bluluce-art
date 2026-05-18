import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://jfvegancafe.com/contact/", { waitUntil: "networkidle2", timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: "ref-jf-desktop.png", fullPage: true });

await page.setViewport({ width: 390, height: 844 });
await page.goto("https://jfvegancafe.com/contact/", { waitUntil: "networkidle2", timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: "ref-jf-mobile.png", fullPage: true });

await browser.close();
console.log("done");
