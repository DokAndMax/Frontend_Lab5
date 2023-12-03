let patterns = {
    "full-name": /^\p{L}{6} \p{L}\.\p{L}\.$/u,
    "group": /^\p{L}{2}-\d{2}$/u,
    "phone-number": /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    "address": /^м\. \d{6}$/,
    "email": /^\w{1,15}@\w{1,15}\.com$/,
}

let form = document.getElementById("form-example");
for(let input of form.elements)
{
    input.addEventListener("input", OnInputValidation)
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
for(let [key, value] of urlParams)
{
    const element = document.getElementById(`${key}-output`)

    if(element) {
        element.textContent = value;
    }
}

if(urlParams.size >= 5) {
    document.getElementById("result-block").removeAttribute("hidden");
}

let test = "";

function OnInputValidation(event) {
    const input = event.target;
    const result = patterns[input.name].test(input.value);
    if (!result) {
        input.setCustomValidity("Поле заповнено неправильно");
    } else {
        input.setCustomValidity("");
    }
}
function OnSubmitForm(event) {
    const form = event.target;
    for(let input of form.elements)
    {
        console.log(input.name);
        if(!input.name) {
            continue;
        }
        let result = patterns[input.name].test(input.value);
        console.log(result);
        if(!result)
        {
            input.setCustomValidity('Поле заповнено неправильно');
        }
    }
    return false;
}