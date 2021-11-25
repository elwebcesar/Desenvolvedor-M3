export const productsOrder = (orderType, tmpProductsOrder) => {
    const orderObj = tmpProductsOrder.sort(function (a, b) {
        switch (orderType) {
            case '1':
                return b.id - a.id;
            break;
            case '2':
                return a.price - b.price;
            break;
            default:
                return b.price - a.price;
              break;
          }
    });

    return orderObj;
}