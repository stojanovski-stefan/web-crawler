const { JSDOM } = require("jsdom");

/**
 * Crawls a website
 * @param {*} baseURL Homepage of the website
 * @param {*} currentURL current page the crawler is on
 * @param {*} visitedPages array of web pages that have been visited
 */
async function crawl(baseURL, currentURL, visitedPages) {
  // check if current url has the same domain as the base url
  const baseURLObject = new URL(baseURL);
  const currentPageURLObject = new URL(currentURL);
  if (currentPageURLObject.hostname !== baseURLObject.hostname) {
    return visitedPages;
  }

  const strippedCurrentURL = stripURL(currentURL);
  if (visitedPages[strippedCurrentURL] > 0) {
    visitedPages[strippedCurrentURL]++;
    return visitedPages;
  }

  visitedPages[strippedCurrentURL] = 1;
  console.log("Crawling: " + currentURL);

  try {
    const response = await fetch(currentURL);

    // stop crawling if there is a client or server error
    if (response.status > 399) {
      console.log("Error with fetch. Status code: " + response.status);
      return visitedPages;
    }

    // stop crawling if what is fetched is not HTML
    const contentType = response.headers.get("content-type");
    // header may contain other info, such as charset=utf-8
    if (!contentType.includes("text/html")) {
      console.log("Response is not HTML for page: " + currentURL);
      return visitedPages;
    }

    //.text() returns a promise
    const html = await response.text();
    const anchorsArray = getURLs(html, baseURL);

    for (const nextElement of anchorsArray) {
      visitedPages = await crawl(baseURL, nextElement, visitedPages);
    }
    return visitedPages;
  } catch (e) {
    console.log("Error with fetch: " + e.message + ", on page: " + currentURL);
    process.exit(1);
  }
}

function getURLs(html, currentPageURL) {
  const urls = [];
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll("a");
  for (const link of links) {
    // checks if a link is relative
    if (link.href.at(0) == "/") {
      urls.push(currentPageURL + link.href);
      continue;
    }

    // skip current link if it is invalid
    try {
      const urlObject = new URL(link.href);
    } catch (e) {
      console.log("Error with url: " + e.message);
      continue;
    }

    // absolute url
    urls.push(link.href);
  }
  return urls;
}

function stripURL(urlString) {
  // url object removes any capitals
  const urlObject = new URL(urlString);
  const strippedURL = `${urlObject.hostname}${urlObject.pathname}`;

  if (strippedURL.length > 0 && strippedURL.at(strippedURL.length - 1) == "/") {
    return strippedURL.slice(0, -1);
  } else {
    return strippedURL;
  }
}

module.exports = {
  stripURL,
  getURLs,
  crawl,
};
