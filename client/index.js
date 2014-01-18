Template.login.events({
  'click .start': function() {
    if (typeof console !== 'undefined') {
      console.log("You pressed the button");
    }
  }
});

Template.board.events({
  'mouseenter .square': function(ev) {
    $(ev.currentTarget).css({"background-color": "blue"});
  },
  'mouseleave .square': function(ev) {
    $(ev.currentTarget).css({"background-color": "#eeeee8"});
  },
  'click .square': function(ev) {
    // Check square for character to initiate action on
    console.log("clicked square");
  }
});

Template.controls.events({
  'click #dice-number': function(ev) {
    console.log(Session.get("rolled"));
    var rolled = Session.get("rolled");
    if (rolled === false || _.isUndefined(rolled)) {
      var num = Math.floor(Math.random() * 6 + 1);
      $(ev.currentTarget).html(num).addClass("disabled-dice");
      Session.set("rolled", true);
      Session.set("rolledNum", num);
    }
  }
});

Template.actions.move = function() {
  return Session.get("rolled");
}

Template.actions.moveRange = function() {
  return Session.get("rolledNum");
}

Template.actions.events({
  'click .move-btn': function(ev) {
    console.log("Move the character");
  }
});

Template.finish.events({
  'click finish-btn': function(ev) {
    // Save the current status to the database so that you 
    // can return to this point in the game
    console.log("Finish your turn");
  }
});
