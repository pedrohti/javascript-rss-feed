// If you need CORS
const cors = 'https://cors-anywhere.herokuapp.com/'
// const cors = 'http://crossorigin.me/'

const baseURL = 'URL'

fetch(cors + baseURL, {headers: {Authentication: `${token}`}})
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
			titulo = item.querySelector("title").innerHTML.replace(/[0-9]|:/g, "")
			descricao = item.querySelector("description").innerHTML.replace(/[|<|!|[|C|D|A|T|A|]|>|]|/g, '')
			data = moment(item.querySelector("pubDate").innerHTML).format('L')
			categoria = item.querySelector("category").innerHTML
			// link = item.querySelector("link").innerHTML

			// Simple example code, the exibition on Index can be changed.

			array.push([chamado, descricao, data])

			// html += `
			//         <li><a href="link?id=${chamado}" target='_blank'>${chamado}</a> - ${descricao} (${data})</li>
			//     </ul>
			// `

		})

		$('#tblChamados').DataTable({
			data: array,
			order: [[2, 'desc']],
			columns: [
				{ title: 'Chamado' },
				{ title: 'Descrição' },
				{ title: 'Data' },
			]
		})
		
		var table = $('#tblChamados').DataTable();

		$('#tblChamados tbody').on('click', 'tr', function () {
			var id = table.row(this).data();
			window.open(`?id=${id[0]}`, '_blank')
		} );

		console.log(array)
		// document.body.insertAdjacentHTML("beforeend", html)
	})
