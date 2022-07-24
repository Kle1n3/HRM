export const imgError = (el, binding) => {
    el.onerror = () => {
        el.src = binding.value
    }
}

export const aa = () => { }
export const bb = () => { }