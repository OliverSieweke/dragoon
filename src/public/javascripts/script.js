
// TODO make front-end eslint config file.

1&1;
console.log("asdfsdaf");

// TODO: asdfasdf

// document.getElementById('submit').addEventListener("click", submitForm);

document.getElementById("form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    console.log("submit!");
    const formData = new FormData();
    const file = document.getElementById("file").files[0];
    formData.append("file", file);

    debugger;
    fetch("/subtitles", {
        method: "POST",
        body: formData, // This is your file object
        redirect: "manual",
    }).then(response =>

          // file name available in response.headers.get("content-disposition"), need regex to get value inside
        response.blob())
      .then(response => {
          console.log(response);


          const a = document.createElement("a");
          a.href = window.URL.createObjectURL(response);
          // Give filename you wish to download
          a.download = "test-file.pptx";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();

          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);

      })
.catch(err => {
    console.log(err);
});

    // return false; // prevent automatic form submition

    // const formData = new FormData();
    // const file = document.getElementById("file").files[0];
    // const xhr = new XMLHttpRequest();
    //
    // formData.append("file", file);
    // xhr.open("POST", "subtitles");
    // xhr.onload = function(data) {
    //     // alert(`Yeah! On Load ${data}`);
    //     console.log("asdfasdf")
    //     console.log(data);
    //     console.log(data);
    // };
    // xhr.send(formData);
}


const droppedFiles = false;


//
// document.getElementById('upload-form').addEventListener("drag", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
// document.getElementById('upload-form').addEventListener("dragstart", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
// document.getElementById('upload-form').addEventListener("dragend", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
// document.getElementById('upload-form').addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
// document.getElementById('upload-form').addEventListener("dragenter", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
//
// document.getElementById('upload-form').addEventListener("dragleave", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
//
// document.getElementById('upload-form').addEventListener("drop", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });
//
//
// document.getElementById('upload-form').addEventListener("dragover", () => {
//     console.log("Yeah!");
//     document.getElementById('upload-form').className = 'is-dragover';
//
// });
//
// document.getElementById("upload-form").addEventListener("drop", (e) => {
//     console.log("Yeah!");
//     e.preventDefault();
//     e.stopPropagation();
//     const droppedFiles = e.originalEvent.dataTransfer.files;
//
// });
//
// document.getElementById("upload-form").addEventListener("submit", (e) => {
// debugger;
//
// });


const upload = document.getElementById("upload");

const DRAG_EVENTS = ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"];
const ACTIVE_DRAG_EVENTS = ["dragenter", "dragover"];
const INACTIVE_DRAG_EVENTS = ["dragleave", "dragend", "drop"];

for (const dragEvent of DRAG_EVENTS) {
    upload.addEventListener(dragEvent, e => {
        e.preventDefault();
        e.stopPropagation();
    });
}

for (const activeDragEvent of ACTIVE_DRAG_EVENTS) {
    upload.addEventListener(activeDragEvent, () => {
        upload.className = "active";
    });
}


for (const inactivDragEvent of INACTIVE_DRAG_EVENTS) {
    upload.addEventListener(inactivDragEvent, () => {
        upload.className = "";
    });
}

upload.addEventListener("drop", e => {
    const file = document.getElementById("file");
    const dataTransfer = new DataTransfer();

    for (const fille of e.dataTransfer.files) { // only want to keep the first valid file
        if (fille.name.match(/\.txt$/u)) {
            dataTransfer.items.add(fille);
            break;
        }
    } // Display warnings if more than one file or none of correct format

    file.files = dataTransfer.files;


    // TODO: check correct file format and only one file, else remove and show little pop up
    // file.value = "";
    showFiles(dataTransfer.files);
});


function showFiles(files) {
    const fileDisplayList = document.getElementById("file-display-list");

    while (fileDisplayList.firstChild) {
        fileDisplayList.removeChild(fileDisplayList.firstChild);
    }

    for (const file of files) {
        const fileItem = document.createElement("li");
        fileItem.textContent = file.name.length < 20 ? file.name : `${file.name.slice(0, 15)}\u2026.txt`;
        fileDisplayList.appendChild(fileItem);
    }

    if (files.length) {
        fileDisplayList.className="visible";
        document.getElementById("submit").disabled = false;

    } else {
        fileDisplayList.className="hidden";
    }


    // const text = files[0].name;
    // $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
}
