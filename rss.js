const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

const cors = 'https://cors-anywhere.herokuapp.com/'
// const cors = 'http://crossorigin.me/'

const baseURL = 'http://mantis.starlinetecnologia.com.br/issues_rss.php?username=unifoa.pedro&key=IFVNAsk03YU3kRf7wbh6ts6ZMGggWVRUzPIQfjRk3iHq3LrkeVcU9l0Ck_7QeQo2AOutUdVPoHqTB9x5XXYO'


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

    // < article >
    // <h1>${titulo}</h1> <br>
    //     <h1>${descricao}</h1>
    //     <h1>${data}</h1><br>
    //         <h1>${categoria}</h1><br>
    //         </article>