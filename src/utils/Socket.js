import userID from './UserID'

export const socket = {
	connect: () => {
		socket = new WebSocket('ws://localhost:5000')
	}

}



export function connect() {
	socket = new WebSocket('ws://localhost:5000')

	// слушатель сработает в момент подключения
	socket.onopen = (event) => {
		// setConnected(true)
		const message = {
			event: 'connection',
			id: userID
		}
		socket.send(JSON.stringify(message))
		console.log('Подключение установлено')
	}
	// слушатель сработает в момент сообщения
	socket.onmessage = (event) => {
		const message = JSON.parse(event.data)
		// if(message.screen) setCurrentScreen(message.screen)
		// if(message.clients) setCurrentUsers(message.clients)
		console.log(`message => `,message)

	}

	// слушатель сработает в момент закрытия подключения
	socket.onclose = () => { console.log('Socket закрыт') }
	// слушатель сработает в момент ошибки
	socket.onerror = () => { console.log('Socket произошла ошибка') }
	console.log(`socket => `,socket)
}

 console.log(`socket => `,socket)