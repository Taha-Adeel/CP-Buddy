
async function getEditorial(tutorialUrl, page) {

  let editorialText = 'Tutorial link not found';

  if (tutorialUrl) {
    // Go to the tutorial URL
    await page.goto(tutorialUrl, { waitUntil: 'networkidle2' });

    editorialText = await page.evaluate(() => {
      const tutorialLinkElement = Array.from(document.querySelectorAll('a'))
        .find(a => a.href.endsWith('/problem/D'));
      console.log(tutorialLinkElement.textContent)
      let currentElement = tutorialLinkElement.parentElement.nextElementSibling;
      const elements = [];
      while (currentElement) {
        if (currentElement.querySelector('a[href*="/problem/"]')) {
          break;
        }
        if (currentElement.classList.contains('spoiler')) {
          elements.push(currentElement.textContent);
        }
        currentElement = currentElement.nextElementSibling;
      }


      return elements.join('\n');
    });
    
    return editorialText;
  }
}

module.exports = {
  getEditorial
};