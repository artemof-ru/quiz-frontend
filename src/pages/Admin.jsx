import { useEffect, useState, useRef } from "react"
import AdminQuestionsList from '../components/AdminQuestionsList'
import AdminQuestion from '../components/AdminQuestion'

export default function Admin({socket, userId}) {

	const [adminListOrQuestion, setAdminListOrQuestion] = useState('start')
	const [adminShowQuestion, setAdminShowQuestion] = useState(0)

	const [clientCurrentScreen, setClientCurrentScreen] = useState('start')
	const [currentUsers, setCurrentUsers] = useState(0)


	const [quizResults, setQuizResults] = useState({})

	let adminResults = useRef()

	// results.current = message.results ? message.results : null

	if(socket.current) socket.current.onmessage = async (event) => {
		const message = JSON.parse(event.data)
		if(message.screen) setClientCurrentScreen(message.screen)

		console.log(`message => `,message)
		// if(message.clients) setCurrentUsers(message.clients)

		if (message.event == 'answer') {
			// checkResult(adminShowQuestion)
		}
		if(message.event == 'checkresult') {
			adminResults.current = message.results ? message.results : null
			// setQuizResults(message.results)
		}

	}


	useEffect(() => {
		// if (!isNaN(adminShowQuestion)) {checkResult(adminShowQuestion); /* console.log('checkResult', adminListOrQuestion) */}
		checkResult(adminShowQuestion)
		// console.log('checkResult', adminListOrQuestion)
	}, [adminShowQuestion, adminResults])



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

		checkResult(value)
		// if (!isNaN(value)) checkResult(value)
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
	}

	function checkResult(questionID) {
		let message = {
			event: 'checkresult',
			questionID,
			admin: true,
			adminScreen: adminShowQuestion
		}
		socket?.current?.send(JSON.stringify(message))
	}



	function percentage(id) {
		let count = 0
		let total = 0
		if(adminResults.current) total = adminResults.current.reduce((acc, n) => acc + n.count, 0)

		if(adminResults.current) adminResults.current.forEach(res => {
			if(res._id == id) {
				count = res.count
			}
		})

		let percentage = count / total * 100
		//   console.log(`total => `,total)
		//    console.log(`count => `,count)
		//  console.log(`adminResults.current => `,adminResults.current)
		//  console.log(`percentage => `,percentage)
		return Math.round(percentage) | 0
	}



	return (
		<>
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

						percentage = {percentage}
						/>
				)}
			</div>
		</>
	)


}