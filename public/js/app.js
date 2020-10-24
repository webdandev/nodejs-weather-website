const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const locationBtn = document.querySelector('#location-btn')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading weather data'
  messageTwo.textContent=''
  
  fetch('/weather?address=' + location).then(response => {
    response.json().then((data) => {
      if (data.error){
        messageOne.textContent = data.error       
      } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast      
      }
    })
  })
})

locationBtn.addEventListener('click', () => {

  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition( (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    messageOne.textContent = 'Loading weather data'
    messageTwo.textContent=''

    fetch('/location?latitude='+ latitude + '&longitude=' + longitude).then(response => {
      response.json().then((data) => {
        if (data.error){
          messageOne.textContent = data.error       
        } else {  
            messageOne.textContent = ''
            messageTwo.textContent = data.forecast      
        }

      })
    })
  })  
})







