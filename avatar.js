/* =====================================================
   AVATAR SYSTEM
===================================================== */

let selectedAvatar = null;


/* SELECT AVATAR */

function selectAvatar(element, imagePath) {

    // Remove previous selection

    document
        .querySelectorAll(".avatar-option")
        .forEach(avatar => {

            avatar.classList.remove("selected");

        });


    // Select clicked avatar

    element.classList.add("selected");


    // Change preview

    document.getElementById("currentAvatar").src = imagePath;


    // Store temporarily

    selectedAvatar = imagePath;
}



/* SAVE */

function saveAvatar() {

    if (selectedAvatar) {

        localStorage.setItem(
            "gameRentAvatar",
            selectedAvatar
        );

    }

    alert("Avatar saved!");

    goBack();
}



/* LOAD SAVED AVATAR */

window.addEventListener("DOMContentLoaded", () => {

    const savedAvatar =
        localStorage.getItem("gameRentAvatar");


    if (savedAvatar) {

        document.getElementById(
            "currentAvatar"
        ).src = savedAvatar;

    }

});


/* BACK */

function goBack() {

    window.history.back();

}
