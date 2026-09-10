// ==========================================
// AVATAR EDITOR
// ==========================================

let selectedAvatar = localStorage.getItem("profileAvatar") ||
    "https://avatarfiles.alphacoders.com/343/thumb-1920-343468.png";


// ==========================================
// LOAD SAVED AVATAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const currentAvatar = document.getElementById("currentAvatar");

    if (currentAvatar) {
        currentAvatar.src = selectedAvatar;
    }

});


// ==========================================
// SELECT AVATAR
// ==========================================

function selectAvatar(card) {

    // Get the image inside the clicked card
    const img = card.querySelector("img");

    if (!img) return;

    // Save temporarily
    selectedAvatar = img.src;

    // Change big profile picture
    const currentAvatar = document.getElementById("currentAvatar");

    if (currentAvatar) {
        currentAvatar.src = selectedAvatar;
    }

    // Remove previous selection
    document.querySelectorAll(".avatar-card").forEach(function (item) {
        item.classList.remove("selected");
    });

    // Highlight selected avatar
    card.classList.add("selected");
}


// ==========================================
// SAVE AVATAR
// ==========================================

function saveAvatar() {

    // Save avatar permanently in browser
    localStorage.setItem("profileAvatar", selectedAvatar);

    // Also save using profile object
    let profile = JSON.parse(localStorage.getItem("profile")) || {};

    profile.avatar = selectedAvatar;

    // Keep existing name if there is one
    if (!profile.name) {
        profile.name = "Rudra";
    }

    localStorage.setItem("profile", JSON.stringify(profile));

    // Go back to GameRent
    window.location.href = "index.html";
}
