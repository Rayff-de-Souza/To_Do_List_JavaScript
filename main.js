class Tasks {
	constructor(container){
		this.container = container
		this.cards = [
			{
				id: 0,
				task: 'Type something to add a new task',
				color: 'green'
			},
		]
		this.init()
	}

	loadCards = () => {
		var contador = 0
		this.container.innerHTML = ''
		for(let task of this.cards){
			this.container.innerHTML += `
				<div class="card" id=${task.id} data-color=${task.color}>
					<div class="card-color"></div>
					<div class="card-title"><h3>Card ${task.id}</h3></div>
					<div class="card-body" contenteditable><p>${task.task}</p></div>
					<div class="card-remove"><button class="btn-remove">X</button></div>
				</div>
			`
			contador++
		}
		const buttons = document.querySelectorAll('.btn-remove')
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const element = event.target
				this.removeCard(element)
			})
		})
		console.log(this.cards)
	}

	removeCard = (target) => {
		const idElement = target.parentNode.parentNode.id
		this.cards.map((card, index) => {
			card.id == idElement ? this.cards.splice(index, 1) : 'diferente'
			return card
		})
		console.log(this.cards)
		this.loadCards()
	}

	verifyValues = () => {
		console.log('function called')
		const task = document.getElementById('task')
		const color = document.getElementById('color')
		const id = !!this.cards.length ? this.cards[this.cards.length - 1].id + 1 : 1
		
		task.value.length > 0 ?
		this.cards.push({ id: id, task: task.value, color: color.value })
		:
		document.getElementById('container-error').dataset.disabled = 'enabled'

		this.loadCards()
	
		/* reset values */
		task.value = ''
		color.value = 'green'
	}

	updateCard = (element) => {
		console.log(element)
		const cardId = element.parentNode.id
		const cardValue = element.querySelector('p').innerHTML
		const newArr = cardValue != '<br>' ? this.cards.map((card) => {
			card.id == cardId ? card.task = cardValue : console.log('diferente')
			return card
		})
		:
		console.log('value error')

		cardValue != '<br>' ? this.cards = newArr : console.log('value error')
		this.loadCards()
	}

	init = () => {
		this.loadCards()
		document.getElementById('btn-append').addEventListener('click', () => {
			this.verifyValues()
		})

		/* error */
		document.querySelector('#button-close-error > button').addEventListener('click', () => {
			document.getElementById('container-error').dataset.disabled = 'disabled'
		})

		
		const cardBodies = document.querySelectorAll('.card-body')
		console.log(cardBodies)
		cardBodies.forEach(element => {
			element.addEventListener('blur', (event) => {
				this.updateCard(event.target)
			})	
		});
	}
}

window.addEventListener('load', () => {
	const tasks = new Tasks(document.getElementById('tasks-container'))
})

var nums = [1, 2, 3, 4, 5, 6, 7]
console.log(nums)
nums.splice(1, 1)
console.log(nums)