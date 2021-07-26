export function qs(selector) {
    // console.log('qs fired');
    let selected = document.querySelector(selector)
    return (selected.length === 0 ? null : selected)
}

export function onTouch(elementSelector, callback) {
    // console.log('onTouch fired');
    if (window.matchMedia("(pointer: coarse)").matches) { // checks if touchscreen
        elementSelector.addEventListener('touchend', callback)
    } else {
        elementSelector.addEventListener('click', callback)
    }
};