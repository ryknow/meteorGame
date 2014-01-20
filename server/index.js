var place_players = function(players) {
  var player_map = _.map(players, function(player) {
    return {
      _id:     player._id,
      health:  player.health,
      weapons: [],
      type:    player.type,
      name:    player.name
    }
  });
  return player_map;
}

Meteor.methods({
  start_new_game: function() {
    var turns_left = 30;
    var game_id = Games.insert({board: new_board, turns_left: turns_left});
    
    Players.update({game_id: null, name: {$ne: ''}}, 
                   {$set: {game_id: game_id}}, 
                   {multi: true});
                   
    var players = Players.find({game_id: game_id},
                               {fields: {
                                 _id: true, 
                                 name: true,
                                 health: true,
                                 type: true}}).fetch();
                                 
    Games.update({_id: game_id}, {$set: {players: players}});
    
    var game  = Games.find({_id: game_id});
    var board = game.board;
    board[12].players = place_players(players);
    
    // TODO: Allow Enemy Controller to place enemies on corner points
    
    // TODO: Loop through players allowing each a turn
    // After each gets a turn decrement turns_left by 1 and update the game object
    
    if (turns_left === 0) {
      console.log("Game Over");
    }
    
    return game;
  }
});
