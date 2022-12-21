const libraryStore = [];

//ZADANIE 1
String.prototype.capitalize = function() {
  return this.length === 0 ? '' : this[0].toUpperCase() + this.slice(1)
}
console.log("alice".capitalize());
console.log(''.capitalize());

function capitalize(string) {
    return string.length === 0 ? '' : string[0].toUpperCase() + string.slice(1)
}
console.log(capitalize('alice')) // 'Alice'
console.log(capitalize('')) // ''
console.log("===============ZADANIE2=============")

//ZADANIE 2
function capitalizeSentence(sentence) {
    if (sentence.length === 0) return '';
    if (sentence.indexOf(' ') === -1) return capitalize(sentence);

    let arr = sentence.split(' ');
    let newSentence = "";
    arr.forEach(element => {
        newSentence += capitalize(element) + ' ';
    });

    return newSentence;
}
console.log(capitalizeSentence('alice')) // 'Alice'
console.log(capitalizeSentence('alice in Wonderland')) // 'Alice In Wonderland'
console.log("===============ZADANIE3=============")

class Media {
    
    #title;
    #ratings;
    #available;
    constructor(props) {
        if (props.title === undefined || (typeof props.title) !== "string") {
            throw Error("Przy tworzeniu nowego Media wymagane jest podanie odpowiedniego tytulu.");
        }
        this.#title = capitalizeSentence(props.title);
        this.#ratings = [];
        this.#available = true;
    }

    get title() {
        return this.#title;
    }
    get ratings() {
        return this.#ratings;
    }
    get available() {
        return this.#available;
    }

    addRating = function(rate) {
        if ((typeof rate) !== "number" || rate <= 0 || rate > 10) {
            throw Error("Rating to pojedyncza cyfra calkowita z zakresu 1-10");
        }
        this.#ratings.push(rate);
    }

    orderMedia() {
        return new Promise((resolve, reject) => {
            if (this.available) {
                setTimeout(() => {
                    this.#available = false;
                    resolve();
                }, 1000)
                return;
            }

            reject("Not available")
        })
    }

    returnMedia() {
        return new Promise((resolve, reject) => {
        if (!this.available) {
            setTimeout(() => {
                this.#available = true;
                resolve();
            }, 1000)
            return;
        }

        reject("Already returned")
        })
    }
}

const media = new Media({title: 'alice in wonderland'})
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // []
console.log(media.available) // true

media.addRating(9)
media.addRating(8.5)
console.log(media.ratings) // [9, 8.5]

media.title = "not alice"
media.ratings = [1, 1]
media.available = false
console.log(media.title) // 'Alice In Wonderland'
console.log(media.ratings) // [9, 8.5]
console.log(media.available) // true
console.log("===============ZADANIE4=============")
async function test() {
    await media.orderMedia()
    console.log(media.available) // false

    await media.returnMedia()
    console.log(media.available) // true
}
// test();



class Book extends Media {
    #author;
    #pages;
    constructor(props) {
        if (props.pages === undefined || (typeof props.pages) !== "number" || props.pages <= 0 || props.author === undefined || (typeof props.author) !== "string") {
            throw Error("Przy tworzeniu Book nalezy podac odpowiednia liczbe stron oraz autora.");
        }
        super(props);
        this.#author = capitalizeSentence(props.author);
        this.#pages = props.pages;
    }

    get author() {
        return this.#author;
    }
    get pages() {
        return this.#pages;
    }

    orderBook() {
        return super.orderMedia();
    }

    returnBook() {
        return super.returnMedia();
    }
}


console.log("===============ZADANIE5=============");
const book = new Book({
    title: "alice's adventures in wonderland",
    author: 'lewis carroll',
    pages: 136
  })
  
  console.log(book.title) // "Alice's Adventures In Wonderland"
  console.log(book.ratings) // []
  console.log(book.available) // true
  console.log(book.author) // 'Lewis Carroll'
  console.log(book.pages) // 136
  
  book.addRating(9)
  book.addRating(8.5)
  console.log(book.ratings) // [9, 8.5]
  
  book.title = "not alice"
  book.ratings = [1, 1]
  book.available = false
  book.author = "Charles Dickens"
  book.pages = 500
  console.log(book.title) // "Alice's Adventures In Wonderland"
  console.log(book.ratings) // [9, 8.5]
  console.log(book.available) // true
  console.log(book.author) // 'Lewis Carroll'
  console.log(book.pages) // 136
  
async function test2() {
  await book.orderBook()
  console.log(book.available) // false
  
  await book.returnBook()
  console.log(book.available) // true
}
// test2();

class Movie extends Media {
    #director;
    #length;
    constructor(props) {
        if ((typeof props.director) !== "string" || props.length <= 0 || (typeof props.length) !== "number" ) {
            throw Error("Przy tworzeniu nowego Movie wymagane jest podanie odpowiedniej dlugosci oraz rezysera.");
        }
        super(props);
        this.#director = capitalizeSentence(props.director);
        this.#length = props.length;
    }

    get director() {
        return this.#director;
    }
    get length() {
        return this.#length;
    }

    orderMovie() {
        return super.orderMedia();
    }

    returnMovie() {
        return super.returnMedia();
    }
}

const movie = new Movie({
    title: "alice in wonderland",
    director: 'tim burton',
    length: 108
  })

  console.log("===============ZADANIE6=============")
  console.log(movie.title) // 'Alice In Wonderland'
  console.log(movie.ratings) // []
  console.log(movie.available) // true
  console.log(movie.director) // 'Tim Burton'
  console.log(movie.length) // 108
  
  movie.addRating(9)
  movie.addRating(8.5)
  console.log(movie.ratings) // [9, 8.5]
  
  movie.title = "not alice"
  movie.ratings = [1, 1]
  movie.available = false
  movie.director = "Tommy Wiseau"
  movie.length = 500
  console.log(movie.title) // 'Alice In Wonderland'
  console.log(movie.ratings) // [9, 8.5]
  console.log(movie.available) // true
  console.log(movie.director) // 'Tim Burton'
  console.log(movie.length) // 108
  
async function test3() {
    await movie.orderMovie()
    console.log(movie.available) // false
    
    await movie.returnMovie()
    console.log(movie.available) // true
}
//test3();


console.log("==================ZADANIE8===========");
const addToLibrary = (props) => {
    let media;
    switch(props.type) {
        case "book": 
            media = new Book(props)
            libraryStore.push(media)
            return media;
        case "movie": 
            media = new Movie(props)
            libraryStore.push(media)
            return media;
        default:
            try {
                media = new Media(props);
                libraryStore.push(media)
                return media;
            }
            catch(e) {
                console.log(e);
                return undefined;
            }
    }
}

const book2 = addToLibrary({
    type: 'book',
    title: "alice's adventures in wonderland",
    author: 'lewis carroll',
    pages: 136
  })
  const movie2 = addToLibrary({
    type: 'movie',
    title: "alice in wonderland",
    director: 'tim burton',
    length: 108
  })
  const media2 = addToLibrary({
    title: 'Media'
  })
  
  console.log(libraryStore) 
  /*
  [ Book { _title: 'Alice\'s Adventures In Wonderland',
      _ratings: [],
      _available: true,
      _author: 'Lewis Carroll',
      _pages: 136 
    },
    Movie { _title: 'Alice In Wonderland',
      _ratings: [],
      _available: true,
      _director: 'Tim Burton',
      _length: 108 
    },
    Media { _title: 'Media', _ratings: [], _available: true }
  ]
  */

console.log("==================ZADANIE9===========");
function bulkAddToLibrary(array) {
    array.forEach(element => {
        addToLibrary(element);
    });
    return array;
}

const [book3, movie3, media3] = bulkAddToLibrary([
    {
      type: 'book',
      title: "alice's adventures in wonderland",
      author: 'lewis carroll',
      pages: 136
    }, 
    {
      type: 'movie',
      title: "alice in wonderland",
      director: 'tim burton',
      length: 108
    }, 
    {
      title: 'Media'
    }
  ])
  
  console.log(libraryStore) 
  /*
  [ Book { _title: 'Alice\'s Adventures In Wonderland',
      _ratings: [],
      _available: true,
      _author: 'Lewis Carroll',
      _pages: 136 
    },
    Movie { _title: 'Alice In Wonderland',
      _ratings: [],
      _available: true,
      _director: 'Tim Burton',
      _length: 108 
    },
    Media { _title: 'Media', _ratings: [], _available: true }
  ]
  */


function order(title) {
  libraryStore.forEach(element => {
    if (element.title === title) {
        element[i].orderMedia().then(
          console.log("Order completed!")
        ).catch((e) => {
          console.log("Sorry! " + e)
        })
      } 
  });
}