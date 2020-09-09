/*eslint-env browser*/
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    sunkShips: 0,

    ships: [

        {
            location: [0, 0, 0],
            hits: ["", "", ""]
        },

        {
            location: [0, 0, 0],
            hits: ["", "", ""]
        },

        {
            location: [0, 0, 0],
            hits: ["", "", ""]
        }

    ],

    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.location.indexOf(guess);
            if (index > -1) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("You hit me!");
                if (this.isSunk(ship)) {
                    this.sunkShips++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;

    },

    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLoction: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].location = locations;
        }
    },


    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var fst, sec;
        if (direction === 0) { //水平
            fst = Math.floor(Math.random() * this.boardSize);
            sec = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else { //垂直
            fst = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            sec = Math.floor(Math.random() * this.boardSize);
        }
        var newShipsArray = [];
        for (var i = 0; i < this.numShips; i++) {
            if (direction === 0) {
                newShipsArray.push(fst + "" + (sec + i));
            } else {
                newShipsArray.push((fst + i) + "" + sec);
            }

        }
        return newShipsArray;
    },


    collision: function (loc) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < loc.length; j++) {
                if (ship.location.indexOf(loc[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }


};

var view = {
    displayMessage: function (msg) {
        var got = document.getElementById("messageArea");
        got.innerHTML = msg;
    },

    displayHit: function (loc) {
        var hit = document.getElementById(loc);
        hit.setAttribute("class", "hit");
    },

    displayMiss: function (loc) {
        var miss = document.getElementById(loc);
        miss.setAttribute("class", "miss");
    }
};

function compare(guess) {

    var example = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("pls enter a correct location!");
    } else {

        var firstChar = guess.charAt(0);
        var first = example.indexOf(firstChar);
        var sec = guess.charAt(1);

        if (isNaN(first) || isNaN(sec)) {
            alert("there is not on the board!");
        } else if (first < 0 || first >= model.boardSize ||
            sec < 0 || sec >= model.boardSize) {
            alert("its over the board!");
        } else {
            return first + sec;
        }
    }
    return null;
}

var controller = {

    guesses: 0,

    processGuess: function (guess) {
        var loc = compare(guess);
        if (loc) {
            this.guesses++;
            var hit = model.fire(loc);
            if (hit && model.sunkShips === model.numShips) {
                view.displayMessage("You sank all my ship in " + this.guesses + " guesses!");
            }
        }
    }
};


function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
}

window.onload = init;

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLoction();

}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
