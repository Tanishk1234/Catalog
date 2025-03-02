// Sample product data
const products = [
    {
        name: "Product 1",
        image: "1.png",
        description: "weigh 1.5gm - 2.5gm"
    },
    {
        name: "Product 2",
        image: "1.png",
        description: "Description of Product 2."
    },
    {
        name: "Product 3",
        image: "1.png",
        description: "Description of Product 3."
    }

    ,{
        name: "Product 4",
        image: "1.png",
        description: "Description of Product 4."
    }

    ,{
        name: "Product 5",
        image: "1.png",
        description: "Description of Product 4."
    }

    ,{
        name: "Product 6",
        image: "1.png",
        description: "Description of Product 4."
    }

    ,{
        name: "Product 7",
        image: "1.png",
        description: "Description of Product 4."
    }

    ,{
        name: "Product 8",
        image: "1.png",
        description: "Description of Product 4."
    }
];

// Function to create product elements
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.setAttribute('tabindex', '0'); // Make product focusable
    productDiv.innerHTML = `
        <img src="placeholder.jpg" data-src="${product.image}" alt="${product.name}">
        <div class="product-content">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <button class="share-button">Share on WhatsApp</button>
            <div class="quantity">
                <label for="quantity-${product.name}">Quantity:</label>
                <input type="number" id="quantity-${product.name}" value="1" min="1">
            </div>
        </div>
    `;
    return productDiv;
}

// Function to render products
function renderProducts() {
    const catalogDiv = document.getElementById('catalog');
    products.forEach(product => {
        const productElement = createProductElement(product);
        catalogDiv.appendChild(productElement);
    });
}

// Lazy load images when they come into view
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

// Call renderProducts function to display products
renderProducts();

// Call lazyLoadImages function on page load and scroll
window.addEventListener('load', lazyLoadImages);
window.addEventListener('scroll', lazyLoadImages);

// Function to handle sharing on WhatsApp
document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click event from propagating to product container
        const productName = this.parentNode.querySelector('h2').textContent;
        const quantity = this.parentNode.querySelector('input[type="number"]').value;
        const phoneNumber = '+919897706852'; // Replace with your phone number
        const message = `I want to order ${quantity} ${productName}(s)`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    });
});

// Function to handle keyboard navigation
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            // Trigger click event on enter or space key
            this.querySelector('.share-button').click();
        }
    });
});
