const model = {
  url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json',

  heroesList: [],

  getJSON(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  // Local Storage Helpers
  readFromLS(key) {
    return JSON.parse(localStorage.getItem(key))
  },

  writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
}

export { model as default }
