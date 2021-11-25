import { shoppingCartAdd } from './ShoppingCartAdd.js';

export const productsLoad = (productsListMap, shoppingCart, noProducts, btnReset, btnReload) => {
    const elementProducts = document.getElementById("products");
    const routeImages = "./products/"

    let productsList = productsListMap.map(function(element) {
        return `
            <li>
                <div>
                    <figure>
                        <img src="${routeImages}${element.image}" alt="${element.name}" title="${element.name.toUpperCase()}" />
                    </figure>
                    <h3>${element.name}</h3>
                    <h4>${element.price_view}</h4>
                    <p>até ${element.until} x ${element.until_price}</p>
                    <button type="button" name="btnProduct" value="${element.id}">COMPRAR</button>
                </div>
            </li>
        `;
    });


    if( productsList.length <= 0 ) {
        setTimeout(function(){
            document.getElementById("btnReset").classList.toggle("active");
            elementProducts.innerHTML = '<p>não há referências</p>';
            noProducts(btnReset,btnReload);
        }, 200); 
    }
    else {
        elementProducts.innerHTML = productsList.join('\n');
        
    }

    const productButton = document.getElementsByName('btnProduct');
    shoppingCartAdd(productButton,shoppingCart);
}