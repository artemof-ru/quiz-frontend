import { useEffect, useState, useRef } from "react"
import AdminQuestionsList from '../components/AdminQuestionsList'
import AdminQuestion from '../components/AdminQuestion'

export default function Admin({socket, userId}) {

	const [adminListOrQuestion, setAdminListOrQuestion] = useState('start')
	const [adminShowQuestion, setAdminShowQuestion] = useState(0)

	const [clientCurrentScreen, setClientCurrentScreen] = useState('start')
	const [currentUsers, setCurrentUsers] = useState(0)
	const [countVoted, setCountVoted] = useState(0)
	const [quizResults, setQuizResults] = useState({})

	let [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') ? true :false);

	let adminResults = useRef()


	// useEffect(() => {
		// checkResult(adminShowQuestion)
	// }, [adminShowQuestion, adminResults])

	// useEffect(()=>{
		if(socket.current) socket.current.onmessage = async (event) => {
			const message = JSON.parse(event.data)
			//  console.log(`message => `,message)
			if(message.screen) setClientCurrentScreen(message.screen)
			if(message.clients) setCurrentUsers(message.clients)

			// if(message.clients) setCurrentUsers(message.clients)

			if (message.event === 'answer') {
				if (message.screen === adminShowQuestion) {
					checkResult(adminShowQuestion)
					checkCountVoted(adminShowQuestion)
					console.log('ОБНОООВА')
				}
			}
			if(message.event === 'checkresult') {
				// adminResults.current = message.results ? message.results : null

			}
			if(message.event === 'admincheckresult') {
				adminResults.current = message.results ? message.results : null
				setQuizResults(message.results)
			}
			if(message.event === 'countvoted') {
				setCountVoted(message.countvoted)
				 console.log(`countVoted => `,countVoted)
			}
			// if(!isNaN(adminShowQuestion))


		}
	// })
	useEffect(() => {
		 checkResult(adminShowQuestion)
		 checkCountVoted(adminShowQuestion)
	}, [adminShowQuestion])

	useEffect(()=> {
		document.title = "Администратор"
	})

	function checkAdminForm(e) {
		e.preventDefault();
		if( e.target[0].value === 'admin' && e.target[1].value === 'd#(F*$DO' ) {
			setIsAdmin(true)
			localStorage.setItem('admin', true)
		}
	}


	function changeClientScreen(num) {
		let message = {
			event: 'settings',
			screen: num,
			id: userId,
			admin: true
		}
		socket?.current?.send(JSON.stringify(message))
	}


	// question
	function changeAdminShowScreen(value) {
		setAdminListOrQuestion(value)
		setAdminShowQuestion(value)
		 console.log(`value => `,value)
		// checkResult(value, true)
	}

	function selectAnswer(answerID, questionID) {
		let message = {
			event: 'answer',
			answerID,
			questionID,
			id: userId,
			admin: true
		}
		socket?.current?.send(JSON.stringify(message))
		checkResult(adminShowQuestion)
		checkCountVoted(adminShowQuestion)
	}

	function checkResult(questionID, broadcast) {
		let message = {
			event: 'admincheckresult',
			questionID,
			admin: true,
			adminScreen: adminShowQuestion,
			noBroadcast: broadcast
		}
		socket?.current?.send(JSON.stringify(message))
	}

	function checkCountVoted(questionID) {
		let message = {
			event: 'countvoted',
			questionID,
		}
		if(questionID !== 'start') socket?.current?.send(JSON.stringify(message))
	}


	function percentage(id) {
		let count = 0
		let total = 0
		if(adminResults.current) total = adminResults.current.reduce((acc, n) => acc + n.count, 0)
		if(adminResults.current) adminResults.current.forEach(res => {
			if(res._id === id) count = res.count
		})
		let percentage = count / total * 100
		return Math.round(percentage) | 0
	}



	return (
		<>
			{!isAdmin ? (
				<form onSubmit={(e) => checkAdminForm(e)}>
					<input className="form__input" type="text" name="login" placeholder="Логин" />
					<input className="form__input" type="password" name="password" placeholder="Пароль" />
					<button className="form__btn">Войти</button>
				</form>
			) : (

				<div className="admin-page">
					{adminListOrQuestion === 'start' ? (
						<AdminQuestionsList
							clientCurrentScreen={clientCurrentScreen}
							changeAdminShowScreen={ changeAdminShowScreen }
							changeClientScreen={changeClientScreen}
							/>
					) : (
						<AdminQuestion
							clientCurrentScreen={clientCurrentScreen}
							adminShowQuestion={adminShowQuestion}
							changeAdminShowScreen={ changeAdminShowScreen }
							changeClientScreen={changeClientScreen}
							selectAnswer={selectAnswer}

							currentUsers={currentUsers}
							countVoted={countVoted}


							percentage = {percentage}
							/>
					)}
				</div>
			)}
		</>
	)


}