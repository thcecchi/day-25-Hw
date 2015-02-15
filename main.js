// constructors

function player (obj) {
  var spec = obj || {};

  this.name = obj.name || "player";
  this.skill = obj.skill
}

function opponent (obj) {
  var spec = obj || {};

  this.name = obj.name || "opponent";
  this.skill = obj.skill
}

function ball (obj) {
  var spec = obj || {};

  this.name = obj.name || "ball";

}

function hoop (obj) {
  var spec = obj || {};

  this.name = obj.name || "hoop";

}

// page obj
var game = {

  init: function () {
    game.initStyle();
    game.initEvents();
  },

  initStyle: function () {
    $('#wrapper').on('click', '.infoSubmit', function () {

// Build player object
      var player1 = new player({
          name: $('.playerName').val(),
          skill: $('.skillSelect').val()
          offense:  ,
          defense:
        })
        console.log(player1)

// Build opponent object
      if(player1.skill == "floorGeneral") {
        var opponent1 = new opponent({
          skill: "posterizer",
          offense: 20,
          defense: 70
        })
        console.log(opponent1)
      }

      else if(player1.skill == "threePtSpecialist") {
        var opponent1 = new opponent({
          skill: "floorGeneral",
          offense: 35,
          defense: 55
        })
        console.log(opponent1)
      }

      else {
        var opponent1 = new opponent({
          skill: "threePtSpecialist",
          offense: 60,
          defense: 30
        })
        console.log(opponent1)
      }
    });
  },

  initEvents: function () {

  }

}


//page init
$(document).ready(function () {
  game.init();
});
