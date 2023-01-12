
function changeColor () {
    document.getElementById("header").style.color = "red";
}

const button2 = document.getElementById("button2");
button2.onclick = changeColor;

const button3 = document.getElementById("button3");
button3.addEventListener("click", function(e) {
    header.innerText = "test";
});

document.getElementById("button4").addEventListener("click", function(e) {
    //e.stopPropagation();
    alert("header");
});

document.querySelector("body").addEventListener("click", function(e) {

    alert("body");
});

//capture(?)

//target
const table = document.getElementById("table");
table.addEventListener("click", function(e) {
    const target = e.target;
    target.classList.add("red");
});