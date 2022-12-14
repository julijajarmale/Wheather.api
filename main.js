function GetInfo() {
  const newName = document.getElementById("cityInput").value;
  console.log(newName);
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = `${newName}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=377444acbbfeceaf37fc429cabfefe2e&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        document.getElementById(`day${i + 1}Min`).innerHTML =
          "Min:" + Number(data.list[i].main.temp_min).toFixed(1) + "°C";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById(`day${i + 1}Max`).innerHTML =
          "Max:" + Number(data.list[i].main.temp_max).toFixed(1) + "°C";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById(`img${i + 1}`).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
    })

    .catch((err) => alert("Please, type a valid city name"));
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Vilnius";
  GetInfo();
}

const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satturday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
