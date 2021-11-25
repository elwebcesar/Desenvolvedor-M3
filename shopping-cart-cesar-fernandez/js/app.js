// --------------------------------------------------------------------------------
// JSON
// --------------------------------------------------------------------------------
import { products } from './json/products.js';
import { colors } from './json/colors.js';
import { sizes } from './json/sizes.js';
import { ranks } from './json/ranks.js';

// objects json
const productsJson = products.products;
const colorsJson = colors.colors;
const sizesJson = sizes.sizes;
const ranksJson = ranks.ranks;


// --------------------------------------------------------------------------------
// COMPONENTS
// --------------------------------------------------------------------------------
import { listRadios } from './components/ListRadios.js';
import { productsMap } from './components/ProductsMap.js';
import { productsLoad } from './components/ProductsLoad.js';
import { productsOrder } from './components/ProductsOrder.js';
import { filterProduct } from './components/Filter.js';
import { selectOrder } from './components/SelectOrder.js';
import { accordion } from './components/Accordion.js';


// --------------------------------------------------------------------------------
// VARIABLES
// --------------------------------------------------------------------------------

// filter
let filterConsult = {
    color: [],
    size: [],
    price: {
        min: 0,
        max: 0
    }
};


// items load
let itemsIn = 0;
let itemsOut = 3;
const itemsTotal = Object.keys(productsJson).length;
const itemsInitials = {itemsIn,itemsOut};


// MAP PRODUCTS, duplicate Object - config LIMITS
let productsListMap = productsMap(productsJson,itemsIn, itemsOut);
let tmpProducts = [...productsListMap];
let tmpProductsFilter = [];

itemsIn = itemsIn + itemsOut;
itemsOut = itemsOut + itemsOut;


// shopping cart
const shoppingCart = [];


// --------------------------------------------------------------------------------
// FUNCTIONS
// --------------------------------------------------------------------------------
const orderProducts = (value) => {
    tmpProducts = productsOrder(value, tmpProducts);
    productsLoad(tmpProducts,shoppingCart);
}

const reloadProducts = (thisBottom, btnReset) => {
    btnReset.disabled = false;

    if( itemsIn <= itemsTotal) {
        productsListMap = productsMap(productsJson,itemsIn, itemsOut);
        tmpProducts = [...tmpProducts, ...productsListMap];
        tmpProducts = filterProduct(tmpProducts,filterConsult);

        productsLoad(tmpProducts,shoppingCart);

        itemsIn = itemsOut;
        itemsOut = itemsOut + itemsOut;
    }
    else {
        thisBottom.disabled = true;
    }    
}

const resetProducts = (thisBottom, btnReload) => {
    filterConsult = {
        color: [],
        size: [],
        price: {
            min: 0,
            max: 0
        }
    };
    
    thisBottom.disabled = true;
    btnReload.disabled = false;

    itemsIn = itemsInitials.itemsIn;
    itemsOut = itemsInitials.itemsOut;

    productsListMap = productsMap(productsJson,itemsIn, itemsOut);
    tmpProducts = [...productsListMap];
    productsLoad(productsListMap,shoppingCart);

    itemsIn = itemsIn + itemsOut;
    itemsOut = itemsOut + itemsOut;

    document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
}


const btnReset = document.getElementById("btnReset");
const btnReload = document.getElementById("btnReload");

const noProducts = (btnReset, btnReload) => {
    btnReset.disabled = false;
    btnReload.disabled = true;
}

// --------------------------------------------------------------------------------
// innerHTML
// --------------------------------------------------------------------------------
// colors
listRadios(colorsJson,document.getElementById("colors"),"color");

// sizes
listRadios(sizesJson,document.getElementById("sizes"),"size");

// ranks
listRadios(ranksJson,document.getElementById("ranks"),"price");

// products
productsLoad(productsListMap,shoppingCart,noProducts,btnReset, btnReload);


// --------------------------------------------------------------------------------
// Listeners
// --------------------------------------------------------------------------------

// filters
const listenerProductsLoad = function () {
    if( this.name == 'price' ) {
        let vals = this.value.split(':');
        filterConsult.price = {min: vals[0],max: vals[1]};
    }
    else {
        filterConsult[this.name] = [+this.value];
    }

    tmpProductsFilter = filterProduct(tmpProducts,filterConsult);
    productsLoad(tmpProductsFilter,shoppingCart,noProducts,btnReset, btnReload);
}

const inputRadios = document.querySelectorAll(".custom-radio input");
inputRadios.forEach(radio => {
	radio.addEventListener("click", listenerProductsLoad);
});

// order
const contentSelect = document.getElementsByClassName("custom-select");
selectOrder(contentSelect, orderProducts);

const btnOrder = document.getElementsByName('btnOrder');
btnOrder.forEach(button => button.addEventListener("click", function() {
    orderProducts(button.value);
    closeFull();
}));

// reload
btnReload.addEventListener("click", function() {
    reloadProducts(this,btnReset)
});

// reset
btnReset.addEventListener("click", function() {
    resetProducts(this,btnReload)
});

// Accordion
let domAccordion = document.getElementsByClassName("accordion");
accordion(domAccordion);

// full desponsive
const fullFilters = document.getElementById("fullFilters");
const fullOrder = document.getElementById("fullOrder");
const whiteOver = document.getElementById("white-over");

const closeFull = () => {
    fullOrder.classList.remove("active");
    fullFilters.classList.remove("active");
    whiteOver.classList.remove("active");    
}

const closeFullResponsive = document.getElementsByName('closeFullResponsive');
closeFullResponsive.forEach(button => button.addEventListener("click", function() {
    closeFull();
}));

const btnFullOrdenar = document.getElementById("btnFullOrdenar");
btnFullOrdenar.addEventListener("click", function() {
    fullOrder.classList.add("active");
    whiteOver.classList.add("active");
});

const btnFullFiltrar = document.getElementById("btnFullFiltrar");
btnFullFiltrar.addEventListener("click", function() {
    fullFilters.classList.add("active");
    whiteOver.classList.add("active");
});


const btnResetFilter = document.getElementById("btnResetFilter");
btnResetFilter.addEventListener("click", function() {
    resetProducts(btnReset,btnReload)
});

const btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click", function() {
    closeFull();
});