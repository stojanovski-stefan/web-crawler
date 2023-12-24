const { JSDOM } = require("jsdom");

async function crawl(URL) {
  try {
    const response = await fetch(URL);

    // stop crawling if there is a client or server error
    if (response.status > 399) {
      console.log("Error with fetch. Status code: " + response.status);
      return;
    }

    // stop crawling if what is fetched is not HTML
    const contentType = response.headers.get("content-type");
    // header may contain other info, such as charset=utf-8
    if (!contentType.includes("text/html")) {
      console.log("Response is not HTML for page: " + URL);
      return;
    }

    //.text() returns a promise
    console.log(await response.text());
  } catch (e) {
    console.log("Error with fetch: " + e.message + ", on page: " + URL);
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
