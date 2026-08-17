if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeCoupon = localStorage.getItem("coupon") || "";

const cartItems = document.querySelector(".cart-items");
const summaryValues = document.querySelectorAll(".order-summary__value");
const totalElement = document.querySelector(".order-summary__total-value");
const couponForm = document.querySelector(".order-summary__coupon");
const couponInput = document.querySelector("#coupon-code");
const checkoutButton = document.querySelector(".order-summary__checkout");


function displayCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `
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
            >
                🗑
            </button>

            <div class="cart-item__quantity">
                <button
                    type="button"
                    class="cart-item__quantity-button decrease"
                    data-id="${product.id}"
                >
                    -
                </button>
                <span class="cart-item__quantity-value">
                    ${cartItem.quantity}
                </span>

                <button
                    type="button"
                    class="cart-item__quantity-button increase"
                    data-id="${product.id}">
                    +
                </button>

            </div>
        `;
        cartItems.appendChild(item);

    });

    addCartEvents();
    updateSummary();
}



function addCartEvents() {
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");
    const removeButtons = document.querySelectorAll(".cart-item__remove");

    increaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const item = cart.find((cartItem) => cartItem.id === id);
            item.quantity++;
            saveCart();
        });
    });

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const item = cart.find((cartItem) => cartItem.id === id);
            if (item.quantity > 1) {
                item.quantity--;
            }
            saveCart();
        });

    });


    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            cart = cart.filter((cartItem) => cartItem.id !== id);
            saveCart();
        });

    });

}

function saveCart() {
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();

}

function updateSummary() {
    let subtotal = 0;
    cart.forEach((cartItem) => {
        const product = products.find((item) => item.id === cartItem.id);
        if (product) {
            subtotal +=product.price *cartItem.quantity;

        }

    });

    let discountRate = 0;
    if (activeCoupon === "SAVE10") {
        discountRate = 0.10;

    }
    if (activeCoupon === "SAVE20") {
        discountRate = 0.20;

    }
    const discount = subtotal * discountRate;
    const deliveryFee = cart.length > 0 ? 15 : 0;
    const total = subtotal - discount + deliveryFee;


    summaryValues[0].textContent = `$${subtotal.toFixed(0)}`;
    summaryValues[1].textContent = `-$${discount.toFixed(0)}`;
    summaryValues[2].textContent = `$${deliveryFee}`;
    totalElement.textContent = `$${total.toFixed(0)}`;

}



couponForm.addEventListener("submit",(event) => {
        event.preventDefault();
        const coupon = couponInput.value.trim().toUpperCase();
        if (coupon === "SAVE10" || coupon === "SAVE20"
        ) {
            activeCoupon = coupon;
            localStorage.setItem("coupon",activeCoupon);
            updateSummary();
            alert(`${coupon} applied successfully.`);
        } else {
            alert(
                "Invalid coupon code. Use SAVE10 or SAVE20."
            );

        }

    }
);



checkoutButton.addEventListener(
    "click",
    () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        const popup = document.createElement("div");
        popup.className ="checkout-popup";
        popup.innerHTML = `
            <div class="checkout-popup__content">
                <h2>✓</h2>
                <h3>
                    Order Successful!
                </h3>
                <p>
                    Your order has been placed successfully.
                </p>
                <button
                    type="button"
                    class="checkout-popup__button">
                    OK
                </button>
            </div>
        `;
        document.body.appendChild(popup);

        popup.querySelector(".checkout-popup__button").addEventListener("click",() => {
            cart = [];activeCoupon = "";
             localStorage.removeItem("cart");
                    localStorage.removeItem("coupon");
                    popup.remove();
                    displayCart();
                }
            );

    }
);


displayCart();