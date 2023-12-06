const headerQuantity = document.querySelector('#cartNumber');
const headerSubtotal = document.querySelector('#totalAmount');
const productHtmlContainer = document.querySelector('#productListing');
const cartHtmlContainer = document.querySelector('#orderSummary');
const fnameError = document.querySelector('#fnameError');
const lnameError = document.querySelector('#lnameError');
const addressError = document.querySelector('#addressError');
const postcodeError = document.querySelector('#postcodeError');
const phoneError = document.querySelector('#phoneError');
const emailError = document.querySelector('#emailError');
const today = new Date();
const invoiceBtn = document.querySelector('#invoiceBtn');
const invoiceError = document.querySelector('#invoiceError');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const address = document.querySelector('#address');
const postcode = document.querySelector('#postcode');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const personalID = document.querySelector('#personalID');
const orderConfirmation = document.querySelector('#orderConfirmation');

const resetBtn = document.querySelector('#resetBtn');

let slownessTimeout = setTimeout(tooSlowCustomerMessage, 1000 * 60 * 15);

const desserts = [
    {
        name: 'Brownie',
        price: 42,
        amount: 0,
        category: 'Culinary', //ceremonial, premium or culinary
        rating: 4, //scale 1-5
        image: {
            src: '../assets/images/brownies.png',
            alt: 'Matcha brownies with chocolate chip',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Cheesecake',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '../assets/images/cheesecake.png',
            alt: 'Matcha cheesecake',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Cookie with white chocolate',
        price: 38,
        amount: 0,
        category: 'Culinary',
        rating: 3,
        image: {
            src: '../assets/images/cookie.png',
            alt: 'Matcha cookie with white chocolate chip',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Donut',
        price: 38,
        amount: 0,
        category: 'Culinary',
        rating: 3,
        image: {
            src: '../assets/images/donuts.png',
            alt: 'Matcha donuts',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Lava cake',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '../assets/images/lavacake.png',
            alt: 'Gooey lava cake with matcha filling',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Macaroons',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '../assets/images/macaroons.png',
            alt: 'Matcha macaroons',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Mille crepe cake',
        price: 52,
        amount: 0,
        category: 'Ceremonial',
        rating: 5,
        image: {
            src: '../assets/images/millefeuille.png',
            alt: 'Matcha mille feuille cake',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Mochie',
        price: 42,
        amount: 0,
        category: 'Premium',
        rating: 2,
        image: {
            src: '../assets/images/mochie.png',
            alt: 'Matcha mochie',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Souffle pancakes',
        price: 82,
        amount: 0,
        category: 'Ceremonial',
        rating: 5,
        image: {
            src: '../assets/images/pancakes.png',
            alt: 'Fluffy matcha souffle pancakes',
            width: '100',
            height: '200',
        }
    },
    {
        name: 'Soft serve',
        price: 58,
        amount: 0,
        category: 'Ceremonial',
        rating: 4,
        image: {
            src: '../assets/images/softserve.png',
            alt: 'Matcha soft serve icecream',
            width: '100',
            height: '200',
        }
    }

];

const selectElement = document.querySelector('#sortBy');

selectElement.addEventListener('change', sortBySelected);

function sortBySelected(event) {
    console.log(event.target.value);
    if (event.target.value === "name") {
        sortDessertsByName();
    } else if (event.target.value === "price") {
        sortDessertsByPrice();
    } else if (event.target.value === "category") {
        sortDessertsByCategory();
    } else if (event.target.value === "rating") {
        sortDessertsByRating();
    }
}

// sort by name, price, category and rating
function sortName(dessert1, dessert2) {
    if (dessert1.name > dessert2.name) {
        return 1;
    } else if (dessert1.name < dessert2.name) {
        return -1;
    } else {
        return 0;
    }
}

function sortDessertsByName() {
    desserts.sort(sortName);
    printDesserts();
}

function sortPrice(dessert1, dessert2) {
    return dessert1.price - dessert2.price;
}

function sortDessertsByPrice() {
    desserts.sort(sortPrice);
    printDesserts();
}

function sortCategory(dessert1, dessert2) {
    if (dessert1.category > dessert2.category) {
        return 1;
    } else if (dessert1.category < dessert2.category) {
        return -1;
    } else {
        return 0;
    }
}

function sortDessertsByCategory() {
    desserts.sort(sortCategory);
    printDesserts();
}


function sortRating(dessert1, dessert2) {
    return dessert2.rating - dessert1.rating;
}

function sortDessertsByRating() {
    desserts.sort(sortRating);
    printDesserts();
}

//update total quantity in header
function updateTotalQuantity() {
    headerQuantity.innerHTML = '';
    let quantity = calculateTotalQuantity();
    headerQuantity.innerHTML += `<span>${quantity}</span>`;
}


//update total amount in header
function updateTotalAmount() {
    headerSubtotal.innerHTML = '';
    let sum = calculateSum();
    headerSubtotal.innerHTML += `
    <span>${sum} kr</span>
    `;
}

function tooSlowCustomerMessage() {
    alert('You took too long to order!');
    clearCart();
}

function clearCart() {
    desserts.forEach(function (dessert) {
        dessert.amount = 0;
    });
    printDesserts();
}

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if (desserts[index].amount <= 0) {
        desserts[index].amount = 0;
    } else {
        desserts[index].amount -= 1
    }
    printDesserts();
}

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    desserts[index].amount += 1
    printDesserts();
}


//friday & > 15.00 && monday & <= 3
function getPriceMultiplier() {
    const isFriday = today.getDay() === 6;
    const isMonday = today.getDay() === 1;
    const currentHour = today.getHours();

    if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
        return 1.15;
    } else {
        return 1;
    }

}

function printProductList() {
    productHtmlContainer.innerHTML = '';

    let priceIncrease = getPriceMultiplier();

    desserts.forEach(function (dessert, index) {
        productHtmlContainer.innerHTML +=
            `
            <article class="product">
                <div class="imgFrame">
                    <img src="${dessert.image.src}" alt="${dessert.image.alt}" width="${dessert.image.width}" height="${dessert.image.height}" loading="lazy">
                </div>
                <h3>${dessert.name}</h3>
                <div>Price: <span>${Math.round(dessert.price * priceIncrease)}</span> kr</div>
                <div>Rating: <span>${dessert.rating}</span></div>
                <div>Quantity: <span>${dessert.amount}</span></div>
                <button class="minus" data-id="${index}">-</button>
                <button class="plus" data-id="${index}">+</button>
            </article>
        `;
    });
}


function addButtonEventListeners() {
    const minusBtns = document.querySelectorAll('button.minus');
    const plusBtns = document.querySelectorAll('button.plus');

    minusBtns.forEach(function (btn) {
        btn.addEventListener('click', decreaseAmount);
    });

    plusBtns.forEach(function (btn) {
        btn.addEventListener('click', increaseAmount);
    });
}

//add html based on desserts array
function printDesserts() {
    updateTotalQuantity();
    updateTotalAmount();
    printProductList();
    printCartDesserts();
    addButtonEventListeners();
    addDisabled();
    calculateTotalQuantity();
    printOrderConfirmation();
}

function calculateSum() {
    let sum = 0;
    let priceIncrease = getPriceMultiplier();

    desserts.forEach(function (dessert) {
        sum += Math.round((dessert.amount * dessert.price) * priceIncrease);

    });
    return sum;
}

function calculateTotalQuantity() {
    let totalQuantity = 0;

    desserts.forEach(function (dessert, index) {
        totalQuantity += (dessert.amount);
    });
    return totalQuantity;
}

function printCartDesserts() {
    cartHtmlContainer.innerHTML = '';

    let orderedDessertAmount = 0;
    let msg = '';
    let priceIncrease = getPriceMultiplier();

    //cart
    desserts.forEach(function (dessert, index) {
        orderedDessertAmount += dessert.amount;
        if (dessert.amount > 0) {
            let dessertPrice = dessert.price;
            if (dessert.amount >= 10) { //10% discount - add to calculateSum?
                dessertPrice *= 0.9;
            }
            const adjustedDessertPrice = dessert.price * priceIncrease;


            cartHtmlContainer.innerHTML += `
            <article class = "product-in-cart">
                <img src="${dessert.image.src}" alt="${dessert.image.alt}" loading="lazy">
                <span>${dessert.name}</span> | <span>Quantity: ${dessert.amount}</span> | <span>Subtotal: ${Math.round(dessert.amount * adjustedDessertPrice)} kr</span>
                <button class="minus" data-id="${index}">-</button>
                <button class="plus" data-id="${index}">+</button>
            </article>
            `;
        }
    });

    let sum = calculateSum();

    if (sum <= 0) {
        return;
    }

    if (today.getDay() === 1) {
        sum *= 0.9;
        msg += '<p>Monday discount: 10% off on your order';
    }

    cartHtmlContainer.innerHTML += `<p>Cart subtotal: ${sum} kr</p>`;
    cartHtmlContainer.innerHTML += `<div>${msg}</div>`;

    if (orderedDessertAmount > 15) {
        cartHtmlContainer.innerHTML += '<p>Shipping: 0 kr</p>';
    } else {
        cartHtmlContainer.innerHTML += `<p>Shipping: ${Math.round(25 + (0.1 * sum))} kr</p>`
    }
}

printDesserts();

//contact form

const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const inputs = [
    document.querySelector('#creditCardNumber'),
    document.querySelector('#creditCardMonth'),
    document.querySelector('#creditCardYear'),
    document.querySelector('#creditCardCvc'),
    document.querySelector('#personalID'),
    document.querySelector('#fname'),
];

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
const orderBtn = document.querySelector('#orderBtn');

//Default options
let selectedPaymentOption = 'card';

//REGEX
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
const creditCardNumbeRegEx = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/); //VISA or Mastercard
const nameRegEx = new RegExp(/^[a-zA-ZåäöÅÄÖ]+([\ a-zA-ZåäöÅÄÖ])*/);
//const addressRegEx = new RegExp
//const postcodeRegEx =
const phoneRegEx = new RegExp(/^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/);
const emailRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);


//validation
function isFnameValid() {
    return nameRegEx.test(fname.value);
}

function isPersonalIdNumberValid() {
    return personalIdRegEx.exec(personalID.value);
}

//Add event listeners
inputs.forEach(function (input) {
    input.addEventListener('focusout', activateOrderBtn);
    input.addEventListener('change', activateOrderBtn);

});

cardInvoiceRadios.forEach(function (radioBtn) {
    radioBtn.addEventListener('change', switchPaymentMethod);
});

/**
 * Switches between invoice and card payment method. 
 * Toggles their visibility. 
 */
function switchPaymentMethod(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');

    selectedPaymentOption = e.target.value;
}


function activateOrderBtn() {
    console.log("activateOrderBtn");
    orderBtn.setAttribute('disabled', '');

    if (!isFnameValid()) {
        console.log("first name is not valid");
        fnameError.innerHTML = `<p>Not valid.</p>`;
        return;
    } else {
        console.log("first name is valid");
        fnameError.innerHTML = ``;
    }

    if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
        return;
    }

    if (selectedPaymentOption === 'card') {
        //check card number
        if (creditCardNumbeRegEx.exec(creditCardNumber.value) === null) {
            console.warn('Credit card number not valid.')
            return;
        }
        //check month
        let month = Number(creditCardMonth.value);

        if (month > 12 || month < 1) {
            console.warn('Credit card month not valid');
            return;
        } else if (month >= 1 && month <= 9) {
            if (creditCardMonth.value[0] != 0) {
                console.warn('Credit card month not valid');
                return;
            }
        }
        console.log(month);
        console.log(typeof (month));

        //check card year
        let year = Number(creditCardYear.value);
        const today = new Date();
        const shortYear = Number(String(today.getFullYear()).substring(2));

        if (year > shortYear + 2 || year < shortYear) {
            console.warn('Credit card year not valid');
            return;
        }

        //check card CVC
        if (creditCardCvc.value.length !== 3) {
            console.warn('CVC not valid.');
            return;
        }
    }
    orderBtn.removeAttribute('disabled');
}

resetBtn.addEventListener('click', clearCart);

//add disabled to invoice radio button when ordering >800 kr
function addDisabled() {
    let sum = calculateSum();
    if (sum > 800) {
        invoiceBtn.disabled = true;
        invoiceError.innerHTML = `<p>Invoice is not available when total amount is 800 kr or higher.</p>`;
    } else {
        invoiceBtn.disabled = false;
        invoiceError.innerHTML = ``;

    }
}

function printOrderConfirmation() {
    orderConfirmation.innerHTML = '';

    let date = new Date();

    date.setDate(date.getDate() + 5);
    let deliveryDate = date.toLocaleDateString("en-SE");

    orderConfirmation.innerHTML += `
    <h2>Thank you for your order.</h2>
    <h3>Order details:</h3>
    `;

    //order confirmation summary
    desserts.forEach(function (dessert, index) {
        if (dessert.amount > 0) {
            orderConfirmation.innerHTML += `
            <article class = "product-in-order-summary">
                <span>${dessert.name}</span> | <span>Quantity: ${dessert.amount}</span>
            </article>
            `;
        };
    });

    orderConfirmation.innerHTML += `
    <h3>Delivery date: ${deliveryDate}</h3>
    `;
    orderConfirmation.innerHTML += `
    <button id="closeBtn">Close</button>
    `;

    //when clicking on close button, order confirmation popup goes away
    closeBtn.addEventListener('click', closeOrderConfirmation);

}

function closeOrderConfirmation() {
    const orderConfirmation = document.querySelector('#orderConfirmation').classList.add('hidden');
}

//prevent default form behaviour
orderBtn.addEventListener('click', function (e) {
    e.preventDefault();
});

//when clicking on place order button, order confirmation summary pops up
orderBtn.addEventListener('click', showOrderConfirmation);

function showOrderConfirmation() {
    const orderConfirmation = document.querySelector('#orderConfirmation').classList.remove('hidden');
}




