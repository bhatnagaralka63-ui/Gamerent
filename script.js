// ===============================
// My Rentals Cart
// ===============================
let rentals = [];

function rentGame(game, price) {
    let confirmRent = confirm(
        `Do you want to rent ${game} for ₹${price}?`
    );
    if(confirmRent){
        rentals.push({ game, price });
        localStorage.setItem("rentals", JSON.stringify(rentals));
        renderRentals();
        alert(
            `🎮 ${game} added to your rentals!`
        );
    }
}

function removeRental(index){
    rentals.splice(index, 1);
    localStorage.setItem("rentals", JSON.stringify(rentals));
    renderRentals();
}

function renderRentals(){
    let list = document.getElementById("rentalsList");
    let totalEl = document.getElementById("cartTotal");
    let cartCount = document.getElementById("cartCount");

    cartCount.innerText = rentals.length;

    if(rentals.length === 0){
        list.innerHTML = `<p class="empty-msg" id="emptyMsg">Your cart is empty. Rent some games to see them here!</p>`;
        totalEl.innerText = "";
        return;
    }

    let total = 0;
    list.innerHTML = "";
    rentals.forEach((item, index)=>{
        total += item.price;
        list.innerHTML += `
            <div class="card">
                <div class="info">
                    <h3>${item.game}</h3>
                    <div class="bottom">
                        <span>₹${item.price}</span>
                        <button onclick="removeRental(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalEl.innerText = `Total: ₹${total}`;
}
// ===============================
// Search Games
// ===============================
function searchGame(){
    let input = document
        .getElementById("searchBox")
        .value
        .toLowerCase();
    let cards =
        document.querySelectorAll(".card");
    cards.forEach(card=>{
        let title =
            card.querySelector("h3")
            .innerText
            .toLowerCase();
        if(title.includes(input)){
            card.style.display="block";
        }
        else{
            card.style.display="none";
        }
    });
}
// ===============================
// Login Button
// ===============================
let login = document.querySelector(".login-btn");

// Load saved username
const savedUser = localStorage.getItem("username");
if (savedUser) {
    login.innerText = savedUser;
}

login.addEventListener("click", () => {
    let name = prompt("Enter your username");

    if (name) {
        localStorage.setItem("username", name); // Save username
        login.innerText = name;                 // Update button
        alert(`Welcome ${name} 👋`);
    }
});
// ===============================
// Smooth Scroll
// ===============================
document.querySelectorAll("a").forEach(anchor=>{
anchor.addEventListener("click",function(e){
if(this.getAttribute("href")=="#"){
e.preventDefault();
window.scrollTo({
top:0,
behavior:"smooth"
});
}
});
});
// ===============================
// Navbar Shadow
// ===============================
window.addEventListener("scroll", () => {

    let nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
// ===============================
// Wishlist
// ===============================
let wishlist = [];

function addWishlist(game){

    if(wishlist.includes(game)){
        alert(game + " is already in your Wishlist ❤️");
        return;
    }

    wishlist.push(game);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

    alert(game + " added to Wishlist ❤️");
}

function removeWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();
}

function renderWishlist(){

    const list = document.getElementById("wishlistList");

    if(!list) return;

    if(wishlist.length === 0){
        list.innerHTML =
        `<p class="empty-msg">Your wishlist is empty.</p>`;
        return;
    }

    list.innerHTML = "";

    wishlist.forEach((game,index)=>{

        list.innerHTML += `
            <div class="card">
                <div class="info">
                    <h3>${game}</h3>

                    <div class="bottom">
                        <button onclick="removeWishlist(${index})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;

    });

}

// ===============================
// Load Wishlist
// ===============================
window.onload=()=>{
let saved=
localStorage.getItem("wishlist");
if(saved){
wishlist=
JSON.parse(saved);
console.log(wishlist);
}

let savedRentals = localStorage.getItem("rentals");
if(savedRentals){
    rentals = JSON.parse(savedRentals);
}
renderWishlist();
renderRentals();
}
// ===============================
// Hero Button
// ===============================
let heroBtn=document.querySelector(".overlay button");
heroBtn.addEventListener("click",()=>{
document.querySelector("#featured").scrollIntoView({
behavior:"smooth"
});
});
// ===============================
// Card Animation
// ===============================
const cards=document.querySelectorAll(".card");
cards.forEach((card,index)=>{
card.style.opacity="0";
card.style.transform="translateY(40px)";
setTimeout(()=>{
card.style.transition=".6s";
card.style.opacity="1";
card.style.transform="translateY(0)";
},index*150);
});
// ===============================
// Category Filter
// ===============================
function filterCategory(genre, btn){

    let cards = document.querySelectorAll("#featured .card, #gameList .card");

    cards.forEach(card => {

        let cardGenre = card.dataset.genre || "";

        if (genre === "all" || cardGenre.includes(genre)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

    document.querySelectorAll(".cat-card").forEach(c => {
        c.classList.remove("active");
    });

    btn.classList.add("active");

    document.querySelector("#games").scrollIntoView({
        behavior: "smooth"
    });

}

// ===============================
// Console Message
// ===============================
console.log("🎮 Welcome to GameRent");

// ===============================
// Mobile Menu
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

}
// ===============================
// User Profile
// ===============================

function loadProfile(){

    let username =
    localStorage.getItem("username");


    if(username){

        document.getElementById("profileName")
        .innerText = username;

    }


    let rented =
    JSON.parse(localStorage.getItem("rentals")) || [];


    let wish =
    JSON.parse(localStorage.getItem("wishlist")) || [];


    let total = 0;


    rented.forEach(item=>{

        total += item.price;

    });


    document.getElementById("rentedCount")
    .innerText = rented.length;


    document.getElementById("wishlistCount")
    .innerText = wish.length;


    document.getElementById("moneySpent")
    .innerText = "₹" + total;

}


function logoutUser(){

    localStorage.removeItem("username");

    document.getElementById("profileName")
    .innerText="Guest User";

    alert("Logged out successfully 👋");

}


window.addEventListener("load",loadProfile);
// ===============================
// Game Details Popup
// ===============================

const modal = document.getElementById("gameModal");

function openGameModal(card){

    let title = card.querySelector("h3").innerText;
    let genre = card.querySelector("p").innerText;
    let image = card.querySelector("img").src;
    let price = card.querySelector(".bottom span").innerText;

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalGenre").innerText = genre;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalPrice").innerText = price;


    let ratings = {
        "Resident Evil 4":"⭐⭐⭐⭐⭐ 4.8",
        "Elden Ring":"⭐⭐⭐⭐⭐ 4.9",
        "Cyberpunk 2077":"⭐⭐⭐⭐ 4.5",
        "EA Sports FC 25":"⭐⭐⭐⭐ 4.4",
        "GTA V":"⭐⭐⭐⭐⭐ 4.9",
        "Red Dead Redemption 2":"⭐⭐⭐⭐⭐ 4.9"
    };


    document.getElementById("modalRating").innerText =
    ratings[title] || "⭐⭐⭐⭐ 4.5";


    document.getElementById("modalDescription").innerText =
    "Experience this amazing game with premium gameplay and unforgettable adventures.";


    document.getElementById("modalRentBtn").onclick = () => {

        let number = price.replace(/\D/g,'');

        rentGame(title, Number(number));

    };


    modal.style.display="flex";

}


function closeGameModal(){

    modal.style.display="none";

}


// Click any game card

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("click",function(e){

        // prevent button clicks opening popup
        if(e.target.tagName==="BUTTON"){
            return;
        }

        openGameModal(this);

    });

});
// ===============================
// Checkout
// ===============================

function openCheckout(){

    document.querySelector("#checkout")
    .scrollIntoView({
        behavior:"smooth"
    });


    let items=document.getElementById("checkoutItems");
    let total=document.getElementById("checkoutTotal");

    if(rentals.length===0){

        items.innerHTML="<p>No games selected.</p>";
        total.innerHTML="Total: ₹0";
        return;

    }


    let sum=0;
    items.innerHTML="";


    rentals.forEach(game=>{

        sum += game.price;

        items.innerHTML += `
        <div class="checkout-item">

        <span>${game.game}</span>

        <span>₹${game.price}</span>

        </div>
        `;

    });


    total.innerHTML=`Total: ₹${sum}`;

}



function payNow(){

    if(rentals.length===0){

        alert("Your cart is empty!");

        return;

    }


    alert("✅ Payment Successful! Enjoy your games 🎮");


    rentals=[];

    localStorage.removeItem("rentals");

    renderRentals();

}
// ===============================
// Loader
// ===============================

window.addEventListener("load",()=>{

    document.getElementById("loader")
    .style.display="none";

});
// ===============================
// Particle Background
// ===============================

const canvas =
document.getElementById("particles");

const ctx =
canvas.getContext("2d");


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


let particles=[];


for(let i=0;i<100;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*3,

speedX:(Math.random()-.5),

speedY:(Math.random()-.5)

});

}



function animateParticles(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);


particles.forEach(p=>{


ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);


ctx.fillStyle="#00d4ff";

ctx.fill();


p.x+=p.speedX;

p.y+=p.speedY;



if(p.x<0 || p.x>canvas.width)
p.speedX*=-1;


if(p.y<0 || p.y>canvas.height)
p.speedY*=-1;


});


requestAnimationFrame(
animateParticles
);

}


animateParticles();
// ===============================
// Game Popup
// ===============================


let selectedGame="";


function openPopup(name,desc,price){

selectedGame=name;


document.getElementById("popupTitle")
.innerText=name;


document.getElementById("popupDesc")
.innerText=
desc+
" | Rental Price ₹"+
price;


document.getElementById("gamePopup")
.style.display="flex";


}



function closePopup(){

document.getElementById("gamePopup")
.style.display="none";

}



function rentPopupGame(){

alert(
selectedGame+
" added to rentals 🎮"
);

closePopup();

}
// ===============================
// 3D Card Tilt Effect
// ===============================

const tiltCards = document.querySelectorAll(".card");

tiltCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;


        const centerX = rect.width / 2;
        const centerY = rect.height / 2;


        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;


        card.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    });


    card.addEventListener("mouseleave", ()=>{

        card.style.transform =
        "rotateX(0) rotateY(0) scale(1)";

    });

});
// ===============================
// User Profile
// ===============================


function editProfile(){

let name = prompt(
"Enter your username"
);


if(name){

localStorage.setItem(
"username",
name
);


loadProfile();

}

}



function loadProfile(){

let name =
localStorage.getItem("username");


if(name){

document.getElementById(
"profileName"
).innerText=name;

}



document.getElementById(
"profileRentals"
).innerText =
rentals.length;



document.getElementById(
"profileWishlist"
).innerText =
wishlist.length;


}



window.addEventListener("load",()=>{

loadProfile();

});
// ===============================
// Profile System
// ===============================

let selectedAvatar = "https://i.pravatar.cc/150?img=12";


// Open Profile Popup
function openProfile(){

    document.getElementById("profileOverlay").style.display="flex";


    // Load existing profile
    let savedProfile = localStorage.getItem("profile");


    if(savedProfile){

        let profile = JSON.parse(savedProfile);

        document.getElementById("profileName").value = profile.name;

        document.getElementById("selectedAvatar").src = profile.avatar;

        selectedAvatar = profile.avatar;

    }

}


// Close Profile Popup
function closeProfile(){

    document.getElementById("profileOverlay").style.display="none";

}


// Change Avatar Preview
function selectAvatar(avatar){

    selectedAvatar = avatar;

    document.getElementById("selectedAvatar").src = avatar;


    document.querySelectorAll(".avatar-list img")
    .forEach(img=>{
        img.classList.remove("selected");
    });


    event.target.classList.add("selected");

}



// Save Profile
function saveProfile(){

    let name = document.getElementById("profileName").value;


    if(name.trim()===""){

        alert("Please enter a username");

        return;

    }


    let profile = {

        name:name,

        avatar:selectedAvatar

    };


    localStorage.setItem(
        "profile",
        JSON.stringify(profile)
    );


    updateProfileButton();


    closeProfile();


    alert("Profile Created 🎮");

}



// Update Navbar Profile Button
function updateProfileButton(){

    let savedProfile = localStorage.getItem("profile");

    let profileBtn = document.querySelector(".profile-btn");


    if(savedProfile){

        let profile = JSON.parse(savedProfile);


        profileBtn.innerHTML = `

        <img src="${profile.avatar}">

        ${profile.name}

        `;

    }

}



// Load Profile When Website Opens
window.addEventListener("load",()=>{

    updateProfileButton();

});
