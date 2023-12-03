let patterns = {
    "full-name": /^\p{L}{6} \p{L}\.\p{L}\.$/,
    "group": /^\p{L}{2}-\d{6}$/,
    "phone-number": /^\(d{3}\)-\d{3]-\d{2}-\d{2}$/,
    "address": /^\(d{6}$/,
    "email": /^\w{1,15}@\w{1,15}\.com$/,
}

let form = document.getElementById("form-example");
form.addEventListener("submit", OnSubmitForm)

function OnSubmitForm(event) {

}