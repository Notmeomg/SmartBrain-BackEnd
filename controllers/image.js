const apiKey = require('./apikey.js').apiKey;
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: apiKey, // Enter your API Key from Clarifai
   });

const handleApiCall = (req, res) => {
    // passes req input from front end to Clarifai FACE_DETECT_MODEL api and res with face detection obj
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with Api'))
}


const handleImage = (req, res, db) => {
    // Updates db with how many images a user has input to the Clarifai FACE_DETECT_MODEL api res with entry count
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}