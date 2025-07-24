const weatherAPIKey = "";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}`


const galleryImage = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1" 
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2" 
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3" 
    }

]

const productImage = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
]


function celToFarh(temperature) {
    let fahr = (temperature * 9/5) +32;
    return fahr;
}

// Menu

function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
    document.querySelector("header nav .wrapper").classList.add("nav-open")
})

    document.querySelector("#close-nav-menu").addEventListener("click", function(){
    document.querySelector("header nav .wrapper").classList.remove("nav-open")
})
}


// Greeting & Weather

function greetingHandler() {
    let greeting;
    const weatherCondition = "sunny";
    const userLocation = "Stockholm";
    let temperature = 20;
    let weatherText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature}°C outside.` 
    document.getElementById("weather").innerHTML = weatherText;

    let currentTime = new Date().getHours();

    if (currentTime < 12) {
        greeting = "Good morning"
    } else if (currentTime < 19) {
        greeting = "Good Afternoon"
    } else {greeting ="welcome"};

    document.querySelector(".weather-group").addEventListener("click", function(e){
    if (e.target.id == "celsius") {
        let celText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
        document.getElementById("weather").innerHTML = celText;
    }
    else if (e.target.id == "fahr") {
        let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celToFarh(temperature).toFixed(1)}°F outside.`;
         document.getElementById("weather").innerHTML = fahrText;
    }
})};

//Clock

function clockHandler() {
    setInterval(function() {
    let localTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
}, 1000)

}


//Images
function galleryHandler() {

    let mainImage = document.querySelector("#gallery > img");
    mainImage.src = galleryImage[0].src;
    mainImage.alt = galleryImage[0].alt;
    let thumbnails = document.querySelector("#gallery .thumbnails")

    galleryImage.forEach(function(image,index) {
        let thumb = document.createElement("img");
        thumb.loading = "lazy";
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        thumb.addEventListener("click", function(e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImage[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function(img) {
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });

    thumbnails.appendChild(thumb);

})
}


function populateProduct(productList) {

    
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";

    //Run a loop and create an HTML element for each of them
    productList.forEach(function(product) {

        //Create parent div for individual product
        let productElement = document.createElement("div");
        productElement.classList.add("product-item");

        //Create product image
        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = "Image for " + product.title;

        //Create product detail div
        let productDetail = document.createElement("div");
        productDetail.classList.add("product-details");

        //Create h3
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        //Apend childs to their parent
        
        productDetail.append(productTitle);
        productDetail.append(productAuthor);
        productDetail.append(priceTitle);
        productDetail.append(productPrice);

        productElement.append(productImg);
        productElement.append(productDetail);
       
        productSection.append(productElement);
    });

}

//Product Handler
function productHandler() {

    let freeProducts = productImage.filter(item => item.price <= 0 || !item.price);
    let paidProducts = productImage.filter(item => item.price > 0);

    populateProduct(productImage);


    let totalProducts = productImage.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;

    let totalPaid = paidProducts.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = totalPaid;

    let totalFree = freeProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = totalFree;

    let productFilter = document.querySelector(".products-filter");
    productFilter.addEventListener("click", function(e) {
        if (e.target.id === "all") {
            populateProduct(productImage);
        } else if (e.target.id === "paid") {
            populateProduct(paidProducts);
        } else if (e.target.id === "free") {
            populateProduct(freeProducts);
        }
    });
}

function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `Updated at ${currentYear}`;
}

navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude;
    let logitude = position.coords.longitude;
    let url = weatherAPIURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);

    fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium")
    .then(response => response.json()) //Convert json into object
    .then(data => {
        const weatherCondition = "sunny";
        const userLocation = "Stockholm";
        let temperature = 20;
        });
})



// Page Load

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();
