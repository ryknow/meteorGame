Meteor.methods({
  start_new_game: function() {
    var turns_left = 30;
    var game_id = Games.insert({board: new_board, turns_left: turns_left});
    Players.update({game_id: null, name: {$ne: ''}}, 
                   {$set: {game_id: game_id}}, 
                   {multi: true});
    var players = Players.find({game_id: game_id},
                               {fields: {_id: true, name: true}}).fetch();
    Games.update({_id: game_id}, {$set: {players: players}});
    
    var game  = Games.find({_id: game_id});
    var board = game.board;
    
    place_players();
    
    Meteor.publish("place_enemies", players.length * 3);
    // TODO: Loop through players
    // After each gets a turn decrement turns_left by 1 and update the game
    if (turns_left === 0) {
      console.log("Game Over");
    }
  }
});
