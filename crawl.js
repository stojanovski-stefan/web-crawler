const { JSDOM } = require("jsdom");

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
};
