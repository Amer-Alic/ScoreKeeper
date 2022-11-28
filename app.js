// selecting all elements needed
const body = document.querySelector(`body`)
const resetBtn = document.querySelector(`#resetBtn`);
const select = document.querySelector(`#select`);
let selectValue = document.querySelector(`#select`).value * 1;
let differenceOfTwo = false;

// objects for player values
const playerOne = {
    btn: document.querySelector(`#playerOneBtn`),
    text: document.querySelector(`#one`),
    score: 0,
}

const playerTwo = {
    btn: document.querySelector(`#playerTwoBtn`),
    text: document.querySelector(`#two`),
    score: 0
}

// functions needed
const turn = function (player, opponent) {
    player.score++;
    player.text.innerText = `${player.score}`;
    if (player.score > opponent.score) {
        player.text.style.color = `green`;
        opponent.text.style.color = `red`;
    }
    if (player.score === opponent.score) {
        player.text.style.color = `black`;
        opponent.text.style.color = `black`;
    }
    if (playerOne.score === parseInt(selectValue)) {
        alert(`Player 1 WON`)
        player.btn.disabled = true;
        opponent.btn.disabled = true;
        body.removeEventListener(`keydown`, keyActivation);
    }
    if (playerTwo.score === parseInt(selectValue)) {
        alert(`Player 2 WON`)
        player.btn.disabled = true;
        opponent.btn.disabled = true;
        body.removeEventListener(`keydown`, keyActivation);
    }
    // on difference of 2 do this:
    if (player.score === opponent.score && player.score === parseInt(select.value) - 1) {
        alert(`Difference of two starting`);
        reset(playerOne, playerTwo);
        select.disabled = true;
        selectValue = 2;
        differenceOfTwo = true;
    }
    if (differenceOfTwo === true) {
        if (player.score === 1 && opponent.score === 1) {
            player.score = 0;
            opponent.score = 0;
            player.text.style.color = `black`;
            opponent.text.style.color = `black`;
            player.text.innerText = `0`;
            opponent.text.innerText = `0`;
        }
        else if (playerOne.score === 2 && playerOne.score - 2 === playerTwo.score) {
            differenceOfTwo = false;
        }
        else if (playerTwo.score === 2 && playerTwo.score - 2 === playerOne.score) {
            differenceOfTwo = false;
        }
    }
}
const reset = function (player, opponent) {
    player.score = 0;
    opponent.score = 0;
    player.text.style.color = `black`;
    opponent.text.style.color = `black`;
    player.text.innerText = `0`;
    opponent.text.innerText = `0`;
    player.btn.disabled = false;
    opponent.btn.disabled = false;
    selectValue = document.querySelector(`#select`).value * 1
    select.disabled = false;
    body.addEventListener(`keydown`, keyActivation)
}
// making keyboard function because we will need to remove it also
const keyActivation = function (e) {
    switch (e.code) {
        case `KeyQ`:
            turn(playerOne, playerTwo);
            break;
        case `KeyE`:
            turn(playerTwo, playerOne);
            break;
        case `KeyS`:
            reset(playerOne, playerTwo);

    }
}
const resetKey = function (e) {
    e.code === `KeyS` && reset(playerOne, playerTwo)
}
// eventListeners
playerOne.btn.addEventListener(`click`, function () {
    turn(playerOne, playerTwo)
})

playerTwo.btn.addEventListener(`click`, function () {
    turn(playerTwo, playerOne)
})

resetBtn.addEventListener(`click`, function () {
    reset(playerOne, playerTwo)
})

select.addEventListener(`change`, function () {
    reset(playerOne, playerTwo)
})
// keyfunctions
body.addEventListener(`keydown`, keyActivation)
body.addEventListener(`keydown`, resetKey)