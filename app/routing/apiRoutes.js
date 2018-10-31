// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/survey", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests

  app.post("/api/survey", function(req, res) {

    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: Infinity
    }

    var userData = req.body
    var userScores = userData.scores

    var totalDifference;

    for (var i = 0; i < friendsData.length; i++) {
        var currentFriend = friendsData[i]
        totalDifference = 0

         for (var j = 0; j < currentFriend.scores.length; j++) {
             var currentFriendScore = currentFriend.scores[j]
             var currentUserScores = userScores[j]

             totalDifference += Math.abs(parseInt(currentUserScores) - parseInt(currentFriendScore))
         }

         if (totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = currentFriend.name;
            bestMatch.photo = currentFriend.photo;
            bestMatch.friendDifference = totalDifference;
         }
    }

    friendsData.push(userData);

    res.json(bestMatch)

  })
}