/* ================================
   AVATAR SYSTEM
================================ */

// Get saved profile information
let savedName = localStorage.getItem("profileName");
let savedAvatar = localStorage.getItem("profileAvatar");


// ================================
// ELEMENTS
// ================================

const currentAvatar = document.getElementById("currentAvatar");
const profileName = document.getElementById("profileName");
const avatarOptions = document.querySelectorAll(".avatar-option");


// ================================
// LOAD SAVED PROFILE
// ================================

if (savedName) {
    profileName.textContent = savedName;
}

if (savedAvatar) {
    currentAvatar.src = savedAvatar;
}


// ================================
// AVATAR SELECTION
// ================================

avatarOptions.forEach(function (avatar) {

    avatar.addEventListener("click", function () {

        // Change main avatar
        currentAvatar.src = this.src;

        // Remove selection from all
        avatarOptions.forEach(function (item) {
            item.classList.remove("selected");
        });

        // Select clicked avatar
        this.classList.add("selected");

        // Save immediately
        localStorage.setItem("profileAvatar", this.src);

    });

});


// ================================
// DONE BUTTON
// ================================

function saveAvatar() {

    localStorage.setItem(
        "profileAvatar",
        currentAvatar.src
    );

    window.location.href = "index.html";
}
