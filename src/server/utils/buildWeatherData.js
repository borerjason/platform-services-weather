const fs = require('fs');

const buildData = (callback) => {
    fs.readFile('SF_weather.json', (err, content) => {
    if (err) return console.log('Error loading weather file:', err);
    const weatherData = JSON.parse(content);
    const dailyData = buildDailyDaytimeWeatherData(weatherData);
    const juneData = buildJuneDaytimeData(dailyData);
   
    callback(juneData);
  });
}

const buildDailyDaytimeWeatherData = (hourlyData)  =>{
  const data = {};

  hourlyData.forEach(reading => {
    const year = reading.dt_iso.slice(0, 4);
    const month = reading.dt_iso.slice(5, 7);
    const day = reading.dt_iso.slice(8, 10);
    const date = reading.dt_iso.slice(0, 10);
    const hour = parseInt(reading.dt_iso.slice(11, 13));

    data[year] = data[year] || {};
    data[year][month] = data[year][month] || {};
    data[year][month][day] = data[year][month][day] || { date: date, temp: [], avgTemp: null, clouds: [], avgCloud: null };

    if (hour >= 7 && hour <= 19) {
      const clouds = data[year][month][day].clouds;
      const temp = data[year][month][day].temp;

      temp.push(~~(reading.main.temp * (9 / 5) - 459.67))
      clouds.push(reading.clouds.all);

      const sumClouds = clouds.reduce((a, b) => parseInt(a) + parseInt(b))
      const avgClouds = ~~(sumClouds / clouds.length);

      const sumTemp = temp.reduce((a, b) => parseInt(a) + parseInt(b))
      const avgTemp = ~~(sumTemp / temp.length);

      data[year][month][day].avgCloud = avgClouds;
      data[year][month][day].avgTemp = avgTemp;
    }  
  });

  return data;
}

const buildJuneDaytimeData = (dailyData) => {
  const upload = [];
  for (let i = 2013; i < 2018; i += 1) {
    for (let j = 1; j < 31; j += 1) {
      let day = '';
      day += j < 10 ? '0' + j : j;
      const interval = dailyData[i.toString()]['06'][day];
      if (interval) {
        upload.push([interval.date, interval.avgCloud, interval.avgTemp]);
      } else {
        upload.push(null, null, null);
      }
    }
  }

  return upload;
}

module.exports = { buildData, buildJuneDaytimeData, buildDailyDaytimeWeatherData };
