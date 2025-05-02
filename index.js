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
btn.addEventListener("click", render)
btn_draw.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => console.log(data))

})

let deckId

function render (){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(deckId)

        btn_draw.style.display = "inline"
    })
}


