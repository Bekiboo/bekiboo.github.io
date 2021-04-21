// Get the modal
var modal = document.getElementById("infoModal");

// Get the button that opens the modal
var btn = document.getElementById("infoBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal_info-close")[0];

// When the user clicks the button, open the modal 

mainId = document.getElementsByTagName('main');
mainIdName = mainId[0].id
if (mainIdName == "mainHome") {
    btn.onclick = function () {
        modal.style.display = "block";
    }
} else {
    let form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}