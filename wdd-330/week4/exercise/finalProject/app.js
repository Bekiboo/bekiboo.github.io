fetch('http://127.0.0.1:5500/week4/exercise/finalProject/childrenList.json')
    .then((response) => response.json())
    .then((listOfChild) => {
        console.log(listOfChild);

        m = 0
        f = 0
        
        for (let i = 0; i < listOfChild.length; i++) {
            if (listOfChild[i].gender == 'M') {
                m += 1                           
            } else {
                f += 1
            }
        }

        console.log(m);
        console.log(f);
    });

