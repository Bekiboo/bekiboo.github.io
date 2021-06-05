fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
    .then((response) => response.json())
    .then((listOfChild) => {
        console.log(listOfChild);


    });




    // https://akabab.github.io/superhero-api/api/
    // https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json