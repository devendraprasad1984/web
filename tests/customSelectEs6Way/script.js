import Select from "./select.js";

const selectElement=document.querySelectorAll('[data-custom-select]')
selectElement.forEach(curSel=>{
    console.log(new Select(curSel))
})
