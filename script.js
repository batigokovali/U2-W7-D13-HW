const getBooks = async () => {
    try {
        let res = await fetch("https://striveschool-api.herokuapp.com/books")
        let bookData = await res.json()
        renderBooks(bookData)
        queryToSearch(bookData)
        console.log(bookData)
    } catch(err) {
        console.log(err)
    }
}
getBooks()

window.onload = () => {
    addToCart ()
    skip ()
    console.log()
}

let booksContainer = document.querySelector(".row")
const renderBooks = (bookData) => {
    const booksHTML = bookData.map(({asin, title, img, price, category}) =>{
    
        return `<div class="card col-lg-4 col-md-3 col-sm-2 ">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <h5 class="card-title">${title}</h5>
          <p class="card-text book-price">Price: ${price}</p>
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
            cart.innerHTML += `<p>${title[i].innerText}${price[i].innerText}</p>`
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

function queryToSearch(bookData) {

    let user = document.querySelector("input")
    user.addEventListener("keydown", (e) => {
        for (i = 0; i<bookData.length; i++)
        {
            let value = e.target.value
            if ( value && value.trim().length>2) {
                value = value.trim().toLowerCase()
            } else {

            }
        }
    })

}