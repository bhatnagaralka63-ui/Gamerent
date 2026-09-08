/* =========================================================
   GAMERENT - CLEAN SCRIPT
   ========================================================= */

/* =========================================================
   GLOBAL DATA
========================================================= */

let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let selectedAvatar =
    "https://i.pravatar.cc/150?img=12";


/* =========================================================
   RENTALS / CART
========================================================= */

function rentGame(game, price) {

    const alreadyRented = rentals.some(item => item.game === game);

    if (alreadyRented) {
        alert("You already rented this game 🎮");
        return;
    }

    const confirmRent = confirm(
        `Rent ${game} for ₹${price}?`
    );

    if (!confirmRent) return;

    rentals.push({
        game: game,
        price: Number(price)
    });

    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );

    renderRentals();
    loadProfile();

    alert(`${game} added to your rentals 🎮`);
}


function removeRental(index) {

    if (index < 0 || index >= rentals.length) return;

    rentals.splice(index, 1);

    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );

    renderRentals();
    loadProfile();
}


function renderRentals() {

    const rentalsList =
        document.getElementById("rentalsList");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    if (!rentalsList) return;

    rentalsList.innerHTML = "";

    let total = 0;

    rentals.forEach((item, index) => {

        total += Number(item.price);

        const div = document.createElement("div");

        div.className = "rental-item";

        div.innerHTML = `
            <div>
                <strong>${item.game}</strong>
                <p>₹${item.price}</p>
            </div>

            <button onclick="removeRental(${index})">
                Remove
            </button>
        `;

        rentalsList.appendChild(div);
    });

    if (cartTotal) {
        cartTotal.innerText = `₹${total}`;
    }

    if (cartCount) {
        cartCount.innerText = rentals.length;
    }
}


/* =========================================================
   SEARCH
========================================================= */

function searchGame() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    const query =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(
            "#featured .card, #gameList .card"
        );

    cards.forEach(card => {

        const titleElement =
            card.querySelector("h3");

        if (!titleElement) return;

        const title =
            titleElement.innerText.toLowerCase();

        card.style.display =
            title.includes(query)
                ? ""
                : "none";
    });
}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginButton =
        document.querySelector(".login-btn");

    if (!loginButton) return;

    const username =
        localStorage.getItem("username");

    if (username) {
        loginButton.innerHTML =
            `<i class="fa-solid fa-user"></i> ${username}`;
    }

    loginButton.addEventListener("click", function () {

        const currentUser =
            localStorage.getItem("username");

        const name =
            prompt(
                "Enter your username:",
                currentUser || ""
            );

        if (!name || name.trim() === "") {
            return;
        }

        localStorage.setItem(
            "username",
            name.trim()
        );

        loginButton.innerHTML =
            `<i class="fa-solid fa-user"></i> ${name.trim()}`;

        loadProfile();
    });
}


/* =========================================================
   PROFILE SYSTEM
========================================================= */

function openProfile() {

    const overlay =
        document.getElementById("profileOverlay");

    if (!overlay) return;

    overlay.style.display = "flex";

    const savedProfile =
        localStorage.getItem("profile");

    const input =
        document.getElementById("profileInputName");

    const avatar =
        document.getElementById("selectedAvatar");

    if (savedProfile) {

        try {

            const profile =
                JSON.parse(savedProfile);

            if (input) {
                input.value =
                    profile.name || "";
            }

            if (avatar && profile.avatar) {

                avatar.src =
                    profile.avatar;

                selectedAvatar =
                    profile.avatar;
            }

        } catch (error) {

            console.error(
                "Could not load profile:",
                error
            );
        }

    } else {

        if (input) {
            input.value =
                localStorage.getItem("username") || "";
        }

        if (avatar) {
            avatar.src =
                selectedAvatar;
        }
    }
}


function closeProfile() {

    const overlay =
        document.getElementById("profileOverlay");

    if (!overlay) return;

    overlay.style.display = "none";
}


function selectAvatar(avatar, clickedImage) {

    selectedAvatar = avatar;

    const selected =
        document.getElementById("selectedAvatar");

    if (selected) {
        selected.src = avatar;
    }

    document
        .querySelectorAll(".avatar-list img")
        .forEach(img => {

            img.classList.remove("selected");

        });

    if (clickedImage) {
        clickedImage.classList.add("selected");
    }
}


function saveProfile() {

    const input =
        document.getElementById("profileInputName");

    if (!input) return;

    const name =
        input.value.trim();

    if (name === "") {

        alert(
            "Please enter a username."
        );

        return;
    }

    const profile = {
        name: name,
        avatar: selectedAvatar
    };

    localStorage.setItem(
        "profile",
        JSON.stringify(profile)
    );

    localStorage.setItem(
        "username",
        name
    );

    loadProfile();

    closeProfile();

    alert(
        "Profile saved successfully 🎮"
    );
}


function loadProfile() {

    const savedProfile =
        localStorage.getItem("profile");

    let name =
        localStorage.getItem("username") ||
        "Guest User";

    let avatar =
        selectedAvatar;

    if (savedProfile) {

        try {

            const profile =
                JSON.parse(savedProfile);

            name =
                profile.name ||
                name;

            avatar =
                profile.avatar ||
                avatar;

        } catch (error) {

            console.error(
                "Invalid profile data:",
                error
            );
        }
    }

    /* Username */

    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.innerText =
            name;
    }


    /* Rentals */

    const rentedCount =
        document.getElementById("rentedCount");

    if (rentedCount) {
        rentedCount.innerText =
            rentals.length;
    }


    /* Wishlist */

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (wishlistCount) {
        wishlistCount.innerText =
            wishlist.length;
    }


    /* Money spent */

    const moneySpent =
        document.getElementById("moneySpent");

    if (moneySpent) {

        const total =
            rentals.reduce(
                (sum, item) =>
                    sum + Number(item.price),
                0
            );

        moneySpent.innerText =
            `₹${total}`;
    }


    /* Profile image */

    const profileImage =
        document.querySelector(
            ".profile-box .profile-img"
        );

    if (profileImage && avatar) {
        profileImage.src = avatar;
    }
}


function logoutUser() {

    localStorage.removeItem("username");
    localStorage.removeItem("profile");

    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.innerText =
            "Guest User";
    }

    const profileImage =
        document.querySelector(
            ".profile-box .profile-img"
        );

    if (profileImage) {
        profileImage.src =
            "https://i.pravatar.cc/150";
    }

    loadProfile();

    alert(
        "Logged out successfully 👋"
    );
}


/* =========================================================
   CLOSE PROFILE WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const overlay =
            document.getElementById(
                "profileOverlay"
            );

        if (!overlay) return;

        if (
            event.target === overlay
        ) {
            closeProfile();
        }
    }
);


/* =========================================================
   WISHLIST
========================================================= */

function addWishlist(game) {

    if (wishlist.includes(game)) {

        alert(
            `${game} is already in your wishlist ❤️`
        );

        return;
    }

    wishlist.push(game);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();
    loadProfile();

    alert(
        `${game} added to wishlist ❤️`
    );
}


function removeWishlist(index) {

    if (
        index < 0 ||
        index >= wishlist.length
    ) {
        return;
    }

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();
    loadProfile();
}


function renderWishlist() {

    const wishlistList =
        document.getElementById(
            "wishlistList"
        );

    if (!wishlistList) return;

    wishlistList.innerHTML = "";

    wishlist.forEach(
        (game, index) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "wishlist-item";

            div.innerHTML = `
                <div>
                    <strong>${game}</strong>
                </div>

                <button onclick="removeWishlist(${index})">
                    Remove
                </button>
            `;

            wishlistList.appendChild(div);
        }
    );
}


/* =========================================================
   HERO BUTTON
========================================================= */

function setupHeroButton() {

    const heroButton =
        document.querySelector(
            ".hero button"
        );

    if (!heroButton) return;

    heroButton.addEventListener(
        "click",
        function() {

            const featured =
                document.getElementById(
                    "featured"
                );

            if (featured) {

                featured.scrollIntoView({
                    behavior: "smooth"
                });

            }
        }
    );
}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function setupNavbar() {

    const nav =
        document.querySelector("nav");

    if (!nav) return;

    window.addEventListener(
        "scroll",
        function() {

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
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterGames(category) {

    const cards =
        document.querySelectorAll(
            "#featured .card, #gameList .card"
        );

    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        if (
            category === "all" ||
            !category ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            "nav ul"
        );

    if (
        !menuButton ||
        !navLinks
    ) {
        return;
    }

    menuButton.addEventListener(
        "click",
        function() {

            navLinks.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   CARD ANIMATION
========================================================= */

function setupCardAnimations() {

    const cards =
        document.querySelectorAll(
            ".card"
        );

    cards.forEach(
        (card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(20px)";

            setTimeout(
                function() {

                    card.style.transition =
                        "opacity 0.5s ease, transform 0.5s ease";

                    card.style.opacity =
                        "1";

                    card.style.transform =
                        "translateY(0)";

                },
                index * 80
            );
        }
    );
}


/* =========================================================
   GAME DETAILS MODAL
========================================================= */

function openGameModal(
    title,
    description,
    image,
    rating
) {

    const modal =
        document.getElementById(
            "gameModal"
        );

    if (!modal) return;

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalRating =
        document.getElementById(
            "modalRating"
        );

    if (modalTitle) {
        modalTitle.innerText =
            title;
    }

    if (modalDescription) {
        modalDescription.innerText =
            description;
    }

    if (modalImage) {
        modalImage.src =
            image;
    }

    if (modalRating) {
        modalRating.innerText =
            rating || "";
    }

    modal.style.display =
        "flex";
}


function closeGameModal() {

    const modal =
        document.getElementById(
            "gameModal"
        );

    if (!modal) return;

    modal.style.display =
        "none";
}


/* =========================================================
   GAME POPUP
========================================================= */

let currentPopupGame = null;
let currentPopupPrice = 0;


function openPopup(
    game,
    price,
    image
) {

    currentPopupGame = game;
    currentPopupPrice = Number(price);

    const popup =
        document.getElementById(
            "gamePopup"
        );

    if (!popup) return;

    const popupTitle =
        document.getElementById(
            "popupTitle"
        );

    const popupImage =
        document.getElementById(
            "popupImage"
        );

    const popupPrice =
        document.getElementById(
            "popupPrice"
        );

    if (popupTitle) {
        popupTitle.innerText =
            game;
    }

    if (popupImage && image) {
        popupImage.src =
            image;
    }

    if (popupPrice) {
        popupPrice.innerText =
            `₹${price}`;
    }

    popup.style.display =
        "flex";
}


function closePopup() {

    const popup =
        document.getElementById(
            "gamePopup"
        );

    if (!popup) return;

    popup.style.display =
        "none";

    currentPopupGame = null;
    currentPopupPrice = 0;
}


function rentPopupGame() {

    if (
        !currentPopupGame ||
        !currentPopupPrice
    ) {
        return;
    }

    rentGame(
        currentPopupGame,
        currentPopupPrice
    );

    closePopup();
}


/* =========================================================
   CLOSE MODALS BY CLICKING OUTSIDE
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const gameModal =
            document.getElementById(
                "gameModal"
            );

        const gamePopup =
            document.getElementById(
                "gamePopup"
            );

        if (
            gameModal &&
            event.target === gameModal
        ) {
            closeGameModal();
        }

        if (
            gamePopup &&
            event.target === gamePopup
        ) {
            closePopup();
        }
    }
);


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (rentals.length === 0) {

        alert(
            "Your cart is empty 🎮"
        );

        return;
    }

    const checkout =
        document.getElementById(
            "checkout"
        );

    if (!checkout) return;

    checkout.style.display =
        "flex";

    updateCheckoutTotal();
}


function closeCheckout() {

    const checkout =
        document.getElementById(
            "checkout"
        );

    if (!checkout) return;

    checkout.style.display =
        "none";
}


function updateCheckoutTotal() {

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );

    if (!checkoutTotal) return;

    const total =
        rentals.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );

    checkoutTotal.innerText =
        `₹${total}`;
}


function processPayment() {

    if (rentals.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }

    const total =
        rentals.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );

    const confirmed =
        confirm(
            `Confirm payment of ₹${total}?`
        );

    if (!confirmed) return;

    alert(
        "Payment successful! 🎉"
    );

    rentals = [];

    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );

    renderRentals();
    loadProfile();
    closeCheckout();
}


/* =========================================================
   LOADER
========================================================= */

function setupLoader() {

    const loader =
        document.getElementById(
            "loader"
        );

    if (!loader) return;

    window.addEventListener(
        "load",
        function() {

            setTimeout(
                function() {

                    loader.classList.add(
                        "hidden"
                    );

                    setTimeout(
                        function() {

                            loader.style.display =
                                "none";

                        },
                        500
                    );

                },
                500
            );
        }
    );
}


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

function setupParticles() {

    const canvas =
        document.getElementById(
            "particles"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    function createParticles() {

        particles = [];

        const count =
            Math.min(
                80,
                Math.floor(
                    window.innerWidth / 15
                )
            );

        for (
            let i = 0;
            i < count;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                size:
                    Math.random() * 2 + 1,

                speedX:
                    (Math.random() - 0.5) *
                    0.4,

                speedY:
                    (Math.random() - 0.5) *
                    0.4
            });
        }
    }

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(
            particle => {

                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;

                if (
                    particle.x < 0 ||
                    particle.x > canvas.width
                ) {
                    particle.speedX *= -1;
                }

                if (
                    particle.y < 0 ||
                    particle.y > canvas.height
                ) {
                    particle.speedY *= -1;
                }

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        );

        requestAnimationFrame(
            animateParticles
        );
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener(
        "resize",
        function() {

            resizeCanvas();
            createParticles();

        }
    );
}


/* =========================================================
   CARD TILT EFFECT
========================================================= */

function setupCardTilt() {

    const cards =
        document.querySelectorAll(
            ".card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            function(event) {

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
                    ((y - centerY) /
                        centerY) * -4;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            }
        );

        card.addEventListener(
            "mouseleave",
            function() {

                card.style.transform =
                    "";

            }
        );
    });
}


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }

        closeProfile();
        closePopup();
        closeGameModal();
        closeCheckout();
    }
);


/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderRentals();

        renderWishlist();

        loadProfile();

        setupLogin();

        setupHeroButton();

        setupNavbar();

        setupMobileMenu();

        setupLoader();

        setupParticles();

        setupCardAnimations();

        setupCardTilt();

    }
);
