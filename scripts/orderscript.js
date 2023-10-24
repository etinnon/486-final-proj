const menuArray = [
	{
		name: "Vanilla",
		id: 0,
		price: 1.10,
	},
	{
		name: "Chip Chocolate",
		id: 1,
		price: 1.10
	},
	{
		name: "Peachy Peach",
		id: 2,
		price: 1.10
	},
	{
		name: "Chocolate Caramel Cherry",
		id: 3,
		price: 1.10
	},
	{
		name: "Rainbow Sherbert",
		id: 4,
		price: 1.10
	},
	{
		name: "Cookie Dough",
		id: 5,
		price: 1.10
	},
	{
		name: "Orange Pineapple",
		id: 6,
		price: 1.10
	},
	{
		name: "O'Charley's Caramel Pie",
		id: 7,
		price: 1.10
	},
	{
		name: "Chocolate",
		id: 8,
		price: 1.10
	},
	{
		name: "Strawberry",
		id: 9,
		price: 1.10
	},
	{
		name: "Black Walnut",
		id: 10,
		price: 1.10
	},
	{
		name: "Cookies & Cream",
		id: 11,
		price: 1.10
	},
	{
		name: "Butter Pecan",
		id: 12,
		price: 1.10
	},
	{
		name: "Cherry Vanilla",
		id: 13,
		price: 1.10
	},
	{
		name: "Red Velvet Cake",
		id: 14,
		price: 1.10
	},
	{
		name: "Chocolate Marshmallow Almond",
		id: 15,
		price: 1.10
	},
	{
		name: "Sugarfree Vanilla",
		id: 16,
		price: 1.10
	},
	{
		name: "Sugarfree Butter Pecan",
		id: 17,
		price: 1.10
	},
]


let orderedItems = [];

function getMenuHtml() {
	let menuHtml = "";
	menuArray.forEach((menu) => {
		menuHtml += `
      <div class="menu-items" id="menu-items">
      <button class="add-btn" data-item="${menu.id}">${menu.name}</button>
      </div>`;
	});
	return menuHtml;
}

document.addEventListener("click", (e) => {
	document.getElementById("order-total").classList.remove("hidden");
	if (e.target.dataset.item) {
		addItems(e.target.dataset.item);
	} else if (e.target.dataset.indexNumber) {
		removeItems(e.target.dataset.indexNumber);
	} else if (e.target.id === "complete-order-btn") {
		completeOrder();
	} else if (e.target.id === "modal-close-btn") {
		closeModal();
	} else if (e.target.id === "thankyou-btn") {
		renderThankScreen(e);
		closeModal()
	}
	console.log(e.target.dataset.indexNumber)
});


function addItems(itemId) {
	document.getElementById("order-total").style.display = "flex";


	// classList.remove("hidden");

	const targetItem = menuArray.filter((item) => {
		return item.id == itemId;
	})[0];
	orderedItems.push(targetItem);
	renderOrderedItems();
	renderTotal();
}

function removeItems(index) {
	orderedItems.splice(index, 1)
	renderOrderedItems();
	renderTotal();
}

function renderThankScreen(e) {
	e.preventDefault()

	const el = document.getElementById('order-total')
	el.remove()

	const payerName = document.getElementById("name").value
	const payerEmail = document.getElementById("email").value

	document.getElementById("thankyou-screen").innerHTML = `<h2> Your has been sent! Please allow 5-10 minutes for preparation. 
	Thank you for your business! To place another order please refresh your screen. </h2>
  `
}

function renderOrderedItems() {
	const html = orderedItems.map((item, index) => {
		return `
    <div id="order-items" class="order-items">
     <div class="item-row">
    <h4>${item.name}</h4>
    <button data-remove="remove" data-index-number="${index}" class="remove-btn">Remove</button>
     </div>
    <p data-price="price">$${item.price.toFixed(2)}</p>
    </div>`;
	});
	document.getElementById("total").innerHTML = html.join("");
}

function renderTotal() {
	const itemPrices = orderedItems.map((item) => item.price);
	const totalPrice = itemPrices.reduce((a, b) => a + b, 0).toFixed(2);
	document.getElementById(
		"total-price"
		//let totalPrice = num.toFixed(2);
	).innerHTML = `Total Price: <span>$${totalPrice}</span>`;
}

function renderMenu() {
	document.getElementById("scoop").innerHTML = getMenuHtml();
}

renderMenu();

// Modal Function
const modal = document.getElementById("modal")
const overlay = document.querySelector(".overlay")

function closeModal() {
	modal.style.display = "none"
	modal.classList.remove("visible")
	modal.classList.add("hidden")
	overlay.style.display = "none"
}

function completeOrder() {
	modal.style.display = "block"
	modal.classList.remove("hidden")
	modal.classList.add("visible")
	overlay.style.display = "block"
}





