import React, {useRef, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminQuizOne from './pages/q-1';
import AdminQuizTwo from './pages/q-2';
import AdminQuizThree from './pages/q-3';
import AdminQuizFour from './pages/q-4';


import './App.css'

function App() {

	const socket = useRef() // чтобы сокет не пропадал от рендера к рендеру
	const [connected, setConnected] = useState(false) // подключены мы к серверу или нет?
	const [userId, setUserId] = useState('')
	// const [userId, setUserId] = useState(localStorage.getItem('id') ? localStorage.getItem('id') : '')
	// const [currentScreen, setCurrentScreen] = useState('start')
	// const [currentUsers, setCurrentUsers] = useState(0)

	useEffect(() => {
		// if (localStorage.getItem('id')) {
		// 	setUserId(localStorage.getItem('id'))
		// } else {
		// 	const id = Date.now()
		// 	setUserId(id)
		// 	localStorage.setItem('id', id)
		// 	 console.log(`id => `,id)
		// }
		// if(userId && !connected) connect()

		if(userId) {
			if(!connected) connect()
		} else {
			const id = localStorage.getItem('id') ? localStorage.getItem('id') : Date.now()
			setUserId(id)
			localStorage.setItem('id', id)
		}
		// console.log(`userId => `, userId)
	}, [userId, connected])





	function connect () {
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
			// if(message.screen) setCurrentScreen(message.screen)
			console.log(`message => `,message)
			// if(message.clients) setCurrentUsers(message.clients)

		}

		// слушатель сработает в момент закрытия подключения
		socket.current.onclose = () => { console.log('Socket закрыт') }
		// слушатель сработает в момент ошибки
		socket.current.onerror = () => { console.log('Socket произошла ошибка') }
	}







	return (
		<div className="wrapper">
			<Router>
				<Routes>
					<Route path='/' element={<Home socket={socket} userId={userId} />}></Route>
					<Route path='*' element={<Home socket={socket} userId={userId} />}></Route>
					<Route path='/admin' element={<Admin socket={socket} userId={userId} />} />
				</Routes>
			</Router>

		</div>
	)
}

export default App
