const gridBtn = document.getElementById('gridBtn')
const listBtn = document.getElementById('listBtn')

const cardDisplay = document.getElementById('businessCards')

gridBtn.onclick = () => {
  cardDisplay.classList.add('grid')
  cardDisplay.classList.remove('list')
}

listBtn.onclick = () => {
  cardDisplay.classList.add('list')
  cardDisplay.classList.remove('grid')
}
