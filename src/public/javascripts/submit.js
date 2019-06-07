const controller = document.getElementById("controller");

controller.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault(); // Preventing redirect

    const formData = new FormData(controller);
    let filename;

    fetch("/subtitles", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            const contentDisposition = response.headers.get("content-disposition");
            [filename] = contentDisposition.match(/(?<=filename=").*(?=")/u);
            return response.blob();
        })
        .then(blob => triggerDownload(blob, filename));
}


function triggerDownload(blob, filename) {
    // Create Invisible Download Link
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // Trigger Download
    document.body.appendChild(link);
    link.click();

    // Clean-up
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}
