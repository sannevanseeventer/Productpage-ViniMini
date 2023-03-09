import express from 'express'

const url = 'https://api.vinimini.fdnd.nl/api/v1'

// Maak een nieuwe express app
const app = express()


// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {

  let homeUrl = url + '/'

  fetchJson(homeUrl).then((data) => {
    response.render('index', data)
  })
})

// Overzichtspagina
app.get('/producten', (request, response) => {
    let productenUrl = url + '/producten'
    
    fetchJson(productenUrl).then((data) => {
      response.render('producten', data)
    })
  })

  // Detail pagina
app.get('/detail', (request, response) => {
  let slug = request.query.detailSlug || 'titel'
  let detailUrl = url + '/producten/' + slug
  fetchJson(detailUrl).then((data) => {
    // console.log(data)
    response.render('detail', data)
  })
})

// Over Vini mini
app.get('/over', (request, response) => {
  response.render('over')
})

// Contact pagina Vini mini
app.get('/contact', (request, response) => {
  response.render('contact')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}