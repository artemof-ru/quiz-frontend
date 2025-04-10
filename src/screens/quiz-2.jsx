export default function QuizTwo () {
	return (
		<div className="q">
			<h1 className="q__num">Вопрос №2</h1>
			<p className="q__title">Какого цвета ленту перерезать?</p>

			<div className="q-list">
				<button className="q-item__btn">Синюю</button>
				<button className="q-item__btn">Оранжевую</button>
			</div>

			<div className="q-result">
				<div className="a-item">
					<div className="a-item__progress">
						<span className="a-item__line"></span>
						<span className="a-item__title">Оранжевую</span>
						<span className="a-item__percentage">0%</span>
					</div>
				</div>
				<div className="a-item">
					<div className="a-item__progress">
						<span className="a-item__line"></span>
						<span className="a-item__title">Оранжевую</span>
						<span className="a-item__percentage">0%</span>
					</div>
				</div>

				<p className="sub-title">Не закрывайте страницу <br /> скоро откроется следующий <br /> вопрос</p>
			</div>
		</div>
	)
}