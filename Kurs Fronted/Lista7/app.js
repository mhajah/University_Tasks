const form = document.getElementById("addTaskForm");
const input = document.getElementById("newTask");
const list = document.getElementById("list");

const tab = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const element = document.createElement("li");
    const removeButton = document.createElement("button");
    const doneButton = document.createElement("button");
    const listWrapper = document.createElement("div");
    const buttonsWrapper = document.createElement("span");
    removeButton.innerText = "Remove";
    doneButton.innerText = "Done";
    element.innerText = input.value;
    buttonsWrapper.append(removeButton);
    buttonsWrapper.append(doneButton);
    listWrapper.append(element);
    listWrapper.append(buttonsWrapper);
    list.append(listWrapper);
    removeButton.classList.add("taskButton");
    doneButton.classList.add("taskButton");
    listWrapper.classList.add("elemList");
    removeButton.addEventListener("click", () => {
        list.removeChild(listWrapper);
    });
    doneButton.addEventListener("click", () => {
        element.classList.toggle("taskDone");
    })
    input.value = "";
  })