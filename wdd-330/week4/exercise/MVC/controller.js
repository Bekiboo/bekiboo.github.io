import {view, form} from './view.js';
import Item from './model.js';

const controller = {
    watch(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // prevent the form from being submitted
            this.add(form.name.value)
        }, false);
    },
    add(name) {
        const item = new Item(name);
        view.render(item);
    }
};

controller.watch(form);

export default controller