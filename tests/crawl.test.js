const { stripURL, getURLs } = require("../crawl.js");
const { test, expect } = require("@jest/globals");

test("stripURL - remove https://", () => {
  const output = stripURL("https://test.com/path");
  const expectedOutput = "test.com/path";

  /*
    Checks if the output is equal to the expected output.
    Jest will log the result.
  */
  expect(output).toEqual(expectedOutput);
});

test("stripURL - remove http://", () => {
  const output = stripURL("http://test.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("stripURL - remove trailing /", () => {
  const output = stripURL("https://test.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("stripURL - remove capitals in URL", () => {
  const output = stripURL("https://TEST.com/");
  const expectedOutput = "test.com";
  expect(output).toEqual(expectedOutput);
});

test("getURLs - handling absolute URLs", () => {
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

test("getURLs - handling relative URLs", () => {
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

test("getURLs - finding multiple anchor elements", () => {
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

test("getURLs - handling invalid URLs", () => {
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
