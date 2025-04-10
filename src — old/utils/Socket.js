



export function connect(userId) {
	socket.current = new WebSocket('ws://localhost:5000')

	// слушатель сработает в момент подключения
	socket.current.onopen = (event) => {
		setConnected(true)
		const message = {
			event: 'connection',
			id: userId
		}
		socket.current.send(JSON.stringify(message))
		console.log('Подключение установлено')
	}
	// слушатель сработает в момент сообщения
	socket.current.onmessage = (event) => {
		const message = JSON.parse(event.data)
		if(message.screen) setCurrentScreen(message.screen)
		if(message.clients) setCurrentUsers(message.clients)
		console.log(`message => `,message)

	}

	// слушатель сработает в момент закрытия подключения
	socket.current.onclose = () => { console.log('Socket закрыт') }
	// слушатель сработает в момент ошибки
	socket.current.onerror = () => { console.log('Socket произошла ошибка') }
}