/* =========================================================
   GAMERENT - COMPLETE SCRIPT.JS
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let rentals = [];
let wishlist = [];

let selectedAvatar =
    localStorage.getItem("selectedAvatar") ||
    "https://i.pravatar.cc/150?img=12";


/* =========================================================
   SAFE LOCAL STORAGE LOADING
========================================================= */

try {

    const savedRentals = localStorage.getItem("rentals");

    if (savedRentals) {

        rentals = JSON.parse(savedRentals);

        if (!Array.isArray(rentals)) {
            rentals = [];
        }
    }

} catch (error) {

    console.warn("Invalid rentals data. Resetting rentals.");

    localStorage.removeItem("rentals");

    rentals = [];
}


try {

    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {

        wishlist = JSON.parse(savedWishlist);

        if (!Array.isArray(wishlist)) {
            wishlist = [];
        }
    }

} catch (error) {

    console.warn("Invalid wishlist data. Resetting wishlist.");

    localStorage.removeItem("wishlist");

    wishlist = [];
}


/* =========================================================
   RENTAL SYSTEM
========================================================= */

function rentGame(game, price) {

    if (!game || !price) {
        alert("Game information is missing.");
        return;
    }

    const alreadyRented =
        rentals.some(item => item.game === game);

    if (alreadyRented) {

        alert(`${game} is already in your rentals.`);

        return;
    }

    const confirmRent =
        confirm(`Rent ${game} for ₹${price}?`);

    if (!confirmRent) return;

    rentals.push({

        game: game,

        price: Number(price),

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );

    updateCartCount();
    renderRentals();
    updateProfileStats();

    alert(`${game} has been added to your rentals!`);
}


/* =========================================================
   REMOVE RENTAL
========================================================= */

function removeRental(index) {

    if (
        index < 0 ||
        index >= rentals.length
    ) {
        return;
    }

    const gameName =
        rentals[index].game;

    rentals.splice(index, 1);

    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );

    renderRentals();
    updateCartCount();
    updateProfileStats();

    alert(`${gameName} removed from rentals.`);
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    cartCount.textContent =
        rentals.length;
}


/* =========================================================
   RENDER RENTALS
========================================================= */

function renderRentals() {

    const rentalsList =
        document.getElementById("rentalsList");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!rentalsList) return;

    rentalsList.innerHTML = "";

    let total = 0;


    if (rentals.length === 0) {

        rentalsList.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-gamepad"></i>

                <h3>No rentals yet</h3>

                <p>
                    Browse the library and rent your first game.
                </p>

            </div>

        `;

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    rentals.forEach((item, index) => {

        total += Number(item.price) || 0;

        const rental =
            document.createElement("div");

        rental.className =
            "rental-item";

        rental.innerHTML = `

            <div class="rental-info">

                <h3>${item.game}</h3>

                <p>
                    Rented on ${item.date}
                </p>

            </div>


            <div class="rental-price">

                ₹${item.price}

            </div>


            <button
                class="remove-btn"
                onclick="removeRental(${index})"
                aria-label="Remove rental"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        rentalsList.appendChild(rental);

    });


    if (cartTotal) {

        cartTotal.textContent =
            `₹${total}`;

    }
}


/* =========================================================
   WISHLIST
========================================================= */

function addWishlist(game) {

    if (!game) return;


    if (wishlist.includes(game)) {

        alert(
            `${game} is already in your wishlist.`
        );

        return;
    }


    wishlist.push(game);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();
    updateWishlistButtons();
    updateProfileStats();

    alert(
        `${game} added to wishlist!`
    );
}


function removeWishlist(game) {

    wishlist =
        wishlist.filter(
            item => item !== game
        );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();
    updateWishlistButtons();
    updateProfileStats();
}


function renderWishlist() {

    const wishlistList =
        document.getElementById("wishlistList");

    if (!wishlistList) return;

    wishlistList.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistList.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    Your wishlist is empty
                </h3>

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

        item.className =
            "wishlist-item";


        const info =
            document.createElement("div");

        info.innerHTML = `
            <h3>${game}</h3>
        `;


        const button =
            document.createElement("button");

        button.className =
            "remove-btn";

        button.innerHTML = `
            <i class="fa-solid fa-trash"></i>
        `;

        button.addEventListener(
            "click",
            () => removeWishlist(game)
        );


        item.appendChild(info);

        item.appendChild(button);

        wishlistList.appendChild(item);

    });
}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function searchGame() {

    const searchBox =
        document.getElementById("searchBox");

    if (!searchBox) return;


    const searchTerm =
        searchBox.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            "#featured .card, #gameList .card"
        );


    cards.forEach(card => {

        const titleElement =
            card.querySelector("h3");

        const descriptionElement =
            card.querySelector("p");


        const title =
            titleElement
                ? titleElement.textContent.toLowerCase()
                : "";


        const description =
            descriptionElement
                ? descriptionElement.textContent.toLowerCase()
                : "";


        if (
            title.includes(searchTerm) ||
            description.includes(searchTerm)
        ) {

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

        const genreData =
            game.dataset.genre || "";


        const genres =
            genreData
                .toLowerCase()
                .split(/\s+/);


        if (
            category === "all" ||
            genres.includes(
                category.toLowerCase()
            )
        ) {

            game.style.display = "";

        } else {

            game.style.display = "none";

        }

    });
}


/* =========================================================
   PROFILE SYSTEM
========================================================= */

function openProfile() {

    const popup =
        document.getElementById(
            "profileOverlay"
        );

    if (!popup) return;

    popup.classList.add("active");

    loadProfile();
}


function closeProfile() {

    const popup =
        document.getElementById(
            "profileOverlay"
        );

    if (!popup) return;

    popup.classList.remove("active");
}


function selectAvatar(
    avatar,
    clickedImage
) {

    selectedAvatar = avatar;


    document
        .querySelectorAll(".avatar-option")
        .forEach(image => {

            image.classList.remove(
                "selected"
            );

        });


    if (clickedImage) {

        clickedImage.classList.add(
            "selected"
        );

    }
}


function saveProfile() {

    const input =
        document.getElementById(
            "profileInputName"
        );

    if (!input) return;


    const name =
        input.value.trim();


    if (name === "") {

        alert(
            "Please enter a username."
        );

        return;
    }


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "selectedAvatar",
        selectedAvatar
    );


    updateProfileButton();

    loadProfile();

    alert(
        "Profile saved successfully!"
    );

    closeProfile();
}


function loadProfile() {

    const savedName =
        localStorage.getItem(
            "profileName"
        ) || "Gamer";


    const savedAvatar =
        localStorage.getItem(
            "selectedAvatar"
        ) || selectedAvatar;


    selectedAvatar =
        savedAvatar;


    /* Visible profile name */

    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.textContent =
            savedName;

    }


    /* Popup input */

    const profileInput =
        document.getElementById(
            "profileInputName"
        );


    if (profileInput) {

        profileInput.value =
            savedName;

    }


    /* Profile images */

    document
        .querySelectorAll(
            ".profile-img"
        )
        .forEach(image => {

            image.src =
                savedAvatar;

        });


    /* Selected avatar */

    document
        .querySelectorAll(
            ".avatar-option"
        )
        .forEach(image => {

            image.classList.toggle(
                "selected",
                image.src === savedAvatar
            );

        });


    updateProfileStats();

    updateProfileButton();
}


/* =========================================================
   PROFILE STATS
========================================================= */

function updateProfileStats() {

    const rentalCount =
        document.getElementById(
            "profileRentalCount"
        );


    const wishlistCount =
        document.getElementById(
            "profileWishlistCount"
        );


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
   PROFILE NAVBAR BUTTON
========================================================= */

function updateProfileButton() {

    const profileButton =
        document.querySelector(
            ".profile-btn"
        );


    if (!profileButton) return;


    const savedName =
        localStorage.getItem(
            "profileName"
        );


    if (savedName) {

        profileButton.innerHTML = `

            <i class="fa-solid fa-user"></i>

            ${savedName}

        `;

    } else {

        profileButton.innerHTML = `

            <i class="fa-solid fa-user"></i>

            Profile

        `;
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem(
        "profileName"
    );

    localStorage.removeItem(
        "selectedAvatar"
    );


    selectedAvatar =
        "https://i.pravatar.cc/150?img=12";


    loadProfile();

    alert(
        "You have been logged out."
    );
}


/* =========================================================
   LOGIN
========================================================= */

function loginUser() {

    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    if (
        !emailInput ||
        !passwordInput
    ) {

        return;
    }


    const email =
        emailInput.value.trim();


    const password =
        passwordInput.value.trim();


    if (!email || !password) {

        alert(
            "Please enter your email and password."
        );

        return;
    }


    localStorage.setItem(
        "loggedIn",
        "true"
    );


    alert(
        "Login successful!"
    );


    const loginPopup =
        document.getElementById(
            "loginOverlay"
        );


    if (loginPopup) {

        loginPopup.classList.remove(
            "active"
        );

    }
}


/* =========================================================
   HERO / EXPLORE BUTTON
========================================================= */

function exploreGames() {

    const gameSection =
        document.getElementById(
            "gameLibrary"
        );


    if (gameSection) {

        gameSection.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    const featured =
        document.getElementById(
            "featured"
        );


    if (featured) {

        featured.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    window.location.href =
        "games.html";
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu() {

    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (!navLinks) return;


    navLinks.classList.toggle(
        "active"
    );
}


function closeMobileMenu() {

    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (!navLinks) return;


    navLinks.classList.remove(
        "active"
    );
}


/* =========================================================
   GAME DETAILS MODAL
========================================================= */

function openGameDetails(
    title,
    description,
    image,
    price,
    rating,
    genre,
    year
) {

    const modal =
        document.getElementById(
            "gameDetailsModal"
        );


    if (!modal) return;


    const modalTitle =
        document.getElementById(
            "modalGameTitle"
        );


    const modalDescription =
        document.getElementById(
            "modalGameDescription"
        );


    const modalImage =
        document.getElementById(
            "modalGameImage"
        );


    const modalPrice =
        document.getElementById(
            "modalGamePrice"
        );


    const modalRating =
        document.getElementById(
            "modalGameRating"
        );


    const modalGenre =
        document.getElementById(
            "modalGameGenre"
        );


    const modalYear =
        document.getElementById(
            "modalGameYear"
        );


    if (modalTitle) {

        modalTitle.textContent =
            title;

    }


    if (modalDescription) {

        modalDescription.textContent =
            description;

    }


    if (modalImage) {

        modalImage.src =
            image;

        modalImage.alt =
            title;

    }


    if (modalPrice) {

        modalPrice.textContent =
            `₹${price}`;

    }


    if (modalRating) {

        modalRating.textContent =
            rating || "4.8";

    }


    if (modalGenre) {

        modalGenre.textContent =
            genre || "Action";

    }


    if (modalYear) {

        modalYear.textContent =
            year || "2025";

    }


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );
}


function closeGameDetails() {

    const modal =
        document.getElementById(
            "gameDetailsModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );
}


/* =========================================================
   GAME POPUP
========================================================= */

function openGamePopup(
    title,
    description,
    image,
    price,
    rating
) {

    const popup =
        document.getElementById(
            "gamePopup"
        );


    if (!popup) return;


    const popupTitle =
        document.getElementById(
            "popupGameTitle"
        );


    const popupDescription =
        document.getElementById(
            "popupGameDescription"
        );


    const popupImage =
        document.getElementById(
            "popupGameImage"
        );


    const popupPrice =
        document.getElementById(
            "popupGamePrice"
        );


    const popupRating =
        document.getElementById(
            "popupGameRating"
        );


    if (popupTitle) {

        popupTitle.textContent =
            title;

    }


    if (popupDescription) {

        popupDescription.textContent =
            description;

    }


    if (popupImage) {

        popupImage.src =
            image;

        popupImage.alt =
            title;

    }


    if (popupPrice) {

        popupPrice.textContent =
            `₹${price}`;

    }


    if (popupRating) {

        popupRating.textContent =
            rating || "4.8";

    }


    popup.dataset.game =
        title;


    popup.dataset.price =
        price;


    popup.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );
}


function closeGamePopup() {

    const popup =
        document.getElementById(
            "gamePopup"
        );


    if (!popup) return;


    popup.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );
}


/* =========================================================
   RENT FROM POPUP
========================================================= */

function rentPopupGame() {

    const popup =
        document.getElementById(
            "gamePopup"
        );


    if (!popup) return;


    const game =
        popup.dataset.game;


    const price =
        Number(
            popup.dataset.price
        );


    if (!game || !price) {

        alert(
            "Game information is missing."
        );

        return;
    }


    rentGame(
        game,
        price
    );


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
        document.getElementById(
            "checkoutModal"
        );


    if (!checkout) {

        alert(
            `Your total is ₹${calculateTotal()}`
        );

        return;
    }


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    if (checkoutTotal) {

        checkoutTotal.textContent =
            `₹${calculateTotal()}`;

    }


    checkout.classList.add(
        "active"
    );
}


function closeCheckout() {

    const checkout =
        document.getElementById(
            "checkoutModal"
        );


    if (!checkout) return;


    checkout.classList.remove(
        "active"
    );
}


function calculateTotal() {

    return rentals.reduce(
        (total, item) => {

            return total +
                (Number(item.price) || 0);

        },
        0
    );
}


function completeCheckout() {

    if (rentals.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const total =
        calculateTotal();


    alert(
        `Payment successful!\n\nTotal: ₹${total}\n\nThank you for using GameRent!`
    );


    rentals = [];


    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );


    updateCartCount();

    renderRentals();

    updateProfileStats();

    closeCheckout();
}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const nav =
            document.querySelector(
                "nav"
            );


        if (!nav) return;


        if (window.scrollY > 50) {

            nav.classList.add(
                "scrolled"
            );

        } else {

            nav.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK CLICKED
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                ".nav-links a"
            )
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const gamePopup =
            document.getElementById(
                "gamePopup"
            );


        if (
            gamePopup &&
            event.target === gamePopup
        ) {

            closeGamePopup();

        }


        const gameDetails =
            document.getElementById(
                "gameDetailsModal"
            );


        if (
            gameDetails &&
            event.target === gameDetails
        ) {

            closeGameDetails();

        }


        const checkout =
            document.getElementById(
                "checkoutModal"
            );


        if (
            checkout &&
            event.target === checkout
        ) {

            closeCheckout();

        }


        const profileOverlay =
            document.getElementById(
                "profileOverlay"
            );


        if (
            profileOverlay &&
            event.target === profileOverlay
        ) {

            closeProfile();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeGamePopup();

        closeGameDetails();

        closeCheckout();

        closeProfile();

    }
);


/* =========================================================
   CARD ANIMATION
========================================================= */

function setupCardAnimations() {

    const cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "card-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-hover"
                );

            }
        );

    });
}


/* =========================================================
   CARD TILT EFFECT
========================================================= */

function setupCardTilt() {

    const cards =
        document.querySelectorAll(
            ".card.tilt-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 15;


                const rotateY =
                    (centerX - x) / 15;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.querySelector(
            ".particles"
        );


    if (!container) return;


    container.innerHTML = "";


    const amount = 35;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 +
            "%";


        particle.style.top =
            Math.random() * 100 +
            "%";


        particle.style.animationDelay =
            Math.random() * 5 +
            "s";


        particle.style.animationDuration =
            4 +
            Math.random() * 6 +
            "s";


        container.appendChild(
            particle
        );

    }
}


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

    const loader =
        document.getElementById(
            "loader"
        );


    if (!loader) return;


    setTimeout(
        () => {

            loader.classList.add(
                "hidden"
            );

        },
        500
    );
}


/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */

function setupSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });
}


/* =========================================================
   RENTAL PAGE AUTO RENDER
========================================================= */

function setupRentalPage() {

    renderRentals();

    updateCartCount();

}


/* =========================================================
   WISHLIST PAGE AUTO RENDER
========================================================= */

function setupWishlistPage() {

    renderWishlist();

}


/* =========================================================
   PROFILE PAGE AUTO LOAD
========================================================= */

function setupProfilePage() {

    loadProfile();

    updateProfileStats();

}


/* =========================================================
   SEARCH ENTER KEY
========================================================= */

function setupSearchEnter() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    if (!searchBox) return;


    searchBox.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                searchGame();

            }

        }
    );
}


/* =========================================================
   PREVENT BUTTON CLICK FROM OPENING GAME CARD
========================================================= */

function setupGameButtons() {

    document
        .querySelectorAll(
            ".card button, .card .rent-btn, .card .wishlist-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                }
            );

        });
}


/* =========================================================
   GAME DETAIL PAGE SUPPORT
========================================================= */

function setupGameDetailPage() {

    const rentButtons =
        document.querySelectorAll(
            "[data-rent-game]"
        );


    rentButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                const game =
                    button.dataset.rentGame;


                const price =
                    Number(
                        button.dataset.price
                    );


                if (
                    game &&
                    price
                ) {

                    rentGame(
                        game,
                        price
                    );

                }

            }
        );

    });


    const wishlistButtons =
        document.querySelectorAll(
            "[data-wishlist-game]"
        );


    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                const game =
                    button.dataset.wishlistGame;


                if (game) {

                    addWishlist(
                        game
                    );

                }

            }
        );

    });

}


/* =========================================================
   UPDATE WISHLIST BUTTON STATE
========================================================= */

function updateWishlistButtons() {

    document
        .querySelectorAll(
            ".wishlist-btn, [data-wishlist-game]"
        )
        .forEach(button => {

            const game =
                button.dataset.wishlistGame ||
                button.dataset.game;


            if (!game) return;


            const icon =
                button.querySelector(
                    "i"
                );


            if (
                wishlist.includes(game)
            ) {

                button.classList.add(
                    "active"
                );


                if (icon) {

                    icon.classList.remove(
                        "fa-regular"
                    );


                    icon.classList.add(
                        "fa-solid"
                    );

                }

            } else {

                button.classList.remove(
                    "active"
                );


                if (icon) {

                    icon.classList.remove(
                        "fa-solid"
                    );


                    icon.classList.add(
                        "fa-regular"
                    );

                }

            }

        });
}


/* =========================================================
   LOCAL STORAGE SAFETY
========================================================= */

function refreshAllData() {

    /* Rentals */

    try {

        const savedRentals =
            localStorage.getItem(
                "rentals"
            );


        rentals =
            savedRentals
                ? JSON.parse(savedRentals)
                : [];


        if (
            !Array.isArray(rentals)
        ) {

            rentals = [];

        }

    } catch (error) {

        console.warn(
            "Invalid rentals data. Resetting."
        );


        localStorage.removeItem(
            "rentals"
        );


        rentals = [];

    }


    /* Wishlist */

    try {

        const savedWishlist =
            localStorage.getItem(
                "wishlist"
            );


        wishlist =
            savedWishlist
                ? JSON.parse(savedWishlist)
                : [];


        if (
            !Array.isArray(wishlist)
        ) {

            wishlist = [];

        }

    } catch (error) {

        console.warn(
            "Invalid wishlist data. Resetting."
        );


        localStorage.removeItem(
            "wishlist"
        );


        wishlist = [];

    }


    /* Avatar */

    selectedAvatar =
        localStorage.getItem(
            "selectedAvatar"
        ) ||
        "https://i.pravatar.cc/150?img=12";


    /* Update everything */

    updateCartCount();

    renderRentals();

    renderWishlist();

    updateProfileStats();

    updateWishlistButtons();

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Load saved data */

        refreshAllData();


        /* Profile */

        loadProfile();


        /* Search */

        setupSearchEnter();


        /* Cards */

        setupCardAnimations();

        setupCardTilt();

        setupGameButtons();


        /* Pages */

        setupRentalPage();

        setupWishlistPage();

        setupProfilePage();

        setupGameDetailPage();


        /* Other UI */

        setupSmoothScroll();

        createParticles();


        /* Loader */

        hideLoader();


        /* Wishlist */

        updateWishlistButtons();


        console.log(
            "GameRent JavaScript loaded successfully."
        );

    }
);


/* =========================================================
   WINDOW LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateCartCount();

        updateProfileStats();

        updateWishlistButtons();

    }
);


/* =========================================================
   DEBUG HELPERS
========================================================= */

function clearRentals() {

    rentals = [];


    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );


    refreshAllData();


    console.log(
        "Rentals cleared."
    );
}


function clearWishlist() {

    wishlist = [];


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    refreshAllData();


    console.log(
        "Wishlist cleared."
    );
}


/* =========================================================
   GAMERENT READY
========================================================= */

console.log(
    "%c🎮 GameRent initialized!",
    "font-size:18px;font-weight:bold;"
);
