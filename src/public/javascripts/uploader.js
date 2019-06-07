const MAX_FILE_NAME_LENGTH = 20;
const SHORTENED_FILE_NAME_LENGTH = 15;

const upload = document.getElementById("upload-test");
const fileInput = document.getElementById("file-input-test");
const uploadError = document.getElementById("upload-error");
const uploadErrorMessage = document.getElementById("upload-error-message");
const hideUploadError = document.getElementById("hide-upload-error");
const submit = document.getElementById("submit-test");

fileInput.addEventListener("change", (e) => {
    hideError();
    // noinspection JSUnresolvedVariable
    showFile(e.target.files[0]);
});

const DRAG_EVENTS = ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"];
const ACTIVE_DRAG_EVENTS = ["dragenter", "dragover"];
const INACTIVE_DRAG_EVENTS = ["dragleave", "dragend", "drop"];

for (const dragEvent of DRAG_EVENTS) {
    upload.addEventListener(dragEvent, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}
for (const activeDragEvent of ACTIVE_DRAG_EVENTS) {
    upload.addEventListener(activeDragEvent, () => {
        upload.className = "active";
    });
}
for (const inactiveDragEvent of INACTIVE_DRAG_EVENTS) {
    upload.addEventListener(inactiveDragEvent, () => {
        upload.className = "";
    });
}

upload.addEventListener("drop", (e) => {
    hideError();
    const dataTransfer = new DataTransfer();


    for (const file of e.dataTransfer.files) { // We only want to keep the first valid file
        if (file.name.match(/\.txt$/u)) {
            dataTransfer.items.add(file);
            break;
        }
    }

    if (e.dataTransfer.files.length > 1) {
        showError("You may only upload one single file!");
    } else if (dataTransfer.files.length === 0) {
        showError("You may only upload .txt files!");
    }

    fileInput.files = dataTransfer.file;

    showFile(dataTransfer.files[0]);

    //TODO: handle no file!!!
});


function showFile(file) {
    const fileDisplay = document.getElementById("file-display-test");

    // Display File:
    fileDisplay.textContent = file.name.length < MAX_FILE_NAME_LENGTH ? file.name :
                              `${file.name.slice(0, SHORTENED_FILE_NAME_LENGTH)}\u2026.txt`;
    fileDisplay.className = "selected";

    // Enable Button:
    submit.disabled = false;
}

hideUploadError.addEventListener("click", hideError);

function showError(errorMessage) {
    /* eslint-disable-next-line no-void */
    void uploadError.offsetHeight; // Accessing offsetHeight forces a redraw and restarts the transition in case an error was already being displayed.
    uploadErrorMessage.textContent = errorMessage;
    uploadError.className = "visible";
}

function hideError() {
    uploadError.className = "hidden";
}
