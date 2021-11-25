export const shoppingCartAdd = (domButton,shoppingCart) => {
    domButton.forEach(button => button.addEventListener("click", function() {
        shoppingCart.push(button.value);
        document.getElementById("shoppingCartAmount").innerHTML = shoppingCart.length;
    }));
}