let productHTML = "";
products.forEach((product) => {
  productHTML += `
            <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart-button" onclick="addToCart(
            '${product.name}', '${product.id}')">Add to Cart</button>

            
        </div>
    `;
});
document.querySelector(".products-grid").innerHTML = productHTML;

let popUpTimeOut;

function addToCart(productName, productId) {
  const matchingItem = cart.find((item) => item.productName === productName);
  const productQuantityEl = document.querySelector(
    `.product-quantity-${productId}`
  ).value;
  const productQuantity = Number(productQuantityEl);

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {
    cart.push({
      productName: productName,
      quantity: productQuantity,
    });
  }

  if (popUpTimeOut) {
    clearTimeout(popUpTimeOut);
  }

  let cartQuantity = 0;
  cart.forEach((item) => (cartQuantity += item.quantity));

  const popUpAdded = document.querySelector(`.js-added-to-cart-${productId}`);
  popUpAdded.style.opacity = "1";
  const timeOutId = setTimeout(() => {
    popUpAdded.style.opacity = "0";
  }, 2000);

  popUpTimeOut = timeOutId;
  console.log(popUpTimeOut);
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}
