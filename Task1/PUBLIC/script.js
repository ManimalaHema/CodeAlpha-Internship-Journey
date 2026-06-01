let currentUser = null;

// Page load ayyaka products hide cheyyi
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main-container').style.display = 'none';
});

// LOGIN/REGISTER TOGGLE FUNCTIONS - IVI MISSING UNNAY
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

async function registerUser() {
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();
  
  if (!email) return alert('Please enter email');
  if (!password) return alert('Please enter password');
  
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  alert(data.message || data.error);
  
  if(res.ok) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
    loginUser();
  }
}

async function loginUser() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  
  if (!email) return alert('Please enter email');
  if (!password) return alert('Please enter password');
  
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  
  if (res.ok) {
    currentUser = data;
    document.getElementById('userStatus').innerText = `Logged in as: ${data.email}`;
    document.querySelector('.auth').style.display = 'none';
    document.querySelector('.main-container').style.display = 'flex';
  } else {
    alert(data.error);
  }
}


let products = [
  {id: 1, name: "Laptop", price: 50000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"},
  {id: 2, name: "Mouse", price: 500, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300"},
  {id: 3, name: "Keyboard", price: 1500, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300"},

  {id: 4, name: "Headphone", price: 2000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"},

  {id: 5, name: "Webcam", price: 3000, img: "https://assets.pinshape.com/uploads/image/file/380105/small_logitech-streamcam-privacy-cover-3d-printing-380105.jpg"},
  {id: 6, name: "Speaker", price: 2500, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300"}
];

let cart=[];
let productsDiv = document.getElementById("products")
products.forEach(function(item) {
  let card = document.createElement("div"); 
  card.className = "product-card";         
  
  card.innerHTML = `                       
    <img src="${item.img}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Price: ₹${item.price}</p>
    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
  `;                                      
  
  productsDiv.appendChild(card);          
});

function addToCart(itemName, itemPrice) {
  cart.push({name: itemName, price: itemPrice});
  alert(itemName + " added  to cart!");
  showCart();
}


function showCart() {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = ""; 
  
  let total = 0;
  cart.forEach(function(item, index) {
    cartDiv.innerHTML += `
      <p>
        ${item.name} - ₹${item.price} 
        <button onclick="removeFromCart(${index})">X</button>
      </p>
    `;
    total = total + item.price;
  });
  
  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
}


function removeFromCart(index) {
  cart.splice(index, 1); 
  showCart(); 
}




function placeOrder() {
  console.log("placeOrder function called");
  
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  
  fetch('/api/order', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({items: cart})
  })
  .then(res => {
    console.log("Server response:", res);
    return res.json();
  })
  .then(data => {
    alert('Order placed! Order ID: ' + data.orderId);
    cart = [];
    document.getElementById("cart").innerHTML = "cart is empty";
  })
  .catch(err => {
    console.error("Fetch error:", err);
    alert('Error: ' + err.message);
  });
}

