const puppeteer = require('puppeteer');
const { getEditorial } = require('./editorial');
const memoizeAsync = require('../util').memoizeAsync;

async function getProblemAndEditorial(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the given URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract the problem statement
  const problemText = await page.evaluate(() => {
    const problemStatementElement = document.querySelector('.problem-statement');
    return problemStatementElement ? problemStatementElement.textContent : 'Problem statement not found';
  });

  // Extract the tutorial link
  const tutorialUrl = await page.evaluate(() => {
    const tutorialLinkElement = Array.from(document.querySelectorAll('a'))
      .find(a => a.textContent.toLowerCase().includes('tutorial') || a.textContent.toLowerCase().includes('editorial'));
    return tutorialLinkElement ? tutorialLinkElement.href : null;
  });

  const problemCode = url.split('/').pop();
  const editorialText = await getEditorial(tutorialUrl, page, problemCode);

  await browser.close();

  return { problemText, editorialText };
}

async function getProblemAndEditorialMemoized(url) {
  return await memoizeAsync(getProblemAndEditorial)(url);
}

module.exports = { getProblemAndEditorial, getProblemAndEditorialMemoized };

// const url = 'https://codeforces.com/contest/1990/problem/A';
// getProblemAndEditorial(url).then(result => {
//   console.log('Problem Statement:', result.problemText); console.log('Editorial:', result.editorialText);
// }).catch(error => {
//   console.error('Error:', error);
// });