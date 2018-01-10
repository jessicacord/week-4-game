

    // $("#reset").click(spiceRPG.attack);

    var yourCharacter = {};
    var yourHP = 0;
    var yourAP = 0;
    var opponent = {};
    var oppHP = 0;
    var oppCAP = 0;
    var defeats = 0;


    var spiceRPG = {
        girls: [{
            idName: "baby",
            fullName: "Baby Spice",
            healthPoints: 180,
            attackPower: 10,
            counterPower: 15,
            photo: "assets/images/babyspice.jpg"
        },
        {
            idName: "ginger",
            fullName: "Ginger Spice",
            healthPoints: 150,
            attackPower: 8,
            counterPower: 20,
            photo: "assets/images/gingerspice.jpg"
        },
        {
            idName: "posh",
            fullName: "Posh Spice",
            healthPoints: 100,
            attackPower: 4,
            counterPower: 35,
            photo: "assets/images/poshspice.jpg"
        },
        {
            idName: "scary",
            fullName: "Scary Spice",
            healthPoints: 140,
            attackPower: 12,
            counterPower: 10,
            photo: "assets/images/scaryspice.jpg"
        },
        {
            idName: "sporty",
            fullName: "Sporty Spice",
            healthPoints: 125,
            attackPower: 6,
            counterPower: 25,
            photo: "assets/images/sportyspice.jpg"
        }
        ],

        //Create cards for each character before game start and at reset
        createCharacters: function() {
            for ( var i = 0; i < spiceRPG.girls.length; i++ ) {
                
                var newCharacter = spiceRPG.girls[i];
                $("#characters").append($("<button>").attr("id", newCharacter.idName).attr("data-spice", i).addClass("character character-card"));
                $("#" + newCharacter.idName).append($("<img>").attr("src", newCharacter.photo)).append($("<h4>" + newCharacter.fullName + "</h4>").append($("<div>").attr("id", "your-hp").text(newCharacter.healthPoints)));
                

                
            }
        },
        setUpGame: function(){
            spiceRPG.createCharacters();
            $(".character").on("click", spiceRPG.startGame);
        },
        //When a character is selected, start and set up game
        startGame: function() {
            
            //Set Your Character variables to chosen character
            yourCharacter = spiceRPG.girls[$(this).attr("data-spice")];
            yourHP = yourCharacter.healthPoints;
            yourAPRate = yourCharacter.attackPower;
            yourAP = yourCharacter.attackPower;
            
            //Move character card to playing div
            $("#your-character").html($("<button>").attr("id", yourCharacter.idName).addClass("your-character character-card").append($("<img>").attr("src", yourCharacter.photo)).append($("<h4>" + yourCharacter.fullName + "</h4>").append($("<div>").attr("id", "your-hp").text(yourHP))));

            $("#your-character-title").text(yourCharacter.fullName + " is going solo!");

            //Edit Defender Text
            $("#defender-title").text("Pick a girl to defend her place in the band");

            //Move other characters to enemy div
            for ( var i = 0; i < spiceRPG.girls.length; i++ ) {
                if (i != $(this).attr("data-spice")){
                    var newEnemy = spiceRPG.girls[i];
                    $("#enemies").append($("<div>").attr("id", newEnemy.idName).html($("<button>").attr("data-spice", i).addClass("enemy character-card").append($("<img>").attr("src", newEnemy.photo)).append($("<h4>" + newEnemy.fullName + "</h4>").append($("<div>").text(newEnemy.healthPoints)))));
                }
                
            }
            $(".enemy").on("click", spiceRPG.newRound);

            //Remove cards from top
            $("#characters").html("");

            //Add reset button
            $("#reset-div").html($("<button>").attr("id", "reset").html("Reset"));
            $("#reset").on("click", spiceRPG.reset);

        },

        //When opponent is selected
        newRound: function() {

            //Set opponent variables to chosen character
            opponent = spiceRPG.girls[$(this).attr("data-spice")];
            oppHP = opponent.healthPoints;
            oppCAP = opponent.counterPower;

            //Move character card to defender div
            $("#defender").html($("<button>").attr("id", "enemy-" + opponent.idName).addClass("opponent character-card").append($("<img>").attr("src", opponent.photo)).append($("<h4>" + opponent.fullName + "</h4>").append($("<div>").attr("id", "defender-hp").text(oppHP))));

            //Edit Defender Text
            $("#defender-title").text(opponent.fullName + " isn't backing down!");

            //Add attack button
            $("#attack-area").html($("<button>").attr("id", "attack").html("Sing off!"));

            //Remove from 
            $("#" + opponent.idName).html("");

            //Activate Attack Button
            $("#attack").on("click", spiceRPG.attack);

            //Deactive new enemy
            $(".enemy").off("click");

            //Remove Game Info
            $("#game-info").text("");
            
            

        },

        attack: function() {
            oppHP -= yourAP;
            yourHP -= oppCAP;
            yourAP += yourAPRate;

            if (yourHP <= 0) { 
                spiceRPG.gameOver();
            }else if ( oppHP <= 0 ) {
                spiceRPG.defeatOpp();
            } else {
                $("#defender-hp").text(oppHP);
                $("#your-hp").text(yourHP); 
            }       
             
        },
        
        defeatOpp: function () {

            $("#defender").html("");
            $("#attack").off("click");
            
            defeats ++ ;

            if ( defeats === spiceRPG.girls.length - 1) {
                $("#game-info").text("You've defeated all the other members. You are now the world's most powerful Spice Girl!")
            } else {
                $("#your-hp").text(yourHP);
                $("#game-info").text("You won! Pick a new opponent.");
                $("#defender-title").text("Pick a girl to defend her place in the band");
            }
            

            //Activate newRound
            $(".enemy").on("click", spiceRPG.newRound);
        },

        gameOver: function() {
            $("#your-character").html("");
            $("#game-info").text("You lose!")
            $("#attack").off("click");
            $("#your-character-title").text(yourCharacter.fullName + " is out!");
        },

        reset: function() {   
            $("#enemies").html("");
            $("#defender").html("");
            $("#your-character").html("");
            $("#attack-area").html("");
            $("#defender-title").text("");
            $("#your-character-title").text("");
            spiceRPG.setUpGame();

        },


    }

    spiceRPG.setUpGame();


    


