const form = document.forms[0];
const view = {
    render(item) {
        const list = document.getElementById('list');
        const li = document.createElement('li');
        li.innerHTML = item.name;
        list.appendChild(li);
        // reset the input field
        form.name.value = '';
    }
};

export {view, form}