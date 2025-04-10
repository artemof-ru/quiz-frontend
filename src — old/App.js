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
	const [currentScreen, setCurrentScreen] = useState(0)
	const [currentUsers, setCurrentUsers] = useState(0)

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
			if(message.screen) setCurrentScreen(message.screen)
			if(message.clients) setCurrentUsers(message.clients)
			console.log(`message => `,message)

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
					<Route path='/admin' element={<Admin socket={socket} userId={userId} currentClientScreen={currentScreen} />} />

					<Route path='/admin/q-1/' element={<AdminQuizOne socket={socket} userId={userId} currentScreen={currentScreen} currentUsers={currentUsers} />} />
					<Route path='/admin/q-2/' element={<AdminQuizTwo socket={socket} userId={userId} currentScreen={currentScreen} currentUsers={currentUsers} />} />
					<Route path='/admin/q-3/' element={<AdminQuizThree socket={socket} userId={userId} currentScreen={currentScreen} currentUsers={currentUsers} />} />
					<Route path='/admin/q-4/' element={<AdminQuizFour socket={socket} userId={userId} currentScreen={currentScreen} currentUsers={currentUsers} />} />
				</Routes>
			</Router>

		</div>
	)
}

export default App
