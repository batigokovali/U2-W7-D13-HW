const getBooks = async () => {
    try {
        let res = await fetch("https://striveschool-api.herokuapp.com/books")
        let bookData = await res.json()
        renderBooks(bookData)
        queryToSearch(bookData)
        addToCart()
        skip () 
        deleteFromCart ()
        console.log(bookData)
        // call the functions from here!
    } catch(err) {
        console.log(err)
    }
}
getBooks()



let booksContainer = document.querySelector(".row")
const renderBooks = (bookData) => {
    const booksHTML = bookData.map(({asin, title, img, price, category}) =>{
    
        return `<div class="card col-lg-3 col-md-6 col-sm-12 ">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text book-price">Price: ${price}€</p>
          <p class="card-text">Category: ${category}</p>
          <p class="card-text">ASIN: ${asin}</p> 
  <button type="button" class="btn btn-secondary add-to-cart">Add to Cart</button>
  <button type="button" class="btn btn-secondary mt-2 skip">Skip</button>
        </div>
      </div>`}).join("");
      booksContainer.innerHTML = booksHTML;
}

function addToCart () {
    let buttons = document.querySelectorAll(".add-to-cart")
    let containers = document.querySelectorAll(".card")
    let title = document.querySelectorAll(".card-title")
    let price = document.querySelectorAll(".book-price")
    let cart = document.querySelector(".dropdown-menu")
    
    
    
    for (let i = 0; i< buttons.length; i++) {
        buttons[i].addEventListener("click", function (){
            containers[i].classList.toggle("border-success")
            cart.innerHTML += `<div class="cart-item">
            <p >${title[i].innerText}${price[i].innerText}</p>
            <button type="button" class="btn btn-danger delete-from-cart cart-item" onclick="deleteFromCart()">DELETE</button>
            </div>`
        })
    }
    
}

function skip () {
    let buttons = document.querySelectorAll(".skip")
    let containers = document.querySelectorAll(".card")
    for (let i = 0; i< buttons.length; i++) {
        buttons[i].addEventListener("click", function (){
            containers[i].remove()
        })
    }
}

function deleteFromCart (event) {
   console.log(event.target)
    
}

function queryToSearch(bookData) {

    let user = document.querySelector("input")
    user.addEventListener("keydown", function(){
        for (i = 0; i<bookData.length; i++)
        {
            if (bookData[i].title.includes(user.value) === true)
            {
                console.log(bookData[i].title)
            }
        }
    })

}

function totalCost ()
{
    let costContainer = document.getElementById("total-cost")
    let bookPrices = document.querySelectorAll(".book-price")
    for (i = 0; i<bookPrices.length; i++)
    {
        costContainer.innerText = bookPrices[i].reduce((tempSum, currentElement) => {
            return tempSum + currentElement
        })
    }
}

function emptyCart () {
    let cart = document.querySelector(".dropdown-menu")
    let cards = document.querySelectorAll(".card")
    cart.innerHTML ="";
    for (let i = 0; i< cards.length; i++) {
        
        cards[i].classList.remove("border-success")
     }
}

