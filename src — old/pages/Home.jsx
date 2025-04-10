import { useEffect, useState } from 'react'


import Start from '../components/Start'
import Question from '../components/Question'

export default function Home({socket, userId}) {
	const [currentScreen, setCurrentScreen] = useState('start')
	const [showQuestionResult, setShowQuestionResult] = useState(false)
	const [results, setResults] = useState({})

	useEffect(()=>{
		 console.log(`Here  ===================================== ` )
		if(socket.current) {
			socket.current.onmessage = (event) => {
				const message = JSON.parse(event.data)
				message.screen && setCurrentScreen(message?.screen);
				 console.log(`message => `,message)
				 if (message.voting) {
					setShowQuestionResult(message.votingID?message.votingID:true)
					// message.choiceID
				 }
				 if(message.results) {
					let newResults = message.results
					// message.results.forEach(result => {
					// 	 console.log(`result => `,result)
					// })
					// message.results

					setResults(newResults)
					 console.log(`results => `, results)
				 }
			}
		}

	})
	function selectAnswer(answerID, questionID) {
		let message = {
			event: 'answer',
			answerID,
			questionID,
			id: userId,
		}
		socket?.current?.send(JSON.stringify(message))
	}
	function checkVoted(questionID) {
		let message = {
			event: 'checkvoteduser',
			questionID,
			id: userId,
		}
		socket?.current?.send(JSON.stringify(message))
	}
	function checkResult(questionID) {
		let message = {
			event: 'checkresult',
			questionID,
		}
		socket?.current?.send(JSON.stringify(message))
	}


	return (
		<>
			{currentScreen === 'start' ? (
				<Start
					// currentClientScreen={currentClientScreen}
					// changeAdminShowScreen={ changeAdminShowScreen }
					// changeAdminQuestionScreen={changeAdminQuestionScreen}
					// changeClientScreen={changeClientScreen}
					/>
			) : (
				<Question
					currentScreen={currentScreen}
					selectAnswer={selectAnswer}
					showQuestionResult={showQuestionResult}
					checkVoted={checkVoted}
					checkResult={checkResult}
					results={results}
					// currentClientScreen={currentClientScreen}
					// adminShowQuestion={adminShowQuestion}
					// changeAdminShowScreen={ changeAdminShowScreen }
					// changeClientScreen={changeClientScreen}
					/>
			)}


		</>
	)
}