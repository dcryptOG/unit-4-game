$(document).ready(function () {
    var allHeroes = {
        sidious: {
            health: 180,
            attack: 14,
            counter: 50,
        },
        yoda: {
            health: 350,
            attack: 16,
            counter: 40,
            loserImg: "loser.jpeg"
        },
        vader: {
            health: 200,
            attack: 18,
            counter: 25,
            loserImg: "loser.jpeg"
        },
        rae: {
            health: 250,
            attack: 16,
            counter: 10,
            loserImg: "loser.jpeg"
        }
    };

    var hero = "";
    var challenger = "";
    var myChallenger = "";
    var currentAttack = 0;
    var wins = 0;
    var restartBtn = $("<button>RESTART</button>");
    var attackBtn = $("<button>ATTACK!</button>");
    attackBtn.addClass("btn btn-dark");

    // append user hero
    
    $(".avatar").click(function () {
        if (!hero) {
            hero = allHeroes[$(this).val()];
            $("#hero-body").append(this);
            $("#hero-health").append("Health:" + hero.health);
        }
    });

    // append challenger & buttons

    $("#heroSelection").on("click", ".avatar", function chooseChallenger() {
        if (!myChallenger) {
            challenger = allHeroes[$(this).val()];
            $(".dropdown").css("display", "none")
            $(".fight-notification").css("display", "inline-flex")
            $(this).removeClass(".avatar");
            $("#challenger-body").append(this);
            $("#challenger-health").append(challenger.health);
            $("#attack-button").append(attackBtn);
        }
    });

    // win

    $("#attack-button").on("click", function () {
        heroAttack();
        counterAttack();
        if (wins === 3) {
            youWon();
        }
    });

    // hero attack function & narrative

    function heroAttack() {
        currentAttack += hero.attack;
        challenger.health -= currentAttack;
        $("#attack-nar").text("You attacked for " + currentAttack + " damage!")
        $("#challenger-health").text("Health: " + challenger.health);
        if (challenger.health <= 0 && hero.health > 0) {
            challengerDied();
        };
    }

    // counter attack function  narrative

    function counterAttack() {
        if (challenger.health > 0) {
            hero.health -= challenger.counter;
            // if hero dies, the attack button disappears, restart button appears, hero image changes
            if (hero.health <= 0) {
                $(".lose").css("display", "inline-flex");
                $("#message-box").append("You lost!");
                makeRestartBtn();
                $("#attack-button").empty();
            };
            $("#attack-nar").append("<div>Your opponent attacked and you took " + challenger.counter + " damage!</div>");
            $("#hero-health").text("Health: " + hero.health);
        }
    };

    function challengerDied() {
        wins++;
        $(".fight-notification").css("display", "inline-flex")
        $(".dropdown").css("display", "inline-flex")
        $(myChallenger).addClass("defeated");
        $("#enemy-body").append(myChallenger);
        $("#challenger-body, #challenger-health, #attack-button").empty();
        $("#message-box").append("You defeated your opponent! Choose another challenger!");
        challenger = "";
        myChallenger = "";
    }

    function youWon() {
        $(".fight-notification").css("display", "none");
        $(".win").css("display", "inline-flex");
        $("#attack-nar").empty();
        $("#message-box").text("You have defeated all 3 enemies! You win!");
        makeRestartBtn();
    };

    $("#restart").on("click", function () {
        document.location.reload(true);
    });

    function makeRestartBtn() {
        $("#restart").append(restartBtn);
    }
});