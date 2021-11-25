export const listRadios = (listJson,dom,name) => {
    const list = listJson.map(function(element) {
        let valueRadio = '';
        let spanName = `<span>${element.name}</span>`
        let labelName = element.name;

        if( name != 'price' ) {
            valueRadio = element.id;

            if( name === 'size' ) {
                spanName = '';
                labelName = '';
            }
        }
        else {
            valueRadio = element.min+':'+element.max;
        }

        return `
            <div>
                <input type="radio" id="${name}${element.id}" name="${name}" value="${valueRadio}" />
                <label for="${name}${element.id}" data-name="${element.name}"><span>${spanName}</span></label>
            </div>
        `
    });

    dom.innerHTML = list.join('\n');
}