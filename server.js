const express = require('express');
const cart = require('./cart_items')

const port = 3000;
const app = express();


app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

app.get('/cart-items', (_, res) => {
    res.status(200);
    res.json(cart);
});
// 2. GET /cart-items/:id
// a. Action: None
// b. Response: a JSON object of the item with the given ID
// c. Response Code: 200 (OK)
// d. However, if the item with that ID cannot be found in the array, return a string
// response “ID Not Found” with response code 404 (Not Found)

app.get('/cart-items/:id', (req, res) => {
    cartItem = cart.find(function (element) {
        return element.id === parseInt(req.params.id);
    })
    if (cartItem === undefined) {
        res.status(404);
    } else {
        res.status(200);
    }
    res.json(cartItem)
});

//   3. POST /cart-items
// a. Action: Add a cart item to the array using the JSON body of the request. Also
// generate a unique ID for that item.
// b. Response: the added cart item object as JSON.
// c. Response Code: 201 (Created)
app.post('/cart-items', (req, res) => {
    const body = req.body;
    const ID = new Date().getTime();
    const newItem = {
        id: ID,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    };
    cart.push(newItem)
    res.json(newItem)
});


// 4. PUT /cart-items/:id
// a. Action: Update the cart item in the array that has the given id. Use the JSON
// body of the request as the new properties.
// b. Response: the updated cart item object as JSON.
// c. Response Code: 200 (OK).
app.put("/cart-items/:id", (req, res) => {
    const index = cart.findIndex(i => i.id === parseInt(req.params.id));
    const newItem = req.body;
    newItem.id = req.params.id;
    cart[index] = newItem

    res.status(200);
    res.json(cart[index]);
});

// 5. DELETE /cart-items/:id
// a. Action: Remove the item from the array that has the given ID.
// b. Response: Empty
// c. Response Code: 204 (No Content)
app.delete("/cart-items/:id", (req, res) => {
    const index = cart.findIndex(i => i.id === parseInt(req.params.id));
    if (index < 0) return res.status(404).json("The item was not found");

    cart.splice(index, 1);
    res.status(204);
    res.send();
});



