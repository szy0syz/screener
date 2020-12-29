import puppeteer from "puppeteer";

const takeScreenshot = async (url: string, path: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const options = {
    path,
    omitBackground: true,
    fullPage: true,
  };

  await page.goto(url);
  await page.screenshot(options);
  await browser.close();
};

export { takeScreenshot };
