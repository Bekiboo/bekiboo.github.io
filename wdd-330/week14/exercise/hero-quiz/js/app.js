window.onload = () => {
    controller.displayResults(model.baseURL)
}

// -------------------------------- MODEL -------------------------------- //
const model = {
    baseURL: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json',

    getData(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                controller.displayResults(data, view.main)

                console.log(data)
            });
    },
}

// -------------------------------- VIEW -------------------------------- //
const view = {
    main: document.querySelector('main'),

    renderPokemonList(data) {

    }

}

// ------------------------------ CONTROLLER ------------------------------ //
const controller = {
    displayResults(url) {
        // Display list of results within selector
        model.getData(url)
        view.renderPokemonList(data)
    },
}