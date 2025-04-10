import { useEffect, useState } from 'react'
import { questions } from '../utils/Questions'


export default function Question ({ currentScreen, selectAnswer, showQuestionResult, percentage }) {
	const [question, setQuestion] = useState(questions[currentScreen - 1])
	const [showResult, setShowResult] = useState(false)
	const [total, setTotal] = useState(0)


	useEffect(()=>{
		setQuestion(questions[currentScreen - 1])
		//  console.log(`currentScreen => `,currentScreen)
		if(showQuestionResult) {
			// checkResult(question.id)
			// console.log('checkresult')
		} else {
			// checkVoted(question.id)
			// console.log('checkVoted')
		}
		//  console.log(`results => `,results)


	})


	useEffect(()=>{
		setShowResult(false)
	}, [currentScreen])



	return (
		<div className="q">
			<h1 className="q__num">{question?.title}</h1>
			<p className="q__title">{question?.question}</p>

			{!showQuestionResult ? (


				<div className="q-list">
					{
						question?.answer.map((item, idx)=>(

							<button
								className="q-item__btn"
								key={idx}
								id={item.id}
								onClick={(e) => {
									selectAnswer(item.id, question.id);
									// setShowResult(true)
								}}
								>{item.title}</button>

						))
					}
				</div>


			) : (
				<div className="q-result">
					{
						question?.answer.map((item, idx)=>{
							let resultPercentage = percentage(item.id)
							return(<div
								className={showQuestionResult === item.id ? 'a-item active' : 'a-item'}
								key={idx}
								id={item.id}
								>
								<div className="a-item__progress">
									<span className="a-item__line" style={{width: `${resultPercentage}%`}} ></span>
									<span className="a-item__title">{item.title}</span>
									<span className="a-item__percentage">{resultPercentage}%</span>
								</div>
							</div>
						)})
					}



					<p className="sub-title">Не закрывайте страницу <br /> скоро откроется следующий <br /> вопрос</p>
				</div>


			)}


		</div>
	)
}