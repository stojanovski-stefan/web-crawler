const { stripURL } = require("./crawl.js");
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
