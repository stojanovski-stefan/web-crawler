const { crawl } = require("./crawl.js");

async function main() {
  // first input argument is the interpreter, second is a link to main.js, and the third is the user input
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Only one command line argument allowed");
    process.exit(1);
  }

  const passedURL = process.argv[2];
  try {
    const urlObject = new URL(passedURL);
  } catch (e) {
    console.log("Error with URL:" + e.message);
    process.exit(1);
  }

  console.log("Crawling " + passedURL + "...");
  // crawl function returns a promise
  const visitedPages = await crawl(passedURL, passedURL, {});

  // Object.entries allows us to iterate through the visitedPages object
  for (const page of Object.entries(visitedPages)) {
    console.log(page);
  }
}

main();
