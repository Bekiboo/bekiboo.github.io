import QuakesController from './QuakesController.js';

const radiusBtn = document.getElementById('radiusBtn')
let radius = document.getElementById('radiusInput')

radiusBtn.addEventListener('click', () => {
    const myQuakesController = new QuakesController('#quakeList', parseInt(radius.value));
    myQuakesController.init();
})