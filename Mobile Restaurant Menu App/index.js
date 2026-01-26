import { menuArray } from "./data.js"

const menuItemsDiv = document.getElementById('menu-items')
const orderedItemsDiv = document.getElementById('ordered-items')
const totalPriceElement = document.getElementById('total-price')
const form = document.getElementById('card-details-form')
const modal = document.getElementById("card-details-modal");
const thanks = document.getElementById('thanks')

let orderedItemsHtml = ''
let totalPrice = 0
let orderedItemsArr = []

document.addEventListener('click',e => {

    if(e.target.id === "add-btn"){
        addOrderedItems(e)
    }else if(e.target.id === "remove-btn"){
        removeOrderedItem(e.target.closest('.order-item'))
    }


})

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(formData);
  modal.style.display = "none";
  renderThanksMessage()
});

function renderThanksMessage(){
    thanks.innerHTML = `
    <div id="rendered-thanks-message">
    <p>Thanks, James. Your order is on it's way.</p>
    </div>
    `
}

function removeOrderedItem(item){
    let itemName = item.id
    let itemToRemoveIndex = orderedItemsArr.findIndex(item => item.name === itemName)
    orderedItemsArr.splice(itemToRemoveIndex, 1);
    renderOrderedItems()
}

function addOrderedItems(e){
    const name = e.target.closest('.menu-item').dataset.item
    const addedMenuItem = menuArray.find(item => item.name === name)
    orderedItemsArr.push(addedMenuItem)
    renderOrderedItems()
}

function renderOrderedItems(){
    totalPrice = 0
    orderedItemsArr.forEach(item => {
        orderedItemsHtml += `
        <div id="${item.name}" class="order-item" data-remove = ${item.price}>
            <p id="ordered-item-name">${item.name}</p>
            <button id ="remove-btn" data-remove="${item.name}">remove</button>
            <p id="ordered-item-price">$${item.price}</p>
        </div>
        `
        totalPrice += item.price
    })
    orderedItemsDiv.innerHTML = orderedItemsHtml
    totalPriceElement.innerHTML = `$${totalPrice}`
    orderedItemsHtml = ''
}


let htmlItemsString = ''

function renderMenuItems(){
    menuArray.forEach(item => {
        htmlItemsString +=
`
<div class="menu-item" data-item="${item.name}" data-price="${item.price}">
    <div class="menu-left">
        <img src="./images/${item.name}.jpeg" alt="${item.name}" class="menu-img">
    </div>
    <div class="menu-middle">
        <h3 class="menu-title">${item.name}</h3>
        <p class="menu-desc">${item.ingredients}</p>
        <p class="menu-price">$${item.price}</p>
    </div>

    <button class="add-btn" id="add-btn">+</button>
</div>

`
    })
    return htmlItemsString
}


menuItemsDiv.innerHTML = renderMenuItems()




var btn = document.getElementById("complete-order-btn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

