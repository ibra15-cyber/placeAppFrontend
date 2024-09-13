//mimick a cart
//push items (obj) to carts
//if item in cart increament the number
//else add item to cart

const cart = {
  cartItems: [],
};

const bag = {
  id: "1",
  name: "bag",
  quantity: 0,
};

const shirt = {
  id: "2",
  name: "shirt",
};

const trouser = {
  id: "3",
  name: "trouser",
};

cart.cartItems.push(bag);

console.log(cart.cartItems);

const itemsInCart = cart.cartItems.map((item) => ({ ...item }));

console.log(itemsInCart); //cartItem is a list

const existItem = cart.cartItems.find((item) => item.id === 1);

const cartItemsNew = existItem
  ? cart.cartItems.map((item) =>
      item.id === existItem.id ? existItem.quantity + 1 : (item.quantity = 1)
    )
  : [...cart.cartItems];
console.log(cartItemsNew);

cart.cartItems.push(bag);
cart.cartItems.push(bag);
console.log(cartItemsNew);

// console.log(itemsInCart);
