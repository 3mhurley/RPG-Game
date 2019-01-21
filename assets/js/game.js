// Game Object
var rpg = {
    game: false,
    wins: 0,
    heroName: 'n/a',
    heroHp: 0,
    heroAp: 0,
    heroes: [],
    defName: 'n/a',
    defHp: 0,
    defCap: 0,
    defenders: [],
    enemies: [],
    characters: ['Luke', 'Han', 'Vader', 'Sidious'],
    // charObj: {
    //     luke: {
    //         name: 'Luke Skywalker',
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    //     obi: {
    //         name: "Obi-Wan Kenobi",
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    //     han: {
    //         name: 'Han Solo',
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    //     vader: {
    //         name: 'Darth Vader',
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    //     sidious: {
    //         name: 'Darth Sidious',
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    //     tarkin: {
    //         name: 'Grand Moff Tarkin',
    //         hp: 0,
    //         ap: 0,
    //         cap: 0,
    //     },
    // },
    // heroSelect: function(param) {
    //     this.heroName = param.name;
    //     this.heroHp = param.hp;
    //     this.heroAp = param.ap;
    //     this.heroes = [param.name];
    // },
    // defSelect: function(param) {
    //     this.defName = param.name;
    //     this.defHp = param.hp;
    //     this.defCap = param.cap;
    // },
    // apScale: function(param) {
    //     return param.ap + this.heroAp;
    // },
}

$(document).ready(function() {

    var moveEle = function(param,newClass,oldClass) {
        param.forEach((element,i) => {
            $('#' + newClass).append( $('#' + param[i]) );
            // $('#' + param[i]).addClass(newClass);
            // $('#' + param[i]).removeClass(oldClass);
        });
    }

    var selectHero = function(param) {
        // Add hero
        rpg.heroes = rpg.characters.splice(rpg.characters.indexOf(param),1);

        moveEle(rpg.heroes,'heroes','character');

        rpg.heroName = $('#' + param).attr('charName');
        rpg.heroHp = parseInt($('#' + param).attr('hp'));
        rpg.heroAp = parseInt($('#' + param).attr('ap'));

        // Add enemies
        rpg.characters.forEach((element) => {
            rpg.enemies.push(element);
        });

        rpg.characters.splice(rpg.characters,3);

        moveEle(rpg.enemies,'enemies','character');
    }

    var selectDefender = function(param) {
        // Add defender
        rpg.defenders = rpg.enemies.splice(rpg.enemies.indexOf(param),1);

        moveEle(rpg.defenders,'defenders','enemies');

        rpg.defName = $('#' + param).attr('charName');
        rpg.defHp = parseInt($('#' + param).attr('hp'));
        rpg.defCap = parseInt($('#' + param).attr('ap'));

        $('#attackBtn').toggle();
        $('#characters').toggle();
    }

    var attack = function() {
        if ((rpg.defenders.length != 0) && (rpg.defHp > 0)) {
            // Math it up
            rpg.defHp -= rpg.heroAp;
            rpg.heroHp -= rpg.defCap;
            rpg.heroAp += rpg.heroAp;

            // Display stats
            $('#' + rpg.heroName).find('p').text(rpg.heroName + ' - ' + rpg.heroHp);
            $('#' + rpg.defName).find('p').text(rpg.defName + ' - ' + rpg.defHp);
            $('#health').text('Health: ' + rpg.heroHp);
            $('#attackPower').text('Attack Power: ' + rpg.heroAp);

        } else {
            alert('Pick a defender');
        }
    }

    var reset = function() {
        // Move characters back
        rpg.characters = ['Luke', 'Han', 'Vader', 'Sidious'];
        moveEle(rpg.characters,'characters','');
        rpg.characters.forEach((element,i) => {
            $('#' + rpg.characters[i]).toggle();
            $('#' + rpg.characters[i]).find('p').text(rpg.characters[i] + ' - 100 HP');
        });

        // Reset obj
        rpg.game = false;
        rpg.heroName = 'n/a';
        rpg.heroHp = 0;
        rpg.heroAp = 0;
        rpg.heroes = [];
        rpg.defName = 'n/a';
        rpg.defHp = 0;
        rpg.defCap = 0;
        rpg.defenders = [];
        rpg.enemies = [];

        $('#wins').text('Wins: ' + rpg.wins);
        $('#health').text('Health: 0');
        $('#attackPower').text('Attack Power: 0');


        // Hide buttons
        $('#characters').toggle();
        $('#resetBtn').toggle();
        if ($('#attackBtn').find('display:') === 'display: inline-block;') {
            $('#attackBtn').toggle();
        }
    }

    // Pick Hero
    $("#characters").children().on("click", function() {
        var char = ($(this).attr("charName"));

        if (rpg.heroes.length === 0) {
            selectHero(char);
        } else if (rpg.defenders.length === 0) {
            selectDefender(char);
        }
    });

    // Attack
    $('#attackBtn').on("click", function() {
        if (rpg.defHp <= 0) {
            rpg.defenders.splice(rpg.defenders,1);
            $('#' + rpg.defName).toggle();
            $('#attackBtn').toggle();
        }
        if (rpg.heroHp <= 0) {
            $('#' + rpg.heroName).toggle();
            rpg.enemies.forEach((element,i) => {
                $('#' + rpg.enemies[i]).toggle();
            });
            rpg.defenders.forEach((element,i) => {
                $('#' + rpg.defenders[i]).toggle();
            });
            $('#resetBtn').toggle();
        } else if (rpg.defenders.length === 0 && rpg.enemies.length === 0) {
            rpg.wins++
            $('#wins').text('Wins: ' + rpg.wins);
            $('#' + rpg.heroName).toggle();
            rpg.enemies.forEach((element,i) => {
                $('#' + rpg.enemies[i]).toggle();
            });
            rpg.defenders.forEach((element,i) => {
                $('#' + rpg.defenders[i]).toggle();
            });
            $('#resetBtn').toggle();
        }
        attack();
    });

    // Reset
    $('#resetBtn').on("click", function() {
        reset();
    });

});