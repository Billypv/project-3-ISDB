# ISDB API Project
* url of api: https://isdb-project-3.herokuapp.com/
## List of technologies used
* Express version: 4.16.4
* http-errors version: ~1.6.3
* jade version: ~1.11.0
* jsonwebtoken version: ^8.5.1
* mongoose version: ^6.1.7
* morgan version: ~1.9.1
* passport version: ^0.5.2
* passport-jwt version: ^4.0.0
* passport-local-mongoose version: ^6.1.0
* node.js
* swagger inspector
### Developer technologies used
* eslint version: ^8.7.0
* eslint-config-airbnb-base version: ^15.0.0
* eslint-plugin-import version: ^2.25.4

## Development Process
First I linked my mongodb atlas to app.js and imported the csv files with mongosh commands. Then I created schemas for the albums, artists, genres, media types, tracks and users. I used jwt to secure the user and all the song endpoints are protected by jwt authentication.
After setting up the authorization key and schemas, I worked on the end points. The login and register endpoints were particularly simple. The song endpoints were slighty more complicated as I had to make them asynchronous in order to allow the api to search mongodb for the relevent information. I particularly enjoyed finding the relation between await and db.find().exec() with the await having to be included in a bracket until the exec() then you can access that outside of the bracket. I feel like this has made my code harder to read intuitively however. Whilst I was searching the database, I decided to not return errors if in the referenced database value did not exist. This is because as my responses are json objects, the user would still get a response and the missing value wouldnt be in the response object.
After completing the endpoints, I attempted to document my api. I found this very difficult with yaml not being intuitive to me and the requirements even with the documentation I found very difficult to navigate.

## Next steps
If I had more time, firstly I would complete the api documentation. Then I would work on the databases and have them reference each other within themselves. This would speed up look up time using mongodb ref attribute. This would increase the scalability of this project as the navigation of databases is currently slow at least if the number of tracks, albums and artists was drastically increased. I would also add a search endpoint. This I think would be relatively simple and I regret not leaving myself time to do this.