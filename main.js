function main() {
  // first input argument is the interpreter, second is a link to main.js, and the third is the user input
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Only one command line argument allowed");
    process.exit(1);
  }

  const URL = process.argv[2];
  console.log("Crawling " + URL + "...");
}

main();
