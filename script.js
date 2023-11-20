
/*

Produktlista:
- Skapa produktlista i en object/array med 4 properties: namn, pris, rating och kategori
- Skapa en plus och minusknapp för varje produkt
- Plusknapp: När man klickar på plus ska varan läggas till i varukorgen och totalsumman ska uppdateras
Start:
Minusknapp: Varan ska dras bort från varukorgen och totalsumman ska uppdateras

- Totalsumman ska vara 0 innan man har lagt till något

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

const productHtmlContainer = document.querySelector('#productListing');  

const desserts = [
    {
        name: 'Brownie',
        price: 42,
        amount: 0,
        category: 'Culinary', //ceremonial, premium or culinary
        rating: 4, //scale 1-5
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Cheesecake',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Cookie with white chocolate',
        price: 38,
        amount: 0,
        category: 'Culinary',
        rating: 3,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Donut',
        price: 38,
        amount: 0,
        category: 'Culinary',
        rating: 3,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Lava cake',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Macaroons',
        price: 48,
        amount: 0,
        category: 'Premium',
        rating: 4,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Mille crepe cake',
        price: 52,
        amount: 0,
        category: 'Ceremonial',
        rating: 5,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Mochie',
        price: 42,
        amount: 0,
        category: 'Premium',
        rating: 2,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Matcha souffle pancakes',
        price: 82,
        amount: 0,
        category: 'Ceremonial',
        rating: 5,
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    },
    {
        name: 'Matcha soft serve',
        price: 58,
        amount: 0,
        category: 'Ceremonial',
        rating: 4, 
        image: {
            src: '',
            alt: '',
            width: '',
            height: '',
        }
    }

];

function printDesserts() {
    productHtmlContainer.innerHTML = '';

    desserts.forEach(function(dessert) {
        productHtmlContainer.innerHTML += 
        `
            <article>
                <h3>${dessert.name}</h3>
                <div>Price: <span>${dessert.price}</span> kr</div>
                <div>Rating: <span>${dessert.rating}</span></div>
                <button>-</button>
                <button>+</button>
            </article>
        `;

    });
}

printDesserts();