const { buildJuneDaytimeData, buildDailyDaytimeWeatherData } = require('../buildWeatherData');

describe('consolidate weather data', () => {
  it(`should consolidate the years`, () => {
    const input = [{
      main: { temp: 289.13 }, clouds: { all: 1 }, dt_iso: '2012-10-02 14:00:00 +0000 UTC'
    }, {
      main: { temp: 289.13 }, clouds: { all: 1 }, dt_iso: '2012-10-02 15:00:00 +0000 UTC'
    }]; 
    const expected = 1;
    const actual = Object.keys(buildDailyDaytimeWeatherData(input)).length;

    expect(actual).toBe(expected);
  });
});