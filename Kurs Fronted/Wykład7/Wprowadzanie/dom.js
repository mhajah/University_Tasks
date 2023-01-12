/*
document ----
            - HTML --
                    - HEAD
                    - BODY --
                            - header-
                                    -text "..."
                            - a
                                    -attribute "href"
                                    -text "..."
*/

console.log(document.getElementById("box"));
//wybiera element po ID

console.log(document.getElementsByTagName("p"));
//Wybiera elementy po tagu - np. wszystkie paragrafy, nagłowki...

console.log(document.getElementsByClassName("box"));
//Wybiera elementy po klasie

console.log(document.querySelector("#box > p:nth-child(2n)"));
//Znajduje pierwszy dopasowany element

console.log(document.querySelectorAll("#box"));
//Znajduje wszystkie pasujące elementy

document.getElementById("header").classList.add("color", "red");
document.getElementById("header").classList.remove("color", "red");
//Dodaje lub usuwa właściwość do klasy

document.getElementById("header").innerText = "abc";
//Modyfikuje tekst

document.getElementById("header").innerHTML = "<button>Abc</button>";
//Dodaje fragment html do elementu o ID header *POTĘŻNE*

const text = "aaaaaaa";
document.getElementById("header").innerHTML = `<button>${text}</button>`
//ZMIENIA zawartość html elementu. Np. w tym przypadku wyrzuci aktualną zawartość headera i wstawi button.

const getP = () => {
    const p = document.createElement("p");
    p.innerHTML = "hello";
    return p;
}
//Funkcja generująca element p

const p = document.createElement("p");
p.innerText = "Hello!";
document.querySelector("#box").append(p);
//Stworzyliśmy nowy element i wstawiliśmy do na końcu elementu #box
document.querySelector("#box").prepend(p);
//prepend dodaje na początku, a append na końcu

//.before() .after()
document.querySelector("#box").remove();
document.querySelector("#box").replaceWith(p);

console.log(document.querySelector("#box").parentElement)
//Wypluwa rodzica elementu
console.log(document.querySelector("#box").nextElementSibling)
console.log(document.querySelector("#box").previousElementSibling)
console.log(document.querySelector("#box").children)

console.log(document.querySelector("#box").nextSibling) //node
console.log(document.querySelector("#box").previousSibling) //node
console.log(document.querySelector("#box").childNodes) //node
console.log(document.querySelector("#box").parentNode) //node

