import { useEffect, useState } from 'react'
import { questions } from '../utils/Questions'


export default function AdminQuestionsList({ clientCurrentScreen, changeAdminShowScreen, changeClientScreen }) {

	useEffect(()=>{
		 console.log(`clientCurrentScreen => `,clientCurrentScreen)
	}, [clientCurrentScreen])

	return (
		<ul className="q-list">




			<li className="q-list__item">
				<button
					className={clientCurrentScreen === 'start' ? 'q-item__btn active' : 'q-item__btn'}
					onClick={() => {
						changeAdminShowScreen('start')
						changeClientScreen('start')
					}}
					>Начальный экран</button>
			</li>




			{questions.map( (item, idx) =>
				(
					<li className="q-list__item" key={idx}>
						<button
							className={clientCurrentScreen === item.id ? 'q-list__link active' : 'q-list__link'}
							onClick={() => {
								changeAdminShowScreen(item.id)
							}}
							>
							{item.title} <span>АКТИВЕН</span>
						</button>
					</li>
				)
			)}



		</ul>
	)


}