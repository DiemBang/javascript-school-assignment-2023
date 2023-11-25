
/*

Headern med varukorgsymbol och totalt pris:
Varukorgsymbolen ska uppdateras när man lägger till eller ta bort vara
Totalt pris ska uppdateras när man lägger till eller ta bort vara

Produktmenyn:
Produkterna ska gå att sortera utifrån namn, pris, kategori och rating

Varukorgsammanställning(order summary): 
Minus- och plusknapparna ska göra samma sak som ovan
Krysset: Ta bort varan när man klickar
Rabattkod: Visa kodfält när man klickar

Formulär för kunduppgifter:

*/
const headerSubtotal = document.querySelector('#totalAmount');
const productHtmlContainer = document.querySelector('#productListing');  
const cartHtmlContainer = document.querySelector('#orderSummary');
const today = new Date();

const isFriday = today.getDay() === 6;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();

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

//update total amound in header
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
    desserts.forEach(function(dessert) {
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
    if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
        return 1.15; 
    } else {
        return 1;
    }

}

function printProductList() {
    productHtmlContainer.innerHTML = '';

    let priceIncrease = getPriceMultiplier();

    desserts.forEach(function(dessert, index) {
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

    minusBtns.forEach(function(btn) {
        btn.addEventListener('click', decreaseAmount);
    });

    plusBtns.forEach(function(btn) {
        btn.addEventListener('click', increaseAmount);
    });
}

//add html based on desserts array
function printDesserts() {
    
    updateTotalAmount();
    printProductList();
    printCartDesserts();
    addButtonEventListeners();

}

function calculateSum() {
    let sum = 0;
    let priceIncrease = getPriceMultiplier();

    desserts.forEach(function(dessert) {
        sum += Math.round((dessert.amount * dessert.price) * priceIncrease);

    });
    return sum;
}

function printCartDesserts() {
    cartHtmlContainer.innerHTML = '';

    let orderedDessertAmount = 0;
    let msg = '';
    let priceIncrease = getPriceMultiplier();
 
    //cart
    desserts.forEach(function(dessert, index) {
        orderedDessertAmount += dessert.amount;
        if (dessert.amount > 0) {
            let dessertPrice = dessert.price;
            if (dessert.amount >= 10) { //10% discount
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

    if (today.getDay() === 1){
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