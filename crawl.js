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
};
