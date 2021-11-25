export const productsMap = (productsJson,itemsIn, itemsOut) => {
    const productstMap = productsJson.slice(itemsIn, itemsOut).map(function(element) {
        return element;
    });
    return productstMap;
}