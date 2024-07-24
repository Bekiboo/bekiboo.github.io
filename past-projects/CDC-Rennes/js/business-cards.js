const jsonBusiness = './data.json'

const renderBusinessCards = (num) => {
  fetch(jsonBusiness)
    .then((response) => response.json())
    .then((jsObject) => {
      const businessList = jsObject.businesses

      for (let i = 0; i < num; i++) {
        let businessCard = document.createElement('div')
        businessCard.classList.add('business-card')
        document.getElementById('businessCards').appendChild(businessCard)

        let businessLogo = document.createElement('img')
        businessLogo.setAttribute('src', 'img/' + businessList[i].logo)
        businessLogo.setAttribute('alt', 'Logo ' + businessList[i].name)
        businessCard.appendChild(businessLogo)

        let about = document.createElement('div')
        about.classList.add('about')
        businessCard.appendChild(about)

        let contact = document.createElement('div')
        contact.classList.add('contact')
        businessCard.appendChild(contact)

        let activity = document.createElement('p')
        activity.textContent = businessList[i].activity
        about.appendChild(activity)

        let yearFounded = document.createElement('p')
        yearFounded.textContent = 'Year Founded: ' + businessList[i].yearFounded
        about.appendChild(yearFounded)

        let annualRevenue = document.createElement('p')
        annualRevenue.innerHTML =
          'Annual Revenue: ' + '<br />' + businessList[i].annualRevenue
        about.appendChild(annualRevenue)

        let span = document.createElement('span')
        about.appendChild(span)

        let website = document.createElement('a')
        website.setAttribute('href', businessList[i].website)
        website.setAttribute('target', '_blank')
        website.textContent = businessList[i].website.slice(
          8,
          businessList[i].website.length - 1
        )
        contact.appendChild(website)

        let phone = document.createElement('p')
        phone.textContent = 'Phone: ' + businessList[i].phone
        contact.appendChild(phone)

        let headquarters = document.createElement('p')
        headquarters.textContent = businessList[i].headquarters
        contact.appendChild(headquarters)
      }
    })
}

mainId = document.getElementsByTagName('main')
mainIdName = mainId[0].id
if (mainIdName == 'mainHome') {
  renderBusinessCards(3)
} else {
  renderBusinessCards(7)
}
