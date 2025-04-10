import { useEffect, useState } from "react"
import AdminQuestionsList from '../components/AdminQuestionsList'
import AdminQuestion from '../components/AdminQuestion'

export default function Admin({socket, userId, currentClientScreen}) {

	const [adminScreen, setAdminScreen] = useState('start')
	const [adminShowQuestion, setAdminShowQuestion] = useState(0)

	function changeClientScreen(num) {
		let message = {
			event: 'settings',
			screen: num,
			id: userId,
		}
		socket?.current?.send(JSON.stringify(message))
	}

	function changeAdminShowScreen(value) {
		setAdminScreen(value)
	}
	function changeAdminQuestionScreen(value) {
		setAdminShowQuestion(value)
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
	}




	return (
		<>
			<div className="admin-page">
				{adminScreen === 'start' ? (
					<AdminQuestionsList
						currentClientScreen={currentClientScreen}
						changeAdminShowScreen={ changeAdminShowScreen }
						changeAdminQuestionScreen={changeAdminQuestionScreen}
						changeClientScreen={changeClientScreen}
						/>
				) : (
					<AdminQuestion
						currentClientScreen={currentClientScreen}
						adminShowQuestion={adminShowQuestion}
						changeAdminShowScreen={ changeAdminShowScreen }
						changeClientScreen={changeClientScreen}
						selectAnswer={selectAnswer}
						/>
				)}
			</div>
		</>
	)

	// return (
	// 	<>
	// 		<div className="admin-page">

	// 			<ul className="q-list">
	// 				<li className="q-list__item">
	// 					<a
	// 						href="/admin/"
	// 						className={currentScreen < 1 ? 'q-item__btn active' : 'q-item__btn'}
	// 						onClick={()=> changeScreen(-1) }
	// 					>Начальный экран</a>
	// 				</li>
	// 				<li className="q-list__item">
	// 					<a href="/admin/q-1/" className={currentScreen === 1 ? 'q-list__link active' : 'q-list__link'}>
	// 						Вопрос 1 <span className=''>АКТИВЕН</span>
	// 					</a>
	// 				</li>
	// 				<li className="q-list__item">
	// 					<a href="/admin/q-2/" className={currentScreen === 2 ? 'q-list__link active' : 'q-list__link'}>
	// 						Вопрос 2 <span className=''>АКТИВЕН</span>
	// 					</a>
	// 				</li>
	// 				<li className="q-list__item">
	// 					<a href="/admin/q-3/" className={currentScreen === 3 ? 'q-list__link active' : 'q-list__link'}>
	// 						Вопрос 3 <span className=''>АКТИВЕН</span>
	// 					</a>
	// 				</li>
	// 				<li className="q-list__item">
	// 					<a href="/admin/q-4/" className={currentScreen === 4 ? 'q-list__link active' : 'q-list__link'}>
	// 						Вопрос 4 <span className=''>АКТИВЕН</span>
	// 					</a>
	// 				</li>
	// 			</ul>

	// 		</div>

	// 	</>
	// )
}