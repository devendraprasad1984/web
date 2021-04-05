export default class Select {
    constructor(elem) {
        this.elem = elem
        this.options = getFormattedOptions(elem.querySelectorAll('option'))
        this.customContainerElement = document.createElement('div')
        this.customLabelElement = document.createElement('span')
        this.customOptionElement = document.createElement('ul')
        setupCustomSelect(this)
        elem.after(this.customContainerElement)
    }
    get selectedOption() {
        return this.options.find(o => o.selected)
    }
}

function setupCustomSelect(select) {
    select.customContainerElement.classList.add('custom-select-container')
    select.customLabelElement.classList.add('custom-select-label')
    select.customLabelElement.innerText = select.selectedOption.value
    select.customContainerElement.append(select.customLabelElement)

    select.customContainerElement.classList.add('custom-select-options')
    select.options.forEach(x => {
        const customLiElement = document.createElement('li')
        customLiElement.classList.add('custom-select-li')
        customLiElement.classList.toggle('selected', x.selected)
        customLiElement.innerText = x.label
        customLiElement.dataset.value = x.value
        select.customOptionElement.append(customLiElement)
    })
    select.customContainerElement.append(select.customOptionElement)
}

function getFormattedOptions(options) {
    return [...options].map(x => {
        return {
            value: x.value,
            label: x.label,
            selected: x.selected,
            element: x
        }
    })

}
