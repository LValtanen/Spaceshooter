## SPACE SHOOTER REST API

This is a REST API for a Space Shooter game project, created with a 3-person dev team for the Academy bootcamp by Academic Work.

The API supports GET and POST requests for getting and posting Highscores.

### Getting started:

1. Run "npm install" on command line

2. Create a "nodemon.json" file and define the database password for your MongoDB collection. Eg.

{
    "env": {
        "MONGO_ATLAS_PW": "Y6zq9U2bHHCBWnYT"
    }
}

3. Change the URL of your database collection at app.js

4. Start the server with "nodemon start"