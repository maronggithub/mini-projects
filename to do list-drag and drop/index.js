const tasks = document.querySelectorAll(".task");
const lists = document.querySelectorAll(".list");

let current = "";

for (const task of tasks) {
    task.addEventListener("dragstart",dragStart);
    task.addEventListener("dragend",dragEnd);
}

for (const list of lists) {
    list.addEventListener("dragover",dragOver);
    list.addEventListener("dragenter",dragEnter);
    list.addEventListener("dragleave",dragLeave);
    list.addEventListener("drop",dragDrop);
}

function dragStart(e) {
    this.style.borderColor = '#ec766c'
    const icon = this.querySelector('.icon');
    icon.style.color = '#ec766c';
    current = this;
}
function dragEnd(e) {
    const taskBox = this.closest('.task-box');
    const h2 = taskBox.querySelector('h2');
    const h2Color = window.getComputedStyle(h2).color;
    this.style.borderColor = h2Color;
    const icon = this.querySelector('.icon');
    icon.style.color =  h2Color;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    this.classList.add("enter");
}
function dragLeave(e) {
    this.classList.remove("enter");
}
function dragDrop(e) {
    this.classList.remove("enter");
    this.append(current);
    if(this.parentElement.id === "to-do") {
        current.querySelector(".icon").innerHTML = `<i class="fa-regular fa-circle"></i>`;
    } else if (this.parentElement.id === "process") {
        current.querySelector(".icon").innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>`;
    } else {
        current.querySelector(".icon").innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    }
}
