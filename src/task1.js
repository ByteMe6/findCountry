import axios from 'axios';

let textField = document.querySelector('.countryINfo');
let findBtn = document.querySelector('.btn');
let countryImg = document.querySelector('.countryImg');

function getCountry() {
  let country = document.querySelector('.input').value;

  if (country === 'говно') {
    country = 'Russia';
  }
  if (country === 'hentai') {
    country = 'Japan';
  }
  axios
    .get(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      let countryInfo = response.data[0];
      let countryName = countryInfo.name;
      let countryCommon = countryName.common;

      let countryRegion = countryInfo.region;

      let languages = countryInfo.languages
        ? Object.values(countryInfo.languages).join(', ')
        : 'Информация о языках отсутствует';
      // ? - если

      let capital = countryInfo.capital
        ? countryInfo.capital[0]
        : 'Информация о столице отсутствует';

              let flagEmoji = countryInfo.flag;
              console.log(flagEmoji)
              if(flagEmoji === "🇷🇺"){
                flagEmoji = "💩"
              }


      // Очищаем предыдущее содержимое
      textField.innerHTML = '';

      // Создаем элемент для текстовой информации
      // let textInfo = document.createElement('p');
      textField.textContent = `Запрос на страну: ${countryCommon} ${flagEmoji}, Материк: ${countryRegion}, Официальный язык(и): ${languages}, Столица: ${capital}`;
      // textField.appendChild(textInfo);

      // Создаем и добавляем изображение флага

      let FlagData = response.data[0];
      let flagUrl = FlagData.flags.png;

      countryImg.innerHTML = "";

      let flagImg = document.createElement('img');
      flagImg.src = flagUrl;
      flagImg.alt = `Флаг ${countryCommon}`;
      flagImg.style.maxWidth = '200px';
      countryImg.appendChild(flagImg);

      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
      countryImg.innerHTML = "";
      textField.textContent = `Вы ввели страну неправильно, пишите на английском, полное слово`;
    });
}

findBtn.addEventListener('click', getCountry);
