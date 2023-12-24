const { stripURL, getURLs } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("stripURL remove protocols", () => {
  const output = stripURL("https://test.com/path");
  const expectedOutput = "test.com/path";

  // Expects the output to equal to the expected output
  // jest will log if the test passes or not
  expect(output).toEqual(expectedOutput);
});

test("stripURL remove trailing /", () => {
  const output = stripURL("https://test.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("stripURL remove capitals", () => {
  const output = stripURL("https://TEST.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("stripURL different protocol", () => {
  const output = stripURL("http://test.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("getURLs absolute URLs", () => {
  const htmlInput = `
  <html>
    <body>
      <a href="https://google.com">Google</a>
    </body>
  </html>
  `;
  const output = getURLs(htmlInput, "https://google.com");
  const expectedOutput = ["https://google.com/"];
  expect(output).toEqual(expectedOutput);
});

test("getURLs relative URLs", () => {
  const htmlInput = `
  <html>
    <body>
      <a href="/path/">Google</a>
    </body>
  </html>
  `;
  const output = getURLs(htmlInput, "https://google.com");
  const expectedOutput = ["https://google.com/path/"];
  expect(output).toEqual(expectedOutput);
});

test("getURLs multiple anchor elements", () => {
  const htmlInput = `
  <html>
    <body>
      <a href="https://google.com">Google</a>
      <a href="https://leetcode.com">LeetCode</a>
      <a href="https://miamioh.edu">Miami University</a>
    </body>
  </html>
  `;
  const output = getURLs(htmlInput, "https://google.com");
  const expectedOutput = [
    "https://google.com/",
    "https://leetcode.com/",
    "https://miamioh.edu/",
  ];
  expect(output).toEqual(expectedOutput);
});

test("getURLs Invalid URLs", () => {
  const htmlInput = `
  <html>
    <body>
      <a href="invalidURL">Google</a>
    </body>
  </html>
  `;
  const output = getURLs(htmlInput, "https://google.com");
  const expectedOutput = [];
  expect(output).toEqual(expectedOutput);
});
