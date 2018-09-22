var http = require('http');
var express = require('express');

var server = http.createServer(
    function (req, res) {
        res.write('Hello World!');
        res.end();
    }
);

server.listen(8080);





const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// Parler des dépendances
// Parler de Snyk => vulnérabilités
// Parler des logs
// Parler des Tests
// Parler de Morgan
// Parler de la suite => API / ou poser la question => qu'auriez-vous voulu que je couvre ?
// revoir aussi comment Open Class rooms faisait la progression
// Biblio : citer les articles + open classrooms + citer le bouquin
// Reprendre l'archi proposée dans le deck P5 téléchargé sur Node
// Parler de l'histoire (pointer vers mon article sur le Front End)

// 0 - Histoire et architecture
// 1 - Hello World "minimum" à la main en live


// 2 - Introduire Express pour faire une API C / R
// 3 - Tester l'API avec Mocha (faire du mocking)
// 4 - Faire le backend avec Mongoose + MongoDB

// ENV pour switcher les tests + pour le mot de passe

// 5 - Tester l'API avec l'outil de test des APIs en ligne
// 6 - Faire un client React
//    - Hey, c'est une appli MERN
// 7 - Parler de sécurité : Snyk
// 8 - Parler d'exploitabilité : cf. slides du collègue

// 9 - Bibliographie + GIT

// 10 - Feedback + remerciements
//  - Parler des prochains épisodes : APIs / IoT (avec Raspberry) / 