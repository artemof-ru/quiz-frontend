import { useEffect, useState } from 'react'
import { questions } from '../utils/Questions'



export default function AdminQuestion ({ currentClientScreen, adminShowQuestion, changeAdminShowScreen, changeClientScreen, selectAnswer }) {
	const [question, setQuestion] = useState(questions[adminShowQuestion - 1])

	let currentUsers = '';

	useEffect(()=>{
		setQuestion(questions[adminShowQuestion - 1])
	})


	return (<>
		<div className="q">
			<h1 className="q__num">{question?.title}</h1>
			<p className="q__title">{question?.question}</p>
			{question?.answer.map((item, idx)=>(
				<div className="a-item" key={idx}>
					<div className="a-item__progress">
						<span className="a-item__line"></span>
						<span className="a-item__title">{item.title}</span>
						<span className="a-item__percentage">0%</span>
					</div>
					<button
						className='a-item__btn'
						id={item.id}
						onClick={() => {
							selectAnswer(item.id, question.id)
						}}
					>+1</button>
				</div>
			))}

			<div className="vote-active">Активных: <span>{currentUsers} чел.</span></div>
			<div className="vote-current">Проголосовало: <span>55 чел.</span></div>

			<button
				className={currentClientScreen === adminShowQuestion ? 'q-select-btn active' : 'q-select-btn'}
				disabled={currentClientScreen === adminShowQuestion}
				onClick={(e)=>{
					changeClientScreen(adminShowQuestion)
					// changeClientScreen(adminShowQuestion);
					// e.target.classList.add('active')
				}}
			> Активировать вопрос </button>
			<button onClick={() => changeAdminShowScreen('start')} className='link-back'>К списку вопросов</button>

		</div>

	</>)
}