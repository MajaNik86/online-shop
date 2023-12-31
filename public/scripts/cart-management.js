const addToCartBtnElement = document.querySelector("#product-details button");
const cartBadgeElements = document.querySelectorAll('.nav-items .badge')

async function addToCart() {
  const productId = addToCartBtnElement.dataset.productid;
  const csrfToken = addToCartBtnElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf:csrfToken 
      }), 
      headers: {
        "Content-Type": "application/json",
      }, 
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Sometning went wrong");
    return;
  }


  const responseData = await response.json() 

  const newTotalQuantity = responseData.newTotalItems;

for (const cartBadgeElement of cartBadgeElements){
  cartBadgeElement.textContent = newTotalQuantity;
}
}

addToCartBtnElement.addEventListener("click", addToCart);
