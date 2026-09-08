/* =========================================================
   GAMERENT - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let selectedAvatar =
    localStorage.getItem("selectedAvatar") ||
    "https://i.pravatar.cc/150?img=12";


/* =========================================================
   SAVE DATA
========================================================= */

function saveRentals() {
    localStorage.setItem("rentals", JSON.stringify(rentals));
}

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


/* =========================================================
   RENT GAME
========================================================= */

function rentGame(game, price) {

    const existingGame = rentals.find(
        item => item.game === game
    );

    if (existingGame) {
        alert(game + " is already in your rentals.");
        return;
    }

    const confirmRent = confirm(
        `Rent ${game} for ₹${price}?`
    );

    if (!confirmRent) {
        return;
    }

    rentals.push({
        game: game,
        price: price,
        date: new Date().toLocaleDateString()
    });

    saveRentals();

    updateCartCount();
    renderRentals();

    alert(
        `${game} has been added to your rentals!`
    );
}


/* =========================================================
   REMOVE RENTAL
========================================================= */

function removeRental(index) {

    if (index < 0 || index >= rentals.length) {
        return;
    }

    const gameName = rentals[index].game;

    rentals.splice(index, 1);

    saveRentals();

    updateCartCount();
    renderRentals();

    alert(
        `${gameName} was removed from your rentals.`
    );
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCounts =
        document.querySelectorAll("#cartCount, .cart-count");

    cartCounts.forEach(counter => {
        counter.textContent = rentals.length;
    });
}


/* =========================================================
   RENDER RENTALS
========================================================= */

function renderRentals() {

    const rentalsList =
        document.getElementById("rentalsList");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!rentalsList) {
        return;
    }

    rentalsList.innerHTML = "";

    let total = 0;

    if (rentals.length === 0) {

        rentalsList.innerHTML = `
            <div class="empty-rentals">
                <i class="fa-solid fa-gamepad"></i>
                <h3>No games rented yet</h3>
                <p>Explore our library and rent your first game.</p>
            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    rentals.forEach((rental, index) => {

        total += Number(rental.price);

        const item = document.createElement("div");

        item.className = "rental-item";

        item.innerHTML = `
            <div class="rental-info">

                <h3>${rental.game}</h3>

                <p>
                    Rented on ${rental.date}
                </p>

            </div>

            <div class="rental-price">
                ₹${rental.price}
            </div>

            <button
                class="remove-rental"
                onclick="removeRental(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        rentalsList.appendChild(item);

    });


    if (cartTotal) {
        cartTotal.textContent = `₹${total}`;
    }
}


/* =========================================================
   WISHLIST
========================================================= */

function addWishlist(game) {

    if (wishlist.includes(game)) {

        alert(
            `${game} is already in your wishlist.`
        );

        return;
    }

    wishlist.push(game);

    saveWishlist();

    renderWishlist();

    alert(
        `${game} has been added to your wishlist!`
    );
}


function removeWishlist(game) {

    wishlist =
        wishlist.filter(item => item !== game);

    saveWishlist();

    renderWishlist();
}


function renderWishlist() {

    const wishlistList =
        document.getElementById("wishlistList");

    if (!wishlistList) {
        return;
    }

    wishlistList.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistList.innerHTML = `
            <div class="empty-wishlist">

                <i class="fa-regular fa-heart"></i>

                <h3>Your wishlist is empty</h3>

                <p>
                    Add games you want to play later.
                </p>

            </div>
        `;

        return;
    }


    wishlist.forEach(game => {

        const item =
            document.createElement("div");

        item.className = "wishlist-item";

        item.innerHTML = `

            <div>
                <h3>${game}</h3>
            </div>

            <button
                onclick="removeWishlist('${game}')">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        wishlistList.appendChild(item);

    });
}


/* =========================================================
   SEARCH GAMES
========================================================= */

function searchGame() {

    const searchBox =
        document.getElementById("searchBox");

    if (!searchBox) {
        return;
    }

    const search =
        searchBox.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            "#gameList .card, #featured .card"
        );


    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(category, button) {

    document
        .querySelectorAll(".cat-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    if (button) {
        button.classList.add("active");
    }


    const games =
        document.querySelectorAll(
            "#gameList .card"
        );


    games.forEach(game => {

        const genre =
            game.dataset.genre || "";

        const genres =
            genre.toLowerCase().split(" ");


        if (
            category === "all" ||
            genres.includes(category.toLowerCase())
        ) {

            game.style.display = "";

        } else {

            game.style.display = "none";

        }

    });
}


/* =========================================================
   PROFILE
========================================================= */

function openProfile() {

    const popup =
        document.getElementById("profileOverlay");

    if (!popup) {
        return;
    }

    popup.classList.add("active");

    const input =
        document.getElementById("profileInputName");

    if (input) {

        input.value =
            localStorage.getItem("profileName") || "";

    }

    updateProfileStats();
}


function closeProfile() {

    const popup =
        document.getElementById("profileOverlay");

    if (!popup) {
        return;
    }

    popup.classList.remove("active");
}


/* =========================================================
   SELECT AVATAR
========================================================= */

function selectAvatar(avatar, clickedImage) {

    selectedAvatar = avatar;

    document
        .querySelectorAll(".avatar-option")
        .forEach(image => {

            image.classList.remove("selected");

        });


    if (clickedImage) {
        clickedImage.classList.add("selected");
    }
}


/* =========================================================
   SAVE PROFILE
========================================================= */

function saveProfile() {

    const input =
        document.getElementById("profileInputName");

    if (!input) {
        return;
    }

    const username =
        input.value.trim();


    if (!username) {

        alert("Please enter a username.");

        return;
    }


    localStorage.setItem(
        "profileName",
        username
    );

    localStorage.setItem(
        "selectedAvatar",
        selectedAvatar
    );


    loadProfile();

    closeProfile();

    alert("Profile saved successfully!");
}


/* =========================================================
   LOAD PROFILE
========================================================= */

function loadProfile() {

    const username =
        localStorage.getItem("profileName") ||
        "Player";


    const avatar =
        localStorage.getItem("selectedAvatar") ||
        "https://i.pravatar.cc/150?img=12";


    const profileNames =
        document.querySelectorAll(
            "#profileName, .profile-name"
        );


    profileNames.forEach(element => {

        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA"
        ) {

            element.value = username;

        } else {

            element.textContent = username;

        }

    });


    const profileImages =
        document.querySelectorAll(
            "#profileAvatar, .profile-img"
        );


    profileImages.forEach(image => {

        image.src = avatar;

    });


    updateProfileStats();
}


/* =========================================================
   PROFILE STATS
========================================================= */

function updateProfileStats() {

    const rentalCount =
        document.getElementById("profileRentalCount");

    const wishlistCount =
        document.getElementById("profileWishlistCount");


    if (rentalCount) {
        rentalCount.textContent =
            rentals.length;
    }


    if (wishlistCount) {
        wishlistCount.textContent =
            wishlist.length;
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem("profileName");
    localStorage.removeItem("selectedAvatar");

    alert("You have been logged out.");

    location.reload();
}


/* =========================================================
   LOGIN
========================================================= */

function loginUser() {

    const username =
        prompt("Enter your username:");

    if (!username) {
        return;
    }

    localStorage.setItem(
        "profileName",
        username
    );

    loadProfile();

    alert(
        `Welcome to GameRent, ${username}!`
    );
}


/* =========================================================
   HERO SCROLL
========================================================= */

function exploreGames() {

    const gameLibrary =
        document.getElementById("gameLibrary");


    if (gameLibrary) {

        gameLibrary.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    const featured =
        document.getElementById("featured");


    if (featured) {

        featured.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }

    navLinks.classList.toggle("active");
}


/* =========================================================
   GAME DETAILS MODAL
========================================================= */

function openGameDetails(game) {

    const modal =
        document.getElementById("gameModal");

    if (!modal) {
        return;
    }


    const title =
        document.getElementById("modalTitle");

    const description =
        document.getElementById("modalDescription");


    if (title) {
        title.textContent =
            game.title || game.name || "Game";
    }


    if (description) {
        description.textContent =
            game.description || "";
    }


    modal.classList.add("active");
}


function closeGameDetails() {

    const modal =
        document.getElementById("gameModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
}


/* =========================================================
   GAME POPUP
========================================================= */

function openGamePopup(
    title,
    price,
    image,
    description
) {

    const popup =
        document.getElementById("gamePopup");

    if (!popup) {
        return;
    }


    const popupTitle =
        document.getElementById("popupGameTitle");

    const popupPrice =
        document.getElementById("popupGamePrice");

    const popupImage =
        document.getElementById("popupGameImage");

    const popupDescription =
        document.getElementById("popupGameDescription");


    if (popupTitle) {
        popupTitle.textContent = title;
    }


    if (popupPrice) {
        popupPrice.textContent = `₹${price}`;
    }


    if (popupImage) {
        popupImage.src = image;
    }


    if (popupDescription) {
        popupDescription.textContent =
            description || "";
    }


    popup.dataset.game = title;
    popup.dataset.price = price;

    popup.classList.add("active");
}


function closeGamePopup() {

    const popup =
        document.getElementById("gamePopup");

    if (!popup) {
        return;
    }

    popup.classList.remove("active");
}


function rentPopupGame() {

    const popup =
        document.getElementById("gamePopup");

    if (!popup) {
        return;
    }


    const game =
        popup.dataset.game;

    const price =
        Number(popup.dataset.price);


    if (!game || !price) {
        return;
    }


    rentGame(game, price);

    closeGamePopup();
}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (rentals.length === 0) {

        alert(
            "Your rental cart is empty."
        );

        return;
    }


    const checkout =
        document.getElementById("checkoutModal");


    if (checkout) {

        checkout.classList.add("active");

        return;
    }


    let total = 0;

    rentals.forEach(item => {

        total += Number(item.price);

    });


    alert(
        `Checkout total: ₹${total}`
    );
}


function closeCheckout() {

    const checkout =
        document.getElementById("checkoutModal");

    if (!checkout) {
        return;
    }

    checkout.classList.remove("active");
}


function completeCheckout() {

    if (rentals.length === 0) {

        alert(
            "There are no games to checkout."
        );

        return;
    }


    alert(
        "Payment successful! Your games are ready."
    );

    closeCheckout();
}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function handleNavbarScroll() {

    const navbar =
        document.getElementById("navbar") ||
        document.querySelector("nav");


    if (!navbar) {
        return;
    }


    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }
}


/* =========================================================
   CLOSE POPUPS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function(event) {

    const profileOverlay =
        document.getElementById("profileOverlay");


    if (
        profileOverlay &&
        event.target === profileOverlay
    ) {

        closeProfile();

    }


    const gamePopup =
        document.getElementById("gamePopup");


    if (
        gamePopup &&
        event.target === gamePopup
    ) {

        closeGamePopup();

    }


    const gameModal =
        document.getElementById("gameModal");


    if (
        gameModal &&
        event.target === gameModal
    ) {

        closeGameDetails();

    }


    const checkoutModal =
        document.getElementById("checkoutModal");


    if (
        checkoutModal &&
        event.target === checkoutModal
    ) {

        closeCheckout();

    }

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }

        closeProfile();
        closeGamePopup();
        closeGameDetails();
        closeCheckout();

    }
);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProfile();

        updateCartCount();

        renderRentals();

        renderWishlist();

        handleNavbarScroll();


        /* -----------------------------------------
           NAVBAR SCROLL
        ----------------------------------------- */

        window.addEventListener(
            "scroll",
            handleNavbarScroll
        );


        /* -----------------------------------------
           RENTAL BUTTONS
        ----------------------------------------- */

        document
            .querySelectorAll("[data-rent-game]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        const game =
                            this.dataset.rentGame;

                        const price =
                            Number(
                                this.dataset.price
                            );

                        rentGame(game, price);

                    }
                );

            });


        /* -----------------------------------------
           WISHLIST BUTTONS
        ----------------------------------------- */

        document
            .querySelectorAll("[data-wishlist-game]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();

                        addWishlist(
                            this.dataset.wishlistGame
                        );

                    }
                );

            });


        /* -----------------------------------------
           MOBILE MENU
        ----------------------------------------- */

        const menuButton =
            document.querySelector(".menu-toggle");


        if (menuButton) {

            menuButton.addEventListener(
                "click",
                toggleMenu
            );

        }


        /* -----------------------------------------
           SEARCH ENTER KEY
        ----------------------------------------- */

        const searchBox =
            document.getElementById("searchBox");


        if (searchBox) {

            searchBox.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchGame();

                    }

                }
            );

        }

    }
);
