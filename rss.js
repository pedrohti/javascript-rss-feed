// If you need CORS
const cors = 'https://cors-anywhere.herokuapp.com/'
// const cors = 'http://crossorigin.me/'

const baseURL = 'URL_HERE'


fetch(cors + baseURL)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(dados => {
        moment.locale('pt-BR');
        let html = ``
        
        const items = dados.querySelectorAll("item")

        var chamado, titulo, descricao, data, categoria

        var array = []
        
        items.forEach(item => {
            chamado = item.querySelector("title").innerHTML.slice(0, 7)
            titulo = item.querySelector("title").innerHTML.replace(/[0-9]|:/g,"")            
            descricao = item.querySelector("description").innerHTML.replace(/[|<|!|[|C|D|A|T|A|]|>|]|/g, '')
            data = moment(item.querySelector("pubDate").innerHTML).format('L')
            categoria = item.querySelector("category").innerHTML

            // Simple example code, the exibition on Index can be changed.

            array.push([chamado, descricao, data])


            // html += `
            //         <li><b>${chamado}</b> - ${descricao} (${data})</li>
            //     </ul>
            // `

        })

        $('#tblChamados').DataTable({
            data: array,
            columns: [
              { title: 'Chamado' },
              { title: 'Descrição' },
              { title: 'Data' }
            ]
          })
        console.log(array)
        // document.body.insertAdjacentHTML("beforeend", html)
    })
