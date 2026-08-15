// =========================================
// PRODUCT NAVIGATION
// =========================================

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
    card.addEventListener("click", () => {
        const productId = card.id;

        window.location.href = `product.html?id=${productId}`;
    });
});


// =========================================
// PRODUCT DETAILS PAGE
// =========================================

const productImage = document.querySelector("#product-image");

if (productImage) {

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get("id"));

    // Find the selected product
    const product = products.find((item) => item.id === productId);

    // Get product elements
    const productName = document.querySelector("#product-name");
    const productPrice = document.querySelector("#product-price");
    const productStars = document.querySelector("#product-stars");
    const productRating = document.querySelector("#product-rating");
    const productDescription = document.querySelector("#product-description");

    const quantityValue = document.querySelector("#quantity-value");
    const decreaseButton = document.querySelector("#quantity-decrease");
    const increaseButton = document.querySelector("#quantity-increase");
    const addToCartButton = document.querySelector("#add-to-cart");


    // =========================================
    // INVALID PRODUCT
    // =========================================

    if (!product) {

        document.querySelector(".product-details").innerHTML = `
            <div class="product-details__not-found">
                <h2>Product Not Found</h2>
                <p>The product you are looking for does not exist.</p>
                <a href="index.html">Back to Shop</a>
            </div>
        `;

    } else {

        // =========================================
        // DISPLAY PRODUCT
        // =========================================

        productImage.src = product.image;
        productImage.alt = product.name;

        productName.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        productRating.textContent = `${product.rating}/5`;
        productDescription.textContent = product.description;

        const fullStars = Math.floor(product.rating);

        productStars.textContent =
            "★".repeat(fullStars) +
            "☆".repeat(5 - fullStars);


        // =========================================
        // QUANTITY
        // =========================================

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


        // =========================================
        // ADD TO CART
        // =========================================

        addToCartButton.addEventListener("click", () => {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");
        });
    }
}