function sortVisitedPages(visitedPages) {
  // Object.entries allows us to iterate through the visitedPages object
  const visitedPagesArray = Object.entries(visitedPages);
  visitedPagesArray.sort((a, b) => {
    // sorts greatest to least
    return b[1] - a[1];
  });

  return visitedPagesArray;
}

function printSeoReport(visitedPages) {
  const sortedPagesArray = sortVisitedPages(visitedPages);
  console.log("\n\n--------------- REPORT ---------------");
  for (const page of sortedPagesArray) {
    console.log(`${page[1]} links were found for page: ${page[0]}`);
  }
  console.log("--------------------------------------\n");
}

module.exports = {
  sortVisitedPages,
  printSeoReport,
};
