const numberOfWeeks = 8;

let listOfWeek = document.getElementById("weekList");

for (let i = 1; i <= numberOfWeeks; i++) {
    let li = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', `week${[i]}/index.html`);
    link.textContent= `Week ${[i]}`;
    li.appendChild(link);
    listOfWeek.appendChild(li)
}