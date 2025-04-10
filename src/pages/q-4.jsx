import { useEffect } from "react"

export default function AdminQuizFour({socket, userId, currentScreen}) {
	function changeScreen(num) {
		let message = {
			screen: num,
			id: userId,
			event: 'settings'
		}
		socket?.current?.send(JSON.stringify(message))
	}
	return (
		<>
			<div className="q">
				<h1 className="q__num">Вопрос №4</h1>
				<p className="q__title">Какого цвета ленту перерезать?</p>

				<div className="a-item">
					<div className="a-item__progress">
						<span className="a-item__line"></span>
						<span className="a-item__title">Синюю</span>
						<span className="a-item__percentage">0%</span>
					</div>
					<button className='a-item__btn'>+1</button>
				</div>
				<div className="a-item">
					<div className="a-item__progress">
						<span className="a-item__line"></span>
						<span className="a-item__title">Оранжевую</span>
						<span className="a-item__percentage">0%</span>
					</div>
					<button className='a-item__btn'>+1</button>
				</div>

				<div className="vote-active">Активных: <span>57 чел.</span></div>
				<div className="vote-current">Проголосовало: <span>55 чел.</span></div>

				{currentScreen === 4?(
					<button
						className='q-select-btn active' disabled="true"
					> Активировать вопрос </button>
				):(
					<button
						className='q-select-btn' onClick={(e)=> {
							changeScreen(4);
							e.target.classList.add('active')
						}}
					> Активировать вопрос </button>
				)}
				<a href='/admin/' className='link-back'>К списку вопросов</a>

			</div>
		</>
	)
}