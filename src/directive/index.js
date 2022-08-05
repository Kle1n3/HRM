export const imgError = {
    inserted(el, binding) {
        el.onerror = () => {
            el.src = binding.value;
        }
    },
    componentUpdated(dom, options) {
        dom.src = dom.src || options.value
    },
}

export const aa = () => { };
export const bb = () => { };
