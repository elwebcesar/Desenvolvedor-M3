export const filterProduct = (tmpProductsFilter,filters) => {
    const filtersCondition = ['color','size','price'];

    filtersCondition.forEach(filter => {
        if(filters.hasOwnProperty(filter)) {
            if ( !filters[filter].hasOwnProperty('max') ) {
                if( filters[filter].length > 0 ) {
                    tmpProductsFilter = tmpProductsFilter.filter(e => {
                        if( e[filter].some(el => filters[filter].includes(el)) ){
                            return e;
                        }
                    });
                }
            }
            else {
                if( filters[filter].max > 0 ){
                    tmpProductsFilter = tmpProductsFilter.filter(e => e[filter] >= filters[filter].min && e[filter] <= filters[filter].max );
                }
            }
        }
    });

    return tmpProductsFilter;
};