import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import style from './Home.module.css'

interface IFormeState {
	name: string
	email: string
}

function Home() {
	const { register, handleSubmit, reset } = useForm<IFormeState>()

	const [isSuccsess, setIsSuccsess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit: SubmitHandler<IFormeState> = data => {
		setIsLoading(true)
		fetch('http://localhost:5000/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				if (!data) return
				setIsSuccsess(true)
				reset()
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	return (
		<>
			<div className={style.wrapper}>
				{isSuccsess ? (
					<div className={style.succsess}>Ваша заявка отпарвлена!</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1>Хочу GTA VI</h1>
						<input
							{...register('name')}
							type='name'
							placeholder='Введите имя:'
						/>
						<input
							{...register('email')}
							type='email'
							placeholder='Введите Email:'
						/>
						<button disabled={isLoading}>
							{isLoading ? 'Загрузка...' : 'ХОЧУ ГТА'}
						</button>
					</form>
				)}
			</div>
		</>
	)
}

export default Home
