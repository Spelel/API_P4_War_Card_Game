//------------------Side quest for callback function, how they work------------------------

// const people = [
//     {  name: "Jack", 
//         hasPet: true },
//     {  name: "Jill", 
//         hasPet: false },
//     {  name: "Alice", 
//         hasPet: true },
//     {  name: "Bob", 
//         hasPet: false },
// ]

// function filterArray(array, callback) {
// 	const resultingArray = []
// 	for (let i=0; i < array.length; i++) {
// 		if (callback(array[i]) === true) {
// 			resultingArray.push(array[i])
// 		}
// 	}
// 	return resultingArray
// }

// const peopleWithPets = filterArray(people, owner => owner.hasPet)

// console.log(peopleWithPets)

//----------------------------------------------------------------------------------------
const btnDraw = document.getElementById("btn_draw")
let scorePC = 0
let scorePl = 0

btn.addEventListener("click", () => {
    if (cardData.remaining === 0) {
        btnDraw.disabled = false
        btnDraw.style.cursor = "default"
        render()
    } else {
        render()
    }
})

let cardData = []

btnDraw.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cardData = data
            getImgToTheDom()
            score(data.cards[0].value, data.cards[1].value)
            // cardNrRender(data.remaining)
            if (data.remaining === 0) {
                btnDraw.style.cursor = "not-allowed"
                btnDraw.disabled = true
                cardNrRender(0)
            } else {
                cardNrRender(data.remaining)
            }
        })
})


function cardNrRender(count) {
    document.getElementById("remainingCards").innerHTML =`
    <p class="topText" >${count}</p>
    `
}


function score(card1, card2) {

    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1)
    const card2ValueIndex = valueOptions.indexOf(card2)
    
    if (card1ValueIndex === card2ValueIndex) {
        document.getElementById("winnerInfo").innerHTML =`
        <h2>WAR!</h2>
        `
    } else if (card1ValueIndex > card2ValueIndex) {
            document.getElementById("winnerInfo").innerHTML =`
            <h2>Computer Wins!</h2>
            `
    } else {
            document.getElementById("winnerInfo").innerHTML =`
            <h2>Player Wins!</h2>
            `
    }
}

function getImgToTheDom() {
    document.getElementById("cardOne").innerHTML = `
    <img src="${cardData.cards[0].image}">
    `
    document.getElementById("cardTwo").innerHTML = `
    <img src= "${cardData.cards[1].image}">
    `
}

let deckId

function render (){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(data => {
        deckId = data.deck_id
        console.log("Game start")
        document.getElementById("topText").innerHTML =`
        Remaining Cards:<div id="remainingCards"></div>
        `
        cardNrRender(data.remaining)
    })
}


