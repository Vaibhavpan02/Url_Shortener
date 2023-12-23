const menu = document.getElementById('menu');
const nav = document.querySelector('.navigation');

menu.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const btn = document.getElementById('submit-btn');
const resultDiv = document.querySelector('.result');
let inputUrl = document.getElementById('search');

const api = 'https://api.shrtco.de/v2/shorten?url=';

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputUrl.value !== '') {
    let fetchUrl = `${api}${inputUrl.value}`;
    fetch('https://api.shrtco.de/v2/shorten?url=' + inputUrl.value)
      .then((res) => res.json())
      .then((data) => {
        inputUrl.value = '';
        resultDiv.style.display = 'block';
        displayShortenUrls(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert('Please enter a link');
  }
});

function displayShortenUrls(urls) {
  resultDiv.innerHTML = `
      <div class="result-url">
          <p class="url">${urls.full_short_link}</p>
          <button class="form-control submit copy">Copy</button>
      </div>
      <div class="result-url">
          <p class="url">${urls.full_short_link2}</p>
          <button class="form-control submit copy">Copy</button>
      </div>
      <div class="result-url">
          <p class="url">${urls.full_short_link3}</p>
          <button class="form-control submit copy">Copy</button>
      </div>
    `;
  const copyBtns = document.querySelectorAll('.copy');

  if (copyBtns.length !== 0) {
    bindLinkCopyLogic(copyBtns);
  }
}

function bindLinkCopyLogic(btns) {
  const allUrls = document.querySelectorAll('.url');
  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      let copyText = allUrls[index].textContent;
      navigator.clipboard.writeText(copyText);
      btn.textContent = 'Copied!';
    });
  });
}
