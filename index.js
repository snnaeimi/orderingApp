import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-container");
const totalPriceEl = document.getElementById("price-data");

/*
<div class="itemMenu">
    <p class="order-img">🍕</p>
    <div class="order-description">
        <h3>Pizza</h3>
        <p class="ingredient">pepperoni, mushrom, mozarella</p>
        <p>$14</p> 
    </div>
                
    <button class="addBtn">+</button>              
</div> 
            */

/*
    <h2>Your Order</h2>
        <div class="order-price">
            <div class="customer-order">
                <p>Pizza</p>
                <button class="removeOrderBtn">remove</button>
                <p>$14</p>
            </div>
            <div class="total-price">
                <p>Total price: </p>
                <p>$26</p>
            </div>
        </div>
*/

function renderMenu(menuArr) {
  for (let i = 0; i < menuArr.length; i++) {
    menuEl.innerHTML += `
                <div class="itemMenu">
                    <p class="order-img">${menuArr[i].emoji}</p>
                    <div class="order-description">
                        <h3>${menuArr[i].name}</h3>
                        <p class="ingredient">${menuArr[i].ingredients}</p>
                        <p>$${menuArr[i].price}</p> 
                    </div>
                                
                    <button class="addBtn" id="addBtn" data-food-id=${menuArr[i].id}>+</button>              
                </div> `;
  }
  return menuEl;
}

// { "0": 2, "1": 1, "2": 21 }
const order = {};

function addOrder(e) {
  const orderedFoodId = Number(e.target.dataset.foodId);

  const orderedFood = menuArray.find(
    (menuItem) => menuItem.id === orderedFoodId
  );

  if (order[orderedFood.id] === undefined) {
    order[orderedFood.id] = 1;
  } else {
    order[orderedFood.id] += 1;
  }

  let totalPrice = 0;

  const orderedFoods = Object.entries(order).map(([foodId, foodCount]) => {
    const food = menuArray.find((menuItem) => menuItem.id === Number(foodId));

    const foodTotalPrice = food.price * foodCount;

    totalPrice += foodTotalPrice;

    return `
                <div class="customer-order">
                    <p>${food.name}</p>
                    <button class="removeOrderBtn" data-food-id="${food.id}" id="removeOrderBtn">remove</button>
                    <p>$${foodTotalPrice}</p>
                </div>
    `;
  });

  totalPriceEl.innerHTML = `
                            <h2>Your Order</h2>
                            <div class="order-price">
                                ${orderedFoods.join("\n")}
                                <div class="total-price">
                                    <p>Total price: </p>
                                    <p>$${totalPrice}</p>
                                </div>
                            </div> 
                        `;

  return totalPriceEl;
}

function removeOrder(e) {
  const orderedFoodId = Number(e.target.dataset.foodId);

  delete order[orderedFoodId];

  let totalPrice = 0;

  const orderedFoods = Object.entries(order).map(([foodId, foodCount]) => {
    const food = menuArray.find((menuItem) => menuItem.id === Number(foodId));

    const foodTotalPrice = food.price * foodCount;

    totalPrice += foodTotalPrice;

    return `
                <div class="customer-order">
                    <p>${food.name}</p>
                    <button class="removeOrderBtn" data-food-id="${food.id}" id="removeOrderBtn">remove</button>
                    <p>$${foodTotalPrice}</p>
                </div>
    `;
  });

  totalPriceEl.innerHTML = `
                            <h2>Your Order</h2>
                            <div class="order-price">
                                ${orderedFoods.join("\n")}
                                <div class="total-price">
                                    <p>Total price: </p>
                                    <p>$${totalPrice}</p>
                                </div>
                            </div> 
                        `;

  return totalPriceEl;
}

renderMenu(menuArray);

document.querySelectorAll(".addBtn").forEach((button) => {
  button.addEventListener("click", addOrder);
});

document.querySelectorAll(".removeOrderBtn").forEach((button) => {
  button.addEventListener("click", removeOrder);
});
