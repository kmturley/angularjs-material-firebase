# angular-material-firebase

Example using the following libraries:
* AngularJS
* angular-material
* angularfire

## Installation

Ensure you have Node and NPM installed using the instructions at:

[https://nodejs.org/download/](https://nodejs.org/download/)

Install the project dependancies using:

    npm install

Create a file at /src/components/shared/Firebase.js containing your settings:

    firebase.initializeApp({
        apiKey: 'ABC123',
        authDomain: 'yourapp.firebaseapp.com',
        databaseURL: 'https://yourapp.firebaseio.com',
        storageBucket: 'yourapp.appspot.com',
        messagingSenderId: '01234'
    });

## Usage

Run the local server using the command:

    npm start

Then view the site at:

    http://localhost:8181/


## Deployment

Use the build command to optimise

    npm run build


## Directory structure

    src/                       --> Frontend sources files


## Contact

For more information please contact kmturley