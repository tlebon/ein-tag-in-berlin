## Welcome To Berlin! We help you find a randomly generated and incredible day near you! 

Simply click the button and we find a full day of fun events near you! 

# Beer, bars, music, and more!

NOTES:
1)Hidden API YELP KEY IN Heroku Config Vars & .env.  Use in code as:
headers: {
            Authorization:
            process.env.yelp_key
          }

2)Crawler Functions are automated to two day intervals.  Add Events and Check Coordinates should be initiated on herokuDeploy with a difference of 5 minutes.

3)routes/YelpEventUpdater.js calls all events from DB and Puts them Through the Yelp API.  Could Be improved with cleaning venue names.**NEEDS .env to run**