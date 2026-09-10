/* =========================================
   AVATAR SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentAvatar =
        document.getElementById("currentAvatar");

    const avatarOptions =
        document.querySelectorAll(".avatar-option");

    const savedAvatar =
        localStorage.getItem("gameRentAvatar");

    const savedName =
        localStorage.getItem("gameRentUsername");


    /* =========================================
       LOAD SAVED AVATAR
    ========================================= */

    if (savedAvatar && currentAvatar) {
        currentAvatar.src = savedAvatar;
    }


    /* =========================================
       LOAD SAVED NAME
    ========================================= */

    const usernameElement =
        document.getElementById("avatarUsername");

    if (savedName && usernameElement) {
        usernameElement.textContent = savedName;
    }


    /* =========================================
       AVATAR CLICK
    ========================================= */

    avatarOptions.forEach(function (avatar) {

        avatar.addEventListener("click", function () {

            const selectedImage =
                this.src;

            /* Change preview */

            if (currentAvatar) {
                currentAvatar.src = selectedImage;
            }


            /* Remove previous selection */

            avatarOptions.forEach(function (item) {
                item.classList.remove("selected");
            });


            /* Select current avatar */

            this.classList.add("selected");


            /* Save immediately */

            localStorage.setItem(
                "gameRentAvatar",
                selectedImage
            );

        });

    });

});


/* =========================================
   DONE BUTTON
========================================= */

function finishAvatar() {

    window.location.href = "index.html";

}


/* =========================================
   GO BACK
========================================= */

function goBack() {

    window.history.back();

}
