# platform-services-weather

# Problem Statement:

Is the weather getting 'better' or 'worse' over time?  

Use case:  
  
A solar panel company in San Francisco wants to know if the historically gloomy month of June is getting 'better' or 'worse' over the last five years.   
Solar panels lose approximately 30% of their efficiency in cloudy weather. Therefore, % cloudiness will be be the main determinate of weather improvement. 

# Methods:

Historical weather data was downloaded via the open weather map 'Historical data' API. A bulk download of the past five years was available. The data contained hourly data from April 2012 - April 2018.

https://openweathermap.org/history-bulk

The hourly bulk data was consolidated into avg cloudiness per day. Daylight hours were only considered (7 am - 7pm). 

# Style:

The script followed the style used in the google sheets API docs. 

# Script Instructions:

Follow Steps 1 & 2 from:   https://developers.google.com/sheets/api/quickstart/nodejs#step_3_set_up_the_sample

Turn on Google API:

a. Use the setup wizard to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.  
  - https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com  
b. On the Add credentials to your project page, click the Cancel button.  
c. At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
d. Select the Credentials tab, click the Create credentials button and select OAuth client ID.  
e. Select the application type Other, enter the name "Google Sheets API Quickstart", and click the Create button.  
f. Click OK to dismiss the resulting dialog.  
g. Click the file_download (Download JSON) button to the right of the client ID.  
h. Move this file to your working directory and rename it client_secret.json.  


Information on how to append to google sheet:  
https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append  


#Docker build

Instructions:
1. Build image:  
  - 'docker build -t weatherserver .'
2. Spin up container:  
  - 'docker run -d -p 1000:3000 --rm weatherserver'
3. Stop container:  
  - 'docker stop <container-name>'  