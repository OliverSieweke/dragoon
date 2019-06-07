const form = document.getElementById("controller");
const refresh = document.getElementById("reset");
const translation1 = document.getElementById("translation1");
const translation2 = document.getElementById("translation2");
const translation1Settings = document.getElementById("translation1-settings");
const translation2Settings = document.getElementById("translation2-settings");


translation1.addEventListener("click", () => showTranslation(1));
translation2.addEventListener("click", () => showTranslation(2));

function showTranslation(number) {
    if (number === 1) {
        translation1.className = "active";
        translation2.className = "";
        translation1Settings.className = "visible";
        translation2Settings.className = "hidden";
    } else if (number === 2) {
        translation1.className = "";
        translation2.className = "active";
        translation1Settings.className = "hidden";
        translation2Settings.className = "visible";
    }
}


fetch("/default-options.json")
    .then(res => res.json())
    .then(json => {
        setValues(json);
        refresh.addEventListener("click", () => setValues(json));
    })
    .catch();


function setValues(options) {
    for (const [option, value] of Object.entries(options)) {
        const input = form[option];
        if (input) {
            if (input.type === "checkbox") {
                input.checked = value;
            } else {
                input.value = value;
            }
        }
    }
}
