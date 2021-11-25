export const selectOrder = (contentSelect, orderProducts) => {
    let selElmnt;

    for (let i = 0; i < contentSelect.length; i++) {
        selElmnt = contentSelect[i].getElementsByTagName("select")[0];

        let domCreateView = document.createElement("div");
        domCreateView.setAttribute("class", "select-selected");
        domCreateView.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        contentSelect[i].appendChild(domCreateView);

        let domCreateHide = document.createElement("DIV");
        domCreateHide.setAttribute("class", "select-items select-hide");

        for (let j = 1; j < selElmnt.length; j++) {
            let valueOption = selElmnt.options[j].value;
            let domCreateHideDiv = document.createElement("div");
            domCreateHideDiv.innerHTML = selElmnt.options[j].innerHTML;

            domCreateHideDiv.addEventListener("click", function(e) {

                orderProducts(valueOption);

                let elmentNameSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
                let elementPrevious = this.parentNode.previousSibling;

                for (let i = 0; i < elmentNameSelect.length; i++) {
                    if (elmentNameSelect.options[i].innerHTML == this.innerHTML) {
                        elmentNameSelect.selectedIndex = i;
                        elementPrevious.innerHTML = this.innerHTML;

                        let elmentNameSelectThis = this.parentNode.getElementsByClassName("same-as-selected");

                        for (let k = 0; k < elmentNameSelectThis.length; k++) {
                            elmentNameSelectThis[k].removeAttribute("class");
                        }

                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                elementPrevious.click();
            });
            
            domCreateHide.appendChild(domCreateHideDiv);
        }

        contentSelect[i].appendChild(domCreateHide);

        domCreateView.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    const closeAllSelect = (elmnt) => {    
        let itemItems = document.getElementsByClassName("select-items");
        let itemSelected = document.getElementsByClassName("select-selected");
        let i, arrNo = [];

        for (let i = 0; i < itemSelected.length; i++) {
            if (elmnt == itemSelected[i]) {
                arrNo.push(i)
            } else {
                itemSelected[i].classList.remove("select-arrow-active");
            }
        }

        for (i = 0; i < itemItems.length; i++) {
            if (arrNo.indexOf(i)) {
                itemItems[i].classList.add("select-hide");
            }
        }
    }

    document.addEventListener("click", closeAllSelect);
}