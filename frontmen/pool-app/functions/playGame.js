const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../src/connectDb');
const EloRank = require('elo-rank');
var elo = new EloRank();


/**
 * @param {string} player1 
 * @param {boolean} won 
 * @param {string} player2 
 */
module.exports = (player1, won, player2, callback) => {
  try {
    return connectDb(db => playGame(db, player1, won, player2, callback));
  } catch (error) {
    return callback(error);
  }
};

const playGame = (db, player1, won, player2, callback) => {
  connectDb(db => {
    db.collection('users').findOne({ name: player1 }, (err, $player1) => {
      db.collection('users').findOne({ name: player2 }, (err, $player2) => {
        // calculate new scores
        const newScores = calculateNewElo($player1.score, won, $player2.score);

        // save match
        // save new score
        db.collection('users').updateOne({ _id: new ObjectID($player1._id) }, {
          $set: { score: newScores.p1score },
          $push: {
            matches: createMatch(
              $player1._id,
              won,
              $player2._id,
              $player1.score,
              newScores.p1score
            ),
          },
        }, (err, result) => {
          return callback(err, result);
        });

        // save match
        // save new score
        db.collection('users').updateOne({ _id: new ObjectID($player2._id) }, {
          $set: { score: newScores.p2score },
          $push: {
            matches: createMatch(
              $player2._id,
              !won,
              $player1._id,
              $player2.score,
              newScores.p2score
            ),
          },
        }, (err, result) => {
          return callback(err, result);
        });
      });
    });
  });
};

var calculateNewElo = (p1score, win, p2score) => {
  var expectedScoreA = elo.getExpected(p1score, p2score);
  var expectedScoreB = elo.getExpected(p2score, p1score);

  //update score, 1 if won 0 if lost
  p1score = elo.updateRating(expectedScoreA, win, p1score);
  p2score = elo.updateRating(expectedScoreB, !win, p2score);

  return { p1score, p2score };
};

var createMatch = (player, win, opponent, eloBefore, eloAfter) => {
  return {
    player,
    win,
    opponent,
    date: Date.now(),
    eloBefore,
    eloAfter,
  };
};
