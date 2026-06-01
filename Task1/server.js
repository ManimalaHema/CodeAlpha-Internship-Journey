const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('PUBLIC')); 

// Nee 6 products ikkada unnay
const products = [
  {id: 1, name: "Laptop", price: 50000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"},
  {id: 2, name: "Mouse", price: 500, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300"},
  {id: 3, name: "Keyboard", price: 1500, img: "https://images.unsplash.com/photo-1587829741301-dc79883add3?w=300"},
  {id: 4, name: "Headphone", price: 2000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"},
  {id: 5, name: "Webcam", price: 3000, img: "https://assets.pinshape.com/uploads/image/file/380105/small_logitech-streamcam-privacy-cover-3d-printing-380105.jpg"},
  {id: 6, name: "Speaker", price: 2500, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300"}
];

let orders = [];

// API 1: Frontend ki products pampistadi
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API 2: Order vasthe teesukuntadinode  
app.post('/api/order', (req, res) => {
  const order = {id: Date.now(), ...req.body, date: new Date()};
  orders.push(order);
  console.log("New Order Received:", order); 
  res.json({success: true, orderId: order.id});
});

let users = []; // Line 33 lo idhi unchuko

// REGISTER API
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password required' });
  }
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  console.log("New User Registered:", newUser.email);
  res.status(201).json({ message: 'Registration successful' });
});

// LOGIN API - IDHI MUKHYAM, NEE DAGGARA LEDU
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  console.log("User Logged In:", user.email);
  res.json({ message: "Login successful", userId: user.id, email: user.email });
});



app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

