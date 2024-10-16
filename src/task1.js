import axios from "axios";

let textField = document.querySelector(".countryINfo");
let findBtn = document.querySelector(".btn");

function getCountry() {
  let country = document.querySelector(".input").value;

  if(country === "говно"){
    country = "Russia"
  }
  axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then(function(response) {
      let countryInfo = response.data[0];
      let countryName = countryInfo.name;
      let countryCommon = countryName.common;

      let FlagData = response.data[0];
      let flagUrl = FlagData.flags.png;

      let countryRegion = countryInfo.region;

      let languages = countryInfo.languages ? Object.values(countryInfo.languages).join(", ") : "Информация о языках отсутствует";

      let capital = countryInfo.capital ? countryInfo.capital[0] : "Информация о столице отсутствует";

      // Очищаем предыдущее содержимое
      textField.innerHTML = '';

      // Создаем элемент для текстовой информации
      let textInfo = document.createElement('p');
      textInfo.textContent = `Запрос на страну: ${countryCommon}, Материк: ${countryRegion}, Официальный язык(и): ${languages}, Столица: ${capital}`;
      textField.appendChild(textInfo);

      // Создаем и добавляем изображение флага
      let flagImg = document.createElement('img');
      flagImg.src = flagUrl;
      flagImg.alt = `Флаг ${countryCommon}`;
      flagImg.style.maxWidth = '200px'; 
      textField.appendChild(flagImg);

      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
      textField.textContent = `Вы ввели страну неправильно, пишите на английском, полное слово`;
    });
}

findBtn.addEventListener("click", getCountry);