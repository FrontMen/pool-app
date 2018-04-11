const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../lib/connectDb');
const EloRank = require('elo-rank');
var elo = new EloRank();

module.exports = ({ player1, win, player2 }, callback) => {
  try {
    return connectDb(db => playGame(db, { player1, win, player2 }, callback));
  } catch (error) {
    return callback(error);
  }
};

const playGame = (db, { player1, win, player2 }, callback) => {
  connectDb(db => {
    db.collection('users').findOne({ name: player1 }, (err, $player1) => {
      db.collection('users').findOne({ name: player2 }, (err, $player2) => {
        if (!$player1 || !player2) {
          return callback(
            err,
            `Player(s) ${!$player1 ? player1 : ''} ${!$player2
              ? player2
              : ''} not found`
          );
        }
        // calculate new scores
        const newScores = calculateNewElo($player1.score, win, $player2.score);
        const matchId = new ObjectID();
        // save match
        // save new score
        db.collection('users').updateOne({ _id: new ObjectID($player1._id) }, {
          $set: { score: newScores.p1score },
          $push: {
            matches: createMatch({
              player: $player1,
              win: win,
              opponent: $player2,
              playerScore: newScores.p1score,
              oppScore: newScores.p2score,
              matchId,
            }),
          },
        }, (err, result) => {
          if (err) {
            return callback(err, result);
          }
          // save match
          // save new score
          db.collection('users').updateOne({
            _id: new ObjectID($player2._id),
          }, {
            $set: { score: newScores.p2score },
            $push: {
              matches: createMatch({
                player: $player2,
                win: !win,
                opponent: $player1,
                playerScore: newScores.p2score,
                oppScore: newScores.p1score,
                matchId,
              }),
            },
          }, (err, result) => {
            return callback(err, result);
          });
        });
      });
    });
  });
};

var calculateNewElo = (p1score, win, p2score) => {
  var expectedScoreA = elo.getExpected(p1score, p2score);
  var expectedScoreB = elo.getExpected(p2score, p1score);
  const result = win ? 1 : 0;
  //update score, 1 if won 0 if lost
  p1score = elo.updateRating(expectedScoreA, result, p1score);
  p2score = elo.updateRating(expectedScoreB, !result, p2score);

  return { p1score, p2score };
};

var createMatch = ({
  player,
  win,
  opponent,
  playerScore,
  oppScore,
  matchId,
}) => {
  return {
    matchId,
    player: player._id,
    opponent: opponent._id,
    date: Date.now(),
    eloBefore: player.score,
    diff: playerScore - player.score,
    eloAfter: playerScore,
    oppEloBefore: opponent.score,
    oppDiff: oppScore - opponent.score,
    oppEloAfter: oppScore,
  };
};
