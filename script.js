// ======================================================
// GAMERENT - CLEAN SCRIPT
// ======================================================


// ======================================================
// DATA
// ======================================================

let rentals = [];
let wishlist = [];

let selectedAvatar =
    localStorage.getItem("selectedAvatar") ||
    "https://i.pravatar.cc/150?img=12";

let selectedGame = "";


// ======================================================
// LOAD SAVED DATA
// ======================================================

function loadSavedData() {

    try {

        const savedRentals =
            localStorage.getItem("rentals");

        rentals = savedRentals
            ? JSON.parse(savedRentals)
            : [];

        if (!Array.isArray(rentals)) {
            rentals = [];
        }

    } catch {

        rentals = [];

    }


    try {

        const savedWishlist =
            localStorage.getItem("wishlist");

        wishlist = savedWishlist
            ? JSON.parse(savedWishlist)
            : [];

        if (!Array.isArray(wishlist)) {
            wishlist = [];
        }

    } catch {

        wishlist = [];

    }

}


// ======================================================
// RENTALS
// ======================================================

function rentGame(game, price) {

    const confirmRent = confirm(
        `Do you want to rent ${game} for ₹${price}?`
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


    alert(
        `🎮 ${game} added to your rentals!`
    );

}


// ======================================================
// REMOVE RENTAL
// ======================================================

function removeRental(index) {

    rentals.splice(index, 1);


    localStorage.setItem(
        "rentals",
        JSON.stringify(rentals)
    );


    renderRentals();

}


// ======================================================
// RENDER RENTALS
// ======================================================

function renderRentals() {

    const list =
        document.getElementById("rentalsList");

    const totalEl =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText =
            rentals.length;

    }


    if (!list) return;


    if (rentals.length === 0) {

        list.innerHTML = `
            <p class="empty-msg">
                Your cart is empty. Rent some games to see them here!
            </p>
        `;

        if (totalEl) {
            totalEl.innerText = "";
        }

        updateProfileStats();

        return;

    }


    let total = 0;


    list.innerHTML = "";


    rentals.forEach((item, index) => {

        total += Number(item.price);


        list.innerHTML += `

            <div class="card">

                <div class="info">

                    <h3>
                        ${item.game}
                    </h3>

                    <div class="bottom">

                        <span>
                            ₹${item.price}
                        </span>

                        <button
                            onclick="removeRental(${index})">
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    if (totalEl) {

        totalEl.innerText =
            `Total: ₹${total}`;

    }


    updateProfileStats();

}


// ======================================================
// WISHLIST
// ======================================================

function addWishlist(game) {

    if (wishlist.includes(game)) {

        alert(
            `${game} is already in your Wishlist ❤️`
        );

        return;

    }


    wishlist.push(game);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    renderWishlist();


    alert(
        `${game} added to Wishlist ❤️`
    );

}


// ======================================================
// REMOVE WISHLIST
// ======================================================

function removeWishlist(index) {

    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    renderWishlist();

}


// ======================================================
// RENDER WISHLIST
// ======================================================

function renderWishlist() {

    const list =
        document.getElementById("wishlistList");


    if (!list) return;


    if (wishlist.length === 0) {

        list.innerHTML = `
            <p class="empty-msg">
                Your wishlist is empty.
            </p>
        `;

        updateProfileStats();

        return;

    }


    list.innerHTML = "";


    wishlist.forEach((game, index) => {

        list.innerHTML += `

            <div class="card">

                <div class="info">

                    <h3>
                        ${game}
                    </h3>

                    <div class="bottom">

                        <button
                            onclick="removeWishlist(${index})">
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    updateProfileStats();

}


// ======================================================
// SEARCH
// ======================================================

function searchGame() {

    const input =
        document.getElementById("searchBox");


    if (!input) return;


    const search =
        input.value.toLowerCase().trim();


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


        if (title.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// ======================================================
// CATEGORY FILTER
// ======================================================

function filterCategory(category, button) {

    const cards =
        document.querySelectorAll(
            "#featured .card, #gameList .card"
        );


    cards.forEach(card => {

        const genres =
            (card.dataset.genre || "")
            .toLowerCase()
            .split(" ");


        if (
            category === "all" ||
            genres.includes(category.toLowerCase())
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    document
        .querySelectorAll(".cat-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    const gamesSection =
        document.getElementById("games");


    if (gamesSection) {

        gamesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ======================================================
// LOGIN
// ======================================================

function loginUser() {

    const name =
        prompt("Enter your username");


    if (!name || !name.trim()) return;


    const username =
        name.trim();


    localStorage.setItem(
        "username",
        username
    );


    updateLoginButton();


    updateProfile();


    alert(
        `Welcome ${username} 👋`
    );

}


// ======================================================
// UPDATE LOGIN BUTTON
// ======================================================

function updateLoginButton() {

    const login =
        document.querySelector(".login-btn");


    if (!login) return;


    const username =
        localStorage.getItem("username");


    if (username) {

        login.innerHTML =
            `<i class="fa-solid fa-user"></i> ${username}`;

    } else {

        login.innerHTML =
            `<i class="fa-solid fa-user"></i> Login`;

    }

}


// ======================================================
// PROFILE
// ======================================================

function openProfile() {

    const overlay =
        document.getElementById("profileOverlay");


    if (!overlay) return;


    overlay.style.display = "flex";


    const savedProfile =
        localStorage.getItem("profile");


    if (savedProfile) {

        try {

            const profile =
                JSON.parse(savedProfile);


            const input =
                document.getElementById(
                    "profileInputName"
                );


            const avatar =
                document.getElementById(
                    "selectedAvatar"
                );


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


        } catch {

            console.log(
                "Profile data could not be loaded."
            );

        }

    }

}


// ======================================================
// CLOSE PROFILE
// ======================================================

function closeProfile() {

    const overlay =
        document.getElementById("profileOverlay");


    if (overlay) {

        overlay.style.display = "none";

    }

}


// ======================================================
// SELECT AVATAR
// ======================================================

function selectAvatar(avatar, clickedImage) {

    selectedAvatar = avatar;


    const preview =
        document.getElementById(
            "selectedAvatar"
        );


    if (preview) {

        preview.src = avatar;

    }


    document
        .querySelectorAll(".avatar-list img")
        .forEach(img => {

            img.classList.remove("selected");

        });


    if (clickedImage) {

        clickedImage.classList.add("selected");

    }


    localStorage.setItem(
        "selectedAvatar",
        avatar
    );

}


// ======================================================
// SAVE PROFILE
// ======================================================

function saveProfile() {

    const input =
        document.getElementById(
            "profileInputName"
        );


    if (!input) {

        alert("Profile input not found.");

        return;

    }


    const name =
        input.value.trim();


    if (!name) {

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


    updateProfile();


    updateLoginButton();


    closeProfile();


    alert(
        "Profile saved successfully 🎮"
    );

}


// ======================================================
// UPDATE PROFILE PAGE
// ======================================================

function updateProfile() {

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
                profile.name || name;


            avatar =
                profile.avatar || avatar;

        } catch {}

    }


    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.innerText =
            name;

    }


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    if (profileAvatar) {

        profileAvatar.src =
            avatar;

    }


    const selectedAvatarImage =
        document.getElementById(
            "selectedAvatar"
        );


    if (selectedAvatarImage) {

        selectedAvatarImage.src =
            avatar;

    }


    updateProfileStats();

}


// ======================================================
// PROFILE STATS
// ======================================================

function updateProfileStats() {

    const rentalCount =
        document.getElementById(
            "rentedCount"
        );


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    const profileRentals =
        document.getElementById(
            "profileRentals"
        );


    const profileWishlist =
        document.getElementById(
            "profileWishlist"
        );


    if (rentalCount) {

        rentalCount.innerText =
            rentals.length;

    }


    if (wishlistCount) {

        wishlistCount.innerText =
            wishlist.length;

    }


    if (profileRentals) {

        profileRentals.innerText =
            rentals.length;

    }


    if (profileWishlist) {

        profileWishlist.innerText =
            wishlist.length;

    }


    const moneySpent =
        document.getElementById(
            "moneySpent"
        );


    if (moneySpent) {

        let total = 0;


        rentals.forEach(item => {

            total += Number(item.price);

        });


        moneySpent.innerText =
            `₹${total}`;

    }

}


// ======================================================
// EDIT PROFILE
// ======================================================

function editProfile() {

    openProfile();

}


// ======================================================
// LOGOUT
// ======================================================

function logoutUser() {

    localStorage.removeItem(
        "username"
    );

    localStorage.removeItem(
        "profile"
    );


    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.innerText =
            "Guest User";

    }


    updateLoginButton();


    alert(
        "Logged out successfully 👋"
    );

}


// ======================================================
// HERO BUTTON
// ======================================================

function exploreGames() {

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


// ======================================================
// GAME DETAILS MODAL
// ======================================================

function openGameModal(card) {

    if (!card) return;


    const titleElement =
        card.querySelector("h3");


    const genreElement =
        card.querySelector("p");


    const imageElement =
        card.querySelector("img");


    const priceElement =
        card.querySelector(
            ".bottom span"
        );


    if (!titleElement) return;


    const title =
        titleElement.innerText;


    const genre =
        genreElement
        ? genreElement.innerText
        : "Premium Game";


    const image =
        imageElement
        ? imageElement.src
        : "";


    const price =
        priceElement
        ? priceElement.innerText
        : "₹0";


    const modal =
        document.getElementById(
            "gameModal"
        );


    if (!modal) return;


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalGenre =
        document.getElementById(
            "modalGenre"
        );


    const modalImage =
        document.getElementById(
            "modalImage"
        );


    const modalPrice =
        document.getElementById(
            "modalPrice"
        );


    const modalRating =
        document.getElementById(
            "modalRating"
        );


    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    if (modalTitle) {

        modalTitle.innerText =
            title;

    }


    if (modalGenre) {

        modalGenre.innerText =
            genre;

    }


    if (modalImage) {

        modalImage.src =
            image;

    }


    if (modalPrice) {

        modalPrice.innerText =
            price;

    }


    if (modalRating) {

        modalRating.innerText =
            "⭐⭐⭐⭐⭐ 4.8";

    }


    if (modalDescription) {

        modalDescription.innerText =
            "Experience this amazing game with premium gameplay and unforgettable adventures.";

    }


    const rentButton =
        document.getElementById(
            "modalRentBtn"
        );


    if (rentButton) {

        rentButton.onclick = () => {

            const number =
                price.replace(/\D/g, "");


            rentGame(
                title,
                Number(number)
            );

        };

    }


    modal.style.display =
        "flex";

}


// ======================================================
// CLOSE GAME MODAL
// ======================================================

function closeGameModal() {

    const modal =
        document.getElementById(
            "gameModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ======================================================
// GAME POPUP
// ======================================================

function openPopup(name, desc, price) {

    selectedGame = name;


    const title =
        document.getElementById(
            "popupTitle"
        );


    const description =
        document.getElementById(
            "popupDesc"
        );


    const popup =
        document.getElementById(
            "gamePopup"
        );


    if (title) {

        title.innerText =
            name;

    }


    if (description) {

        description.innerText =
            `${desc} | Rental Price ₹${price}`;

    }


    if (popup) {

        popup.style.display =
            "flex";

    }

}


// ======================================================
// CLOSE GAME POPUP
// ======================================================

function closePopup() {

    const popup =
        document.getElementById(
            "gamePopup"
        );


    if (popup) {

        popup.style.display =
            "none";

    }

}


// ======================================================
// RENT FROM POPUP
// ======================================================

function rentPopupGame() {

    if (!selectedGame) return;


    const popupDescription =
        document.getElementById(
            "popupDesc"
        );


    let price = 0;


    if (popupDescription) {

        const match =
            popupDescription.innerText.match(
                /₹(\d+)/
            );


        if (match) {

            price =
                Number(match[1]);

        }

    }


    rentGame(
        selectedGame,
        price
    );


    closePopup();

}


// ======================================================
// CHECKOUT
// ======================================================

function openCheckout() {

    const checkout =
        document.getElementById(
            "checkout"
        );


    if (checkout) {

        checkout.scrollIntoView({
            behavior: "smooth"
        });

    }


    const items =
        document.getElementById(
            "checkoutItems"
        );


    const total =
        document.getElementById(
            "checkoutTotal"
        );


    if (!items || !total) return;


    if (rentals.length === 0) {

        items.innerHTML =
            "<p>No games selected.</p>";

        total.innerHTML =
            "Total: ₹0";

        return;

    }


    let sum = 0;


    items.innerHTML = "";


    rentals.forEach(game => {

        sum += Number(game.price);


        items.innerHTML += `

            <div class="checkout-item">

                <span>
                    ${game.game}
                </span>

                <span>
                    ₹${game.price}
                </span>

            </div>

        `;

    });


    total.innerHTML =
        `Total: ₹${sum}`;

}


// ======================================================
// PAYMENT
// ======================================================

function payNow() {

    if (rentals.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    alert(
        "✅ Payment Successful! Enjoy your games 🎮"
    );


    rentals = [];


    localStorage.removeItem(
        "rentals"
    );


    renderRentals();

}


// ======================================================
// MOBILE MENU
// ======================================================

function setupMobileMenu() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (!menuToggle || !navLinks) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}


// ======================================================
// NAVBAR SCROLL
// ======================================================

function setupNavbar() {

    const nav =
        document.querySelector("nav");


    if (!nav) return;


    window.addEventListener(
        "scroll",
        () => {

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


// ======================================================
// CARD CLICK
// ======================================================

function setupCards() {

    document
        .querySelectorAll(
            "#featured .card, #gameList .card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                function(e) {

                    if (
                        e.target.closest("button") ||
                        e.target.closest("a")
                    ) {

                        return;

                    }


                    openGameModal(this);

                }
            );

        });

}


// ======================================================
// HERO
// ======================================================

function setupHero() {

    const heroButton =
        document.querySelector(
            ".overlay button"
        );


    if (!heroButton) return;


    heroButton.addEventListener(
        "click",
        exploreGames
    );

}


// ======================================================
// CLOSE POPUPS BY CLICKING OUTSIDE
// ======================================================

function setupPopupClosing() {

    const profileOverlay =
        document.getElementById(
            "profileOverlay"
        );


    if (profileOverlay) {

        profileOverlay.addEventListener(
            "click",
            e => {

                if (
                    e.target ===
                    profileOverlay
                ) {

                    closeProfile();

                }

            }
        );

    }


    const gameModal =
        document.getElementById(
            "gameModal"
        );


    if (gameModal) {

        gameModal.addEventListener(
            "click",
            e => {

                if (
                    e.target ===
                    gameModal
                ) {

                    closeGameModal();

                }

            }
        );

    }


    const gamePopup =
        document.getElementById(
            "gamePopup"
        );


    if (gamePopup) {

        gamePopup.addEventListener(
            "click",
            e => {

                if (
                    e.target ===
                    gamePopup
                ) {

                    closePopup();

                }

            }
        );

    }

}


// ======================================================
// ESCAPE KEY
// ======================================================

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        e => {

            if (e.key === "Escape") {

                closeProfile();

                closeGameModal();

                closePopup();

            }

        }
    );

}


// ======================================================
// SMOOTH LINKS
// ======================================================

function setupSmoothLinks() {

    document
        .querySelectorAll("a")
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(e) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    if (href === "#") {

                        e.preventDefault();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }

                }
            );

        });

}


// ======================================================
// LOADER
// ======================================================

function setupLoader() {

    const loader =
        document.getElementById(
            "loader"
        );


    if (!loader) return;


    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                loader.style.display =
                    "none";

            }, 500);

        }
    );

}


// ======================================================
// PARTICLES
// ======================================================

function setupParticles() {

    const canvas =
        document.getElementById(
            "particles"
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    if (!ctx) return;


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    const particles = [];


    for (let i = 0; i < 80; i++) {

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
                (Math.random() - .5) * .5,

            speedY:
                (Math.random() - .5) * .5

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(p => {

            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "#00d4ff";


            ctx.fill();


            p.x += p.speedX;

            p.y += p.speedY;


            if (
                p.x < 0 ||
                p.x > canvas.width
            ) {

                p.speedX *= -1;

            }


            if (
                p.y < 0 ||
                p.y > canvas.height
            ) {

                p.speedY *= -1;

            }

        });


        requestAnimationFrame(
            animate
        );

    }


    animate();

}


// ======================================================
// INITIALIZE EVERYTHING
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedData();

        renderRentals();

        renderWishlist();

        updateProfile();

        updateLoginButton();

        setupMobileMenu();

        setupNavbar();

        setupCards();

        setupHero();

        setupPopupClosing();

        setupEscapeKey();

        setupSmoothLinks();

        setupLoader();

        setupParticles();

        console.log(
            "🎮 GameRent loaded successfully"
        );

    }
);

function openProfile() {

    const overlay =
        document.getElementById("profileOverlay");

    if (!overlay) return;

    overlay.style.display = "flex";

    const savedProfile =
        localStorage.getItem("profile");

    if (savedProfile) {

        try {

            const profile =
                JSON.parse(savedProfile);

            const input =
                document.getElementById(
                    "profileInputName"
                );

            const avatar =
                document.getElementById(
                    "selectedAvatar"
                );

            if (input) {
                input.value = profile.name || "";
            }

            if (avatar && profile.avatar) {

                avatar.src = profile.avatar;

                selectedAvatar =
                    profile.avatar;
            }

        } catch (error) {

            console.log(
                "Could not load profile."
            );

        }

    }
}


function closeProfile() {

    const overlay =
        document.getElementById(
            "profileOverlay"
        );

    if (overlay) {
        overlay.style.display = "none";
    }
}
