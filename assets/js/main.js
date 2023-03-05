let myData = [
  {
    id: 1,
    product_name: "Gold Coin",
    product_price: "112.55",
    product_image: "Gold-Coin.jpg",
    added_to_cart: false,
  },
  {
    id: 2,
    product_name: "Silver Coin",
    product_price: "100.99",
    product_image: "Silver-Coin.jpg",
    added_to_cart: false,
  },
  {
    id: 3,
    product_name: "Platinum Coin",
    product_price: "93.27",
    product_image: "Platinum-Coin.jpg",
    added_to_cart: false,
  },
  {
    id: 4,
    product_name: "Osmium Coin",
    product_price: "83.14",
    product_image: "Osmium-Coin.jpg",
    added_to_cart: false,
  },
  {
    id: 5,
    product_name: "Rhodium Coin",
    product_price: "77.52",
    product_image: "Rhodium-Coin.jpg",
    added_to_cart: false,
  },
  {
    id: 6,
    product_name: "Iridium Coin",
    product_price: "65.44",
    product_image: "Iridium-Coin.jpg",
    added_to_cart: false,
  },
];

// start dealing with Data
localStorage.setItem("products", JSON.stringify(myData));
let myDataStorage = JSON.parse(localStorage.getItem("products"));
let productsId = document.getElementById("productsId");
myDataStorage.forEach((e) => {
  productsId.innerHTML += `<div class="product">
  <div class="productImgPrice">
      <figure><img src="./assets/imgs/${e.product_image}" alt="" width="200px" height="150px"></figure>
      <div class="productDetails">
          <h2>${e.product_name}</h2>
          <p>Price : ${e.product_price} EGP</p>
      </div>
  </div>
  <div class="myBtns">
      <button class="addToCart" id="addToCart${e.id}" onClick="addToCart(this)">Add To Cart</button>
      <button class="removeToCart dispNone" id="removeToCart${e.id}" onClick="removeToCart(this)">Remove From Cart</button>
      <button class="quickView" id="quickView${e.id}" onClick="quickView(this)">Quick View</button>
  </div>
</div>`;
});
if (localStorage.getItem("storedData") == null) {
  localStorage.setItem("storedData", "[]");
}
let storedData = JSON.parse(localStorage.getItem("storedData"));
// end dealing with Data

// start Handle Add & Delete button
if (localStorage.getItem("dispNone") == null) {
  localStorage.setItem("dispNone", "[]");
}
let dispNone = JSON.parse(localStorage.getItem("dispNone"));
dispNone.forEach((e) => {
  document.getElementById("addToCart" + e).classList.add("dispNone");
  document.getElementById("removeToCart" + e).classList.remove("dispNone");
});
// end Handle Add & Delete button

// start adding to chart
function addToCart(product) {
  let numId = product.id.slice(9, product.id.length);
  myDataStorage.forEach((e) => {
    if (e.id == numId) {
      e.added_to_cart = true;
      storedData.push(e);
      dispNone.push(numId);
    }
  });
  localStorage.setItem("storedData", JSON.stringify(storedData));
  cartNumId.innerText = storedData.length;

  localStorage.setItem("dispNone", JSON.stringify(dispNone));
  dispNone.forEach((e) => {
    document.getElementById("addToCart" + e).classList.add("dispNone");
    document.getElementById("removeToCart" + e).classList.remove("dispNone");
  });

  window.location.reload();
}
// end adding to chart

// start removing from chart
let myDataChart = JSON.parse(localStorage.getItem("storedData"));
let chartProduct = document.getElementById("chartProduct");
function removeToCart(product) {
  let numId = product.id.slice(12, product.id.length);
  dispNone.forEach((e) => {
    if (e == numId) {
      dispNone.splice(dispNone.indexOf(e), 1);
      document.getElementById("addToCart" + e).classList.remove("dispNone");
      document.getElementById("removeToCart" + numId).classList.add("dispNone");
      myDataChart.forEach((e) => {
        if (e.id == numId) {
          console.log(myDataChart);
          myDataChart.splice(myDataChart.indexOf(e), 1);
          localStorage.setItem("storedData", JSON.stringify(myDataChart));
          window.location.reload();
        }
      });
    }
  });
  localStorage.setItem("dispNone", JSON.stringify(dispNone));
}
// end removing from chart

// start handle sum
localStorage.setItem("sum", "0");
let sumPrice = JSON.parse(localStorage.getItem("sum"));
if (storedData.length != 0) {
  for (let i = 0; i < storedData.length; i++) {
    sumPrice += Number(storedData[i]["product_price"]);
  }
  document.getElementById(
    "chartProductSum"
  ).innerHTML += `<h3>Total Price : ${sumPrice.toFixed(2)} EGP</h3>`;
}
// end handle sum

// start set in chart
if (localStorage.getItem("storedData") != null && myDataChart != null) {
  myDataChart.forEach((e) => {
    chartProduct.innerHTML += `<div class="product">
    <div class="productImgPrice">
        <figure><img src="./assets/imgs/${e.product_image}" alt="" width="200px" height="150px"></figure>
        <div class="productDetails">
            <h2>${e.product_name}</h2>
            <p>Price : ${e.product_price} EGP</p>
        </div>
    </div>
  </div>`;
  });
  if (storedData.length == 0) {
    chartProduct.innerText = "";
  }
}
// end set in chart

// start handle icon
let cartNumId = document.getElementById("cartNumId");
if (localStorage.getItem("storedData") != null) {
  cartNumId.innerText = storedData.length;
  if (storedData.length == 0) {
    cartNumId.innerText = "";
  }
}

let cartProductsId = document.getElementById("cartProductsId");
function chartIcon() {
  cartProductsId.classList.toggle("dispNone");
}
// end handle icon

// start handle Modal
let myModalId = document.getElementById("myModalId");
function quickView(product) {
  let numId = product.id.slice(9, product.id.length);
  myDataStorage.forEach((e) => {
    if (e.id == numId) {
      myModalId.innerHTML = `<div class="myProductModal">
    <h1 class="titleHeading" onClick="closeBtn()">X</h1>
    <div class="product">
        <div class="productImgPrice">
            <figure><img src="./assets/imgs/${e.product_image}" alt="" width="200px" height="150px"></figure>
            <div class="productDetails">
                <h2>${e.product_name}</h2>
                <p>Price : ${e.product_price} EGP</p>
            </div>
        </div>
      </div>
  </div>`;
    }
  });
  myModalId.classList.remove("dispNone");
}
function closeBtn() {
  myModalId.classList.add("dispNone");
}
// end handle Modal