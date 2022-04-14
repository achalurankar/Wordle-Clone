import './styles.css'

export default class Toast {

    #toastElement
    #autoclose = true //default
    #duration = 2000; //default
    #intervalId

    constructor(options) {
        this.#toastElement = document.createElement('div');
        this.#toastElement.classList.add('toast');
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value;
        })
        if(this.#autoclose) {
            this.#intervalId = window.setTimeout(() => {
               this.remove();
            }, this.#duration); 
        }
    }

    set onClick(value) {
        this.#toastElement.addEventListener('click', () => {
            value.call();
            this.remove();
            if(this.#intervalId)
                window.clearInterval(this.#intervalId)
        })
    }

    set autoclose(value) {
        this.#autoclose = value;
    }

    set duration(value) {
        this.#duration = value;
    }

    set text(value) {
        this.#toastElement.textContent = value;
    }

    set position(value) {
        //selector for current container
        const selector = `.toast-container[data-position = ${value}]`
        //get container from document if exists else create new
        const container = document.querySelector(selector) || createElement(value)
        //stack up toast message to container
        container.insertBefore(this.#toastElement, container.firstChild);
    }

    remove() {
        const container = this.#toastElement.parentElement;
        this.#toastElement.remove();
        if(container.hasChildNodes()) return
        container.remove();
    }
}

function createElement(position) {
    const container = document.createElement('div');
    container.classList.add('toast-container');
    container.dataset.position = position;
    document.body.appendChild(container);
    return container;
}