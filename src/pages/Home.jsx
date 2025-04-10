import { useEffect, useState, useRef } from 'react'


import Start from '../components/Start'
import Question from '../components/Question'

export default function Home({socket, userId}) {
	const [currentScreen, setCurrentScreen] = useState('start')
	const [showQuestionResult, setShowQuestionResult] = useState(false)
	const [quizResults, setQuizResults] = useState({})
	let results = useRef()



// useEffect(()=>{
	if(socket.current) {
		socket.current.onmessage = async (event) => {
			const message =  JSON.parse(event.data)
			//  console.log(`message => `,message)

			if (message.event === 'settings' || message.event === 'connection') {
				message.screen && setCurrentScreen(message.screen);
			}

			if (message.event === 'clearquestion') {
				checkResult(currentScreen)
				setShowQuestionResult(false)
			}

			if (message.event === 'answer') {
				if (message.answerID && message.id === userId) setShowQuestionResult(message.answerID)
				checkVoted(currentScreen);
				checkResult(currentScreen)
			}
			if (message.event === 'checkvoteduser') {
				 setShowQuestionResult(message.votingID ? message.votingID : false)
			}

			if(message.event === 'checkresult') {
				// setQuizResults(message.results)
				results.current = message.results ? message.results : null
				setQuizResults(message.results)
			}

		}
	}



	// }, [])

	useEffect(() => {
		if (!isNaN(currentScreen)) {checkVoted(currentScreen); /* console.log('checkVoted', currentScreen) */}
		if (!isNaN(currentScreen)) {checkResult(currentScreen); /* console.log('checkResult', currentScreen) */}

	}, [currentScreen, showQuestionResult])

	function selectAnswer(answerID, questionID) {
		let message = {
			event: 'answer',
			answerID,
			questionID,
			id: userId,
		}
		socket?.current?.send(JSON.stringify(message))
		checkVoted(questionID)
		checkResult(questionID)
	}
	function checkVoted(questionID) {
		let message = {
			event: 'checkvoteduser',
			questionID,
			id: userId,
		}
		if(questionID !== 'start') socket?.current?.send(JSON.stringify(message))

	}
	function checkResult(questionID) {
		let message = {
			event: 'checkresult',
			questionID,
		}
		socket?.current?.send(JSON.stringify(message))
	}
	function percentage(id) {
		let count = 0
		let total = 0
		if(results.current) total = results.current.reduce((acc, n) => acc + n.count, 0)

		if(results.current) results.current.forEach(res => {
			if(res._id === id) {
				count = res.count
			}
		})

		let percentage = count / total * 100
		//   console.log(`total => `,total)
		//    console.log(`count => `,count)
		return Math.round(percentage) | 0
	}

	return (
		<>
			{currentScreen === 'start' ? (
				<Start />
			) : (
				<Question
					currentScreen={currentScreen}
					selectAnswer={selectAnswer}
					showQuestionResult={showQuestionResult}
					checkVoted={checkVoted}

					percentage = {percentage}
					/>
			)}


		</>
	)
}