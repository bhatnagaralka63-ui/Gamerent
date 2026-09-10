// ==========================================
// AVATAR EDITOR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const savedAvatar =
        localStorage.getItem("profileAvatar");

    const savedName =
        localStorage.getItem("username");

    const currentAvatar =
        document.getElementById("currentAvatar");

    const nameInput =
        document.getElementById("profileName");


    // Load avatar
    if (savedAvatar && currentAvatar) {
        currentAvatar.src = savedAvatar;
        selectedAvatar = savedAvatar;
    }


    // Load name
    if (savedName && nameInput) {
        nameInput.value = savedName;
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

    // Get the name
    const nameInput = document.getElementById("profileName");

    let name = nameInput.value.trim();

    // Don't allow empty name
    if (!name) {
        name = "Rudra";
    }

    // Save avatar
    localStorage.setItem("profileAvatar", selectedAvatar);

    // Save name
    localStorage.setItem("username", name);

    // Save profile object too
    let profile = JSON.parse(localStorage.getItem("profile")) || {};

    profile.name = name;
    profile.avatar = selectedAvatar;

    localStorage.setItem("profile", JSON.stringify(profile));

    // Return to GameRent
    window.location.href = "index.html";
}
