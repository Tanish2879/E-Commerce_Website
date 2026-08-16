// PRODUCT NAVIGATION

const productCards = document.querySelectorAll(".product-card");
const isLoggedIn = localStorage.getItem("isLoggedIn");

productCards.forEach((card) => {

    card.addEventListener("click", () => {

        if (isLoggedIn !== "true") {
            window.location.href = "login.html";
            return;
        }

        window.location.href = `product.html?id=${card.id}`;
    });

});


// PRODUCT DETAILS PAGE

const productImage = document.querySelector("#product-image");

if (productImage) {

    // Protect product page
    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    } else {

        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = Number(urlParams.get("id"));

        // Find product
        const product = products.find((item) => item.id === productId);


        // Get HTML elements
        const productName = document.querySelector("#product-name");
        const productPrice = document.querySelector("#product-price");
        const productStars = document.querySelector("#product-stars");
        const productRating = document.querySelector("#product-rating");
        const productDescription =
            document.querySelector("#product-description");

        const quantityValue =
            document.querySelector("#quantity-value");

        const decreaseButton =
            document.querySelector("#quantity-decrease");

        const increaseButton =
            document.querySelector("#quantity-increase");

        const addToCartButton =
            document.querySelector("#add-to-cart");


        // Invalid product

        if (!product) {

            document.querySelector(".product-details").innerHTML = `
                <div class="product-details__not-found">
                    <h2>Product Not Found</h2>
                    <p>The product you are looking for does not exist.</p>
                    <a href="index.html">Back to Shop</a>
                </div>
            `;

        } else {

            // Display product

            productImage.src = product.image;
            productImage.alt = product.name;

            productName.textContent = product.name;
            productPrice.textContent = `$${product.price}`;
            productRating.textContent = `${product.rating}/5`;

            productDescription.textContent =
                product.description;


            // Display stars

            const fullStars = Math.floor(product.rating);

            productStars.textContent =
                "★".repeat(fullStars) +
                "☆".repeat(5 - fullStars);


            // Quantity

            let quantity = 1;

            quantityValue.textContent = quantity;


            increaseButton.addEventListener("click", () => {

                quantity++;

                quantityValue.textContent = quantity;

            });


            decreaseButton.addEventListener("click", () => {

                if (quantity > 1) {

                    quantity--;

                    quantityValue.textContent = quantity;

                }

            });


            // Add to cart

            addToCartButton.addEventListener("click", () => {

                let cart =
                    JSON.parse(localStorage.getItem("cart")) || [];


                const existingProduct = cart.find(
                    (item) => item.id === product.id
                );


                if (existingProduct) {

                    existingProduct.quantity += quantity;

                } else {

                    cart.push({
                        id: product.id,
                        quantity: quantity
                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                alert("Product added to cart!");

            });

        }
    }
}