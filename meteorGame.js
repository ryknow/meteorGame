Games   = new Meteor.Collection('games');
Players = new Meteor.Collection('players');

row_size = 5;

var cell = function(index, additional_class) {
  return {
    cell_num: index,
    players: [],
    enemies: [],
    corner: additional_class,
    has_player: function() {
      this.players.length > 0;
    },
    has_enemies: function() {
      this.enemies.length > 0;
    },
    is_building: function() {
      return this.corner !== "" ? true : false;
    },
    adjacent_cells: [
      this.cell_num - row_size,
      this.cell_num + row_size,
      this.cell_num - 1,
      this.cell_num + 1,
      this.cell_num - (row_size + 1),
      this.cell_num - (row_size - 1),
      this.cell_num + (row_size + 1),
      this.cell_num + (row_size - 1)
    ]
  }
};

new_board: function() {
  var board = [];
  var i;
  
  for (i = 0; i < 24; i++) {
    var additional_class;
    switch(i) {
      case 0: 
        additional_class = "top-left";
        break;
      case 4: 
        additional_class = "top-right";
        break;
      case 19:
        additional_class = "bottom-left";
        break;
      case 24:
        additional_class = "bottom-right";
        break;
      default:
        additional_class = "";
    }
    
    board[i] = cell(i, additional_class);
  }
  
  return board;
};

if (Meteor.isServer) {
  Meteor.publish('games', function(id) {
    return Games.find({_id: id});
  });
};
