## platform-services-weather

## Problem Statement:

Is the weather getting 'better' or 'worse' over time?  

Use case:  
  
A solar panel company in San Francisco wants to know if the historically gloomy month of June is getting 'better' or 'worse' over the last five years.   
Solar panels lose approximately 30% of their efficiency in cloudy weather. Therefore, % cloudiness will be be the main determinate of weather improvement. 

## Methods:

Historical weather data was downloaded via the open weather map 'Historical data' API. A bulk download of the past five years was available. The data contained hourly data from April 2012 - April 2018.

https://openweathermap.org/history-bulk

The hourly bulk data was consolidated into avg cloudiness per day. Daylight hours were only considered (7 am - 7pm). 

## Results:

The June forecast for solar panel efficiency in San Francisco appears to be getting worse over the past 5 years.

<img src="images/weather.png">

## Style:

The script followed the style used in the google sheets API docs. 

## Script Instructions:

1. Clone repo to your machine and cd into the working directory 
2. Create a .env file and add the following lines:  
  - SPREADSHEET_ID=<your-destination-google-spreadsheet-id>  
  - PORT=3000
3. Follow Steps 1 & 2 from:   https://developers.google.com/sheets/api/quickstart/nodejs#step_3_set_up_the_sample

## Docker build

Instructions:
1. Build image:  
  - 'docker build -t weatherserver .'
2. Spin up container:  
  - 'docker run -d -p 1000:3000 --rm weatherserver'
3. Stop container:  
  - 'docker stop <container-name>'  