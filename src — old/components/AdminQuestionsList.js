import { useEffect, useState } from 'react'
import { questions } from '../utils/Questions'


export default function AdminQuestionsList({ currentClientScreen, changeAdminShowScreen, changeAdminQuestionScreen, changeClientScreen }) {

	useEffect(()=>{
		 console.log(`currentClientScreen => `,currentClientScreen)
	}, [currentClientScreen])

	return (
		<ul className="q-list">




			<li className="q-list__item">
				<button
					className={currentClientScreen === 'start' ? 'q-item__btn active' : 'q-item__btn'}
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
							className={currentClientScreen === item.id ? 'q-list__link active' : 'q-list__link'}
							onClick={() => {
								changeAdminShowScreen(item.id)
								changeAdminQuestionScreen(item.id)
							}}
							>
							{item.title} <span>АКТИВЕН</span>
						</button>
					</li>
				)
			)}



		</ul>
	)

	// return (
	// 	<ul className="q-list">
	// 		<li className="q-list__item">
	// 			<a
	// 				href="/admin/"
	// 				className={currentScreen < 1 ? 'q-item__btn active' : 'q-item__btn'}
	// 				onClick={()=> changeScreen(-1) }
	// 			>Начальный экран</a>
	// 		</li>
	// 		{questions.map( (item, idx) =>
	// 			(
	// 				<li className="q-list__item" key={idx}>
	// 					<a href="/admin/" className={currentScreen === item.id ? 'q-list__link active' : 'q-list__link'}>
	// 						{item.title} <span className=''>АКТИВЕН</span>
	// 					</a>
	// 				</li>
	// 			)
	// 		)}
	// 	</ul>
	// )
}