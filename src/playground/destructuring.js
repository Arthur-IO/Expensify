const player = {
    name: 'Arthur',
    age: 24,
    poundTownBaby: 'Audrey Joy',
    cockSize: {
        width: '500 inches',
        length: '1000 inches'
    }
}

// Example of normal destructuring w/ default value
const { name: firstName = 'Anonymous', age } = player

if (firstName && age) {
    console.log(`${firstName} is of age ${age}`)
}

// Example of destructuring with a rename
const { width: W, length: L } = player.cockSize

if (W && L) {
    console.log(`${firstName} has a cock size of ${W} in width and ${L} in length.`)
}

const book = {
    title: "Arthur's Cocksize",
    author: 'Arthur Behesnilian',
    publisher: {
        name: 'Arthur Behesnilian'
    }
}

const { name: publisherName = 'Self-published' } = book.publisher

console.log(`${book.title} was published by ${publisherName}`)