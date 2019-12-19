var express = require('express');
var router = express.Router();

var Score = require('../models/score');

/* GET all scores. */
router.get('/', (req, res, next) => {
    Score.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/* GET score by id. */
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Score.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

router.post('/', (req, res, next) => {
    const score = new Score({
        name: req.body.name,
        score: req.body.score
    });
    score.save().then(result => {
        console.log(result);
    })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST requests to /api/scores",
        createdScore: score
    });
})

module.exports = router;