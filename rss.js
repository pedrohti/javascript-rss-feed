// If you need CORS
const cors = 'https://cors-anywhere.herokuapp.com/'
// const cors = 'http://crossorigin.me/'

const baseURL = 'PUT_URL_HERE'

fetch(cors + baseURL)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
        console.log(data)
        let html = ``
        const items = data.querySelectorAll("item")

        items.forEach(item => {
            // var chamado = item.querySelector("title").innerHTML.replace(/[a-zA-Z\s\W]|:/g,"")
            var chamado = item.querySelector("title").innerHTML.slice(0, 7)
            var titulo = item.querySelector("title").innerHTML.replace(/[0-9]|:/g,"")
            
            var descricao = item.querySelector("description").innerHTML.replace(/[|<|!|[|C|D|A|T|A|]|>|]|/g, '')
            var data = item.querySelector("pubDate").innerHTML
            var categoria = item.querySelector("category").innerHTML
            
            // Simple example code, the exibition on Index can be changed.
            
            html += `
                <ul>
                    <li>${chamado}</li>
                    <li>${titulo}</li>
                    <li>${descricao}</li>
                    <li>${data}</li>
                    <li>${categoria}</li>
                </ul>
            `
        })
        document.body.insertAdjacentHTML("beforeend", html)
    })
