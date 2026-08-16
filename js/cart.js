// =========================================
// CART
// =========================================

// Get cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Get products from product.js
const cartItemsContainer = document.querySelector(".cart__items");


// Order summary elements
const subtotalElement = document.querySelector(
    ".order-summary__row:nth-child(1) .order-summary__value"
);

const discountElement = document.querySelector(
    ".order-summary__value--discount"
);

const deliveryElement = document.querySelector(
    ".order-summary__row:nth-child(3) .order-summary__value"
);

const totalElement = document.querySelector(
    ".order-summary__total-value"
);


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="cart__empty">
                Your cart is empty.
            </p>
        `;

        updateSummary();
        return;
    }


    cart.forEach((cartItem) => {

        const product = products.find(
            (item) => item.id === cartItem.id
        );

        if (!product) {
            return;
        }


        const item = document.createElement("article");

        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item__image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>

            <div class="cart-item__details">

                <h2 class="cart-item__name">
                    ${product.name}
                </h2>

                <p class="cart-item__option">
                    Price: $${product.price}
                </p>

                <p class="cart-item__price">
                    $${product.price * cartItem.quantity}
                </p>

            </div>

            <button
                type="button"
                class="cart-item__remove"
                data-id="${product.id}"
                aria-label="Remove ${product.name}"
            >
                🗑
            </button>

            <div class="cart-item__quantity">

                <button
                    type="button"
                    class="cart-item__quantity-button decrease"
                    data-id="${product.id}"
                >
                    −
                </button>

                <span class="cart-item__quantity-value">
                    ${cartItem.quantity}
                </span>

                <button
                    type="button"
                    class="cart-item__quantity-button increase"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>
        `;


        cartItemsContainer.appendChild(item);

    });


    addCartEvents();

    updateSummary();
}


// =========================================
// QUANTITY + REMOVE BUTTONS
// =========================================

function addCartEvents() {

    const increaseButtons =
        document.querySelectorAll(".increase");

    const decreaseButtons =
        document.querySelectorAll(".decrease");

    const removeButtons =
        document.querySelectorAll(".cart-item__remove");


    increaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const item = cart.find(
                (cartItem) => cartItem.id === id
            );

            item.quantity++;

            saveCart();

        });

    });


    decreaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const item = cart.find(
                (cartItem) => cartItem.id === id
            );

            if (item.quantity > 1) {
                item.quantity--;
            }

            saveCart();

        });

    });


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            cart = cart.filter(
                (cartItem) => cartItem.id !== id
            );

            saveCart();

        });

    });

}


// =========================================
// UPDATE ORDER SUMMARY
// =========================================

function updateSummary() {

    let subtotal = 0;

    cart.forEach((cartItem) => {

        const product = products.find(
            (item) => item.id === cartItem.id
        );

        if (product) {
            subtotal += product.price * cartItem.quantity;
        }

    });


    const discount = subtotal * 0.20;

    const deliveryFee = cart.length > 0 ? 15 : 0;

    const total = subtotal - discount + deliveryFee;


    subtotalElement.textContent =
        `$${subtotal.toFixed(0)}`;

    discountElement.textContent =
        `-$${discount.toFixed(0)}`;

    deliveryElement.textContent =
        `$${deliveryFee}`;

    totalElement.textContent =
        `$${total.toFixed(0)}`;
}


// =========================================
// SAVE CART
// =========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// =========================================
// COUPON
// =========================================

const couponForm =
    document.querySelector(".order-summary__coupon");

couponForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const couponInput =
        document.querySelector("#coupon-code");

    const coupon = couponInput.value.trim().toUpperCase();

    if (coupon === "SAVE20") {

        alert("Coupon applied!");

    } else {

        alert("Invalid coupon code.");

    }

});


// =========================================
// INITIAL DISPLAY
// =========================================

displayCart();