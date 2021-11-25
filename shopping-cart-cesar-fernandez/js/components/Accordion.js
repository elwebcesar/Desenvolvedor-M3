export const accordion = (domAccordion) => {
    for (let i = 0; i < domAccordion.length; i++) {
        domAccordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
    
        let panel = this.nextElementSibling;
    
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
}