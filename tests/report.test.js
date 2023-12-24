const { sortVisitedPages } = require("../seo-report.js");
const { test, expect } = require("@jest/globals");

test("sortVisitedPages - sort multiple pages", () => {
  const input = {
    "https://testdomain.com/path": 1,
    "https://testdomain.com": 3,
    "https://testdomain.com/other-path": 7,
    "https://testdomain.com/another-path": 2,
    "https://testdomain.com/even-more-paths": 4,
    "https://testdomain.com/plenty-of-paths": 3,
  };
  const expectedOutput = [
    ["https://testdomain.com/other-path", 7],
    ["https://testdomain.com/even-more-paths", 4],
    ["https://testdomain.com", 3],
    ["https://testdomain.com/plenty-of-paths", 3],
    ["https://testdomain.com/another-path", 2],
    ["https://testdomain.com/path", 1],
  ];

  const output = sortVisitedPages(input);
  expect(output).toEqual(expectedOutput);
});
