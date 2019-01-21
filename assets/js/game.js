// Game Object
var rpg = {
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

    var newEle = function(param) {
        for (var i =0; i < param.length; i++) {
            var ele = $("<div>");
            ele.addClass("card float-left hero");
            ele.attr("charName", param[i]);
            $("#Characters").append(ele);
        }
    }

    var moveEle = function(param,newClass,oldClass) {
        param.forEach((element,i) => {
            $('#' + newClass).append( $('#' + param[i]) );
            $('#' + param[i]).addClass(newClass);
            $('#' + param[i]).removeClass(oldClass);
        });
    }

    // Pick Hero
    $(".character").on("click", function() {

        // Add hero
        var char = ($(this).attr("charName"));
        console.log(char);
        rpg.heroes = rpg.characters.splice(rpg.characters.indexOf(char),1);
        console.log(rpg.heroes);
        console.log(rpg.characters);
        moveEle(rpg.heroes,'heroes','character');

        // Add enemies
        rpg.characters.forEach((element) => {
            rpg.enemies.push(element);
        });
        rpg.characters.splice(rpg.characters,3);
        console.log(rpg.enemies);
        console.log(rpg.characters);
        moveEle(rpg.enemies,'enemies','character');

    });

    // Pick Defender
    $(".enemies").on("click", function() {

        // Add defender
        var char2 = ($(this).attr("charName"));
        console.log(char2);
        rpg.defenders = rpg.enemies.splice(rpg.enemies.indexOf(char2),1);
        console.log(rpg.defenders);
        console.log(rpg.enemies);
        moveEle(rpg.defenders,'defenders','enemies');

    });



    // Attack
    $('#attackBtn').on("click", function() {
        //
    });

});