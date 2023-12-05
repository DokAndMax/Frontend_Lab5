"use strict";

const patterns = {
    "full-name": /^\p{L}{6} \p{L}\.\p{L}\.$/u,
    "group": /^\p{L}{2}-\d{2}$/u,
    "phone-number": /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    "address": /^м\. \d{6}$/,
    "email": /^\w{1,15}@\w{1,15}\.com$/,
};

const form = document.getElementById("form-example");
for(const input of form.elements) {
    input.addEventListener("input", onInputValidation)
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
for(const [key, value] of urlParams) {
    const element = document.getElementById(`${key}-output`)

    if(element) {
        element.textContent = value;
    }
}

if(urlParams.size >= 5) {
    document.getElementById("result-block").removeAttribute("hidden");
}

const table = generateTable();

table.addEventListener("mouseover", onMouseOverTable);
table.addEventListener("click", onClickTable);
table.addEventListener("dblclick", onDblClickTable);

function onInputValidation(event) {
    const result = patterns[this.name].test(this.value);
    if (!result) {
        this.setCustomValidity("Поле заповнено неправильно");
    } else {
        this.setCustomValidity("");
    }
}

function generateTable() {
    const ROWS_NUMBER = 6;
    const COLUMNS_NUMBER = 6

    const tbl = document.getElementById("main-table");

    const tblBody = document.createElement("tbody");

    for (let i = 0; i < ROWS_NUMBER; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < COLUMNS_NUMBER; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${(i * COLUMNS_NUMBER) + j + 1}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    return tbl;
}

function onMouseOverTable(event) {
    const cell = event.target;
    if(!(cell instanceof HTMLTableCellElement)) {
        return;
    }

    if(cell.textContent !== "10") {
        return;
    }

    cell.style.color = getRandomColor();
    cell.style.backgroundColor = getRandomColor();
}

function onClickTable(event) {
    const cell = event.target;
    if(!(cell instanceof HTMLTableCellElement))
        return;

    const colorPicker = document.getElementById("cell-color-picker");
    const newColor = colorPicker.value;

    cell.style.backgroundColor = newColor;
}
function onDblClickTable(event) {
    const cell = event.target;
    if(!(cell instanceof HTMLTableCellElement))
        return;

    const colorPicker = document.getElementById("cell-color-picker");
    const newColor = colorPicker.value;
    [...cell.parentElement.cells]
        .slice(cell.cellIndex)
        .filter((c, i) =>  i % 2 === 0 )
        .forEach(c => c.style.backgroundColor = newColor);
}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}