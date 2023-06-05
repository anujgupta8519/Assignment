const express = require('express');
const app = express();
const fs = require('fs');

const itemListData = JSON.parse(fs.readFileSync('item_list.json'));

app.get('/api/products/list', (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);
  
  const start = (page - 1) * size;
  const end = start + size;
  
  const productList = itemListData.slice(start, end).map(item => ({
    id: item.id,
    item_name: item.item_name,
    item_image: item.item_image,
    item_price: item.item_price
  }));

  res.json(productList);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  const product = itemListData.find(item => item.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(4500, () => {
  console.log('Server is running on port 4500');
});
