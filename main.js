// score arrays
playerScore = [0]
opponentScore = [0]

var gameScoring = function () {
  playerTotal = playerScore.reduce(function(a, b) {
    return a + b;
  });
  console.log(playerTotal)

  opponentTotal = opponentScore.reduce(function(a, b) {
    return a + b;
  });
  console.log(opponentTotal)

  if (playerTotal == 10) {
    $('#actionContainer').prepend('<h4>YOU WON</h4>').css('color','green')
    console.log("you win!")
  }

  else if (opponentTotal == 10) {
    $('#actionContainer').prepend('<h4>YOU LOST</h4>').css('color','red')
    console.log('you lost')
  }

  $('.playerScore').html('<h5>'+ playerTotal + '</h5>');
  $('.opponentScore').html('<h5>'+ opponentTotal + '</h5>');
}

// constructors

function ball (obj) {
  var spec = obj || {};

  this.control = Math.floor((Math.random() * 10) + 1);
  this.trajectory = Math.floor((Math.random() * 10) + 1);

}

function player (obj) {
  var spec = obj || {};

  this.name = obj.name || "player";
  this.skill = obj.skill;
  this.offense = obj.offense;
  this.defense = obj.defense;
  this.shoot = function (opponent) {
    for (var i=0;i<1;i++){

    var offMultiplier = Math.floor((Math.random() * 10) + 1);
    var defMultiplier = Math.floor((Math.random() * 10) + 1);

    var shotNum = this.offense * offMultiplier
    var blockNum = opponent.defense * defMultiplier

    if (shotNum > blockNum) {
      ball[i] = new ball();
      console.log(ball[i])

      if (ball[i].trajectory > 3) {
        $('#actionContainer').prepend('<i class="fa fa-dribbble"></i><h6>shot is GOOD</h6>').css('color','green')
        //add point to player
        playerScore.push(1)
        gameScoring();
        // switch to defense screen
        $('#offenseControls').hide();
        $('#defenseControls').show();

      }

      else {
        $('#actionContainer').prepend('<i class="fa fa-ban"></i><h6>you missed the shot</h6>').css('color','red')
        console.log("you missed the shot")
        // switch to defense screen
        $('#offenseControls').hide();
        $('#defenseControls').show();
      }
    }

    else {
      $('#actionContainer').prepend('<i class="fa fa-bold"></i><h6>your shot was blocked by the defender</h6>')
      console.log('your shot was blocked by the defender')
      // switch to defense screen
      $('#offenseControls').hide();
      $('#defenseControls').show();
    }
  }
 }
  this.dribble = function (opponent) {
    for (var i=0;i<1;i++){
     ball[i] = new ball();

    var dribbleNum = this.offense * ball[i].control

    if (dribbleNum > 400) {
      $('#actionContainer').prepend('<i class="fa fa-street-view"></i><h6>you faked out your opponent and have a wide open shot</h6>')
      console.log("you faked out your opponent and have a wide open shot")
      this.offense += 25
      console.log("player 1 offense is now " + this.offense)
    }

    else {
      $('#actionContainer').prepend('<i class="fa fa-hand-o-right"></i><h6>you lost your dribble and turned the ball over</h6>')
      console.log('you lost your dribble and turned the ball over')
      // switch to defense screen
      $('#offenseControls').hide();
      $('#defenseControls').show();
    }
  }
 }
  this.block = function (opponent) {
    for (var i=0;i<1;i++){

    var offMultiplier = Math.floor((Math.random() * 10) + 1);
    var defMultiplier = Math.floor((Math.random() * 10) + 1);

    var shotNum = this.offense * offMultiplier
    var blockNum = opponent.defense * defMultiplier

    if (blockNum > shotNum) {
       ball[i] = new ball();

      if (ball[i].trajectory > 3) {
        $('#actionContainer').prepend('<i class="fa fa-dribbble"></i><h6>your opponent made the shot</h6>').css('color','red')
        console.log("your opponent made the shot")
        //add point to opponent
        opponentScore.push(1)
        gameScoring();
        // switch to offense screen
        $('#defenseControls').hide();
        $('#offenseControls').show();
      }

      else {
        $('#actionContainer').prepend('<i class="fa fa-ban"></i><h6>your opponent missed the shot</h6>')
        console.log("your opponent missed the shot")
        // switch to offense screen
        $('#offenseControls').show();
        $('#defenseControls').hide();
      }
    }

    else {
      $('#actionContainer').prepend('<i class="fa fa-bold"></i><h6>you blocked your opponents shot</h6>')
      console.log('you blocked your opponents shot')
      // switch to offense screen
      $('#offenseControls').show();
      $('#defenseControls').hide();
    }
   }
  }
  this.steal = function (opponent) {
    for (var i=0;i<1;i++){

    ball[i] = new ball()

    var dribbleNum = opponent.offense * ball.control
    var stealNum = this.defense * ball[i].control

    if (stealNum > dribbleNum) {
      $('#actionContainer').prepend('<i class="fa fa-dribbble"></i><h6>you got faked out and your opponent scored</h6>').css('color','red')
      console.log("you got faked out and your opponent scored")
      // add point to opponent
      opponentScore.push(1)
      gameScoring();
      // switch to offense screen
      $('#offenseControls').show();
      $('#defenseControls').hide();

    }

    else {
      $('#actionContainer').prepend('<i class="fa fa-hand-o-left"></i><h6>you stole the ball and now its your turn</h6>').css('color','green')
      console.log('you stole the ball and now its your turn')
      // switch to offense screen
      $('#offenseControls').show();
      $('#defenseControls').hide();
    }

  }
 }
}

function opponent (obj) {
  var spec = obj || {};

  this.name = obj.name || "opponent";
  this.skill = obj.skill;
  this.offense = obj.offense;
  this.defense = obj.defense;
}


// page obj ////////////////////
///////////////////////////////
var game = {

  init: function () {
    game.loadSignup();
    game.initEvents();
  },

  initEvents: function () {

    $('#wrapper').on('click', '.infoSubmit', function () {
      // Build player and opponent objects
      $('#mainScreen').show();
      $('#playerInfo').hide();
      $('#offenseControls').show();
      $('#defenseControls').hide();
      game.playersCreate();
      $('#actionContainer').prepend('<h6>you have first possession</h6>')
      console.log("you have first possession")
    });

  },

  initStyle: function () {

  },

  loadSignup: function () {
    $('#mainScreen').hide();
  },

  playersCreate: function () {

    if($('.skillSelect').val() == "floorGeneral") {

      var opponent1 = new opponent({
        skill: "posterizer",
        offense: 20,
        defense: 70
        })

      var player1 = new player({
        name: $('.playerName').val(),
        skill: "floorGeneral",
        offense: 35,
        defense: 55
      })

      console.log(opponent1)
      console.log(player1)
      $('.playerBoardName').html('<h5>'+ player1.name +'</h5>')
    }

    else if($('.skillSelect').val() == "threePtSpecialist") {
      var opponent1 = new opponent({
        skill: "floorGeneral",
        offense: 35,
        defense: 55
      })

      var player1 = new player({
        name: $('.playerName').val(),
        skill: "threePtSpecialist",
        offense: 60,
        defense: 30
      })
      console.log(opponent1)
      console.log(player1)
      $('.playerBoardName').html('<h5>'+ player1.name +'</h5>')
    }

    else {
      var opponent1 = new opponent({
        skill: "threePtSpecialist",
        offense: 60,
        defense: 30
      })

      var player1 = new player({
        name: $('.playerName').val(),
        skill: "posterizer",
        offense: 20,
        defense: 70
      })
      console.log(opponent1)
      console.log(player1)
      $('.playerBoardName').html('<h3>'+ player1.name +'</h3>')
      $('body').addClass("bg");
    }

  // playerMoves ////
  //////////////////

  // shoot
    $('#wrapper').on('click', '.shoot', function (e) {
      e.preventDefault
      // player move
      player1.shoot(opponent1)
      // opponent move
      console.log("your opponent has the ball and you are on defense")
    })

    // dribble
    $('#wrapper').on('click', '.dribble', function (e) {
      e.preventDefault
      player1.dribble(opponent1)
    })

    // steal
    $('#wrapper').on('click', '.steal', function (e) {
      e.preventDefault
      player1.steal(opponent1)
    })

    // block
    $('#wrapper').on('click', '.block', function (e) {
      e.preventDefault
      player1.block(opponent1)
    })

 }

}


//page init
$(document).ready(function () {
  game.init();
});
