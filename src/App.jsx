import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-cripto.png'

const Contenedor = styled.div`
	max-width: 900px;
 	margin: 0 auto;
	width: 90%;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`
const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0 auto;
	display: block;
`

const Heading = styled.h1 `
	font-family: 'Lato', sans serif;
	color: #FFF;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 35px;

	&::after {
		content: '';
		width: 100px;
		height: 5px;
		background-color: #66A2FE;
		display: block;
		margin: 10px auto auto;
	}
`

function App() {

	const [monedas, setMonedas] = useState({})
	const [resultado, setResultado] = useState({})
	const [cargando, setCargando] = useState(false)

	useEffect(() => {
		if(Object.keys(monedas).length > 0) { //Si ya hay datos en el state
			
			const cotizarCripto = async() => {
				setCargando(true)
				setResultado({})

				const {moneda, criptomoneda} = monedas
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
				
				const respuesta = await fetch(url) //fetch es una promesa
				const resultado = await respuesta.json() //Convertir el resultado a JSON
			
				setResultado(resultado.DISPLAY[criptomoneda][moneda]) //Consulto de manera dinámica el resultado
			
				setCargando(false)
			}


			cotizarCripto()
		}
	}, [monedas]) // escucha por los cambios que suceden en monedas

	return( 
		<Contenedor>
			<Imagen 
				src={ImagenCripto}
				alt="Imagen Criptomonedas"
			/>

			<div>
				<Heading>Cotiza Criptomonedas al Instante</Heading>

				<Formulario
					setMonedas={setMonedas}
				/>

				{cargando && <Spinner />}
				{resultado.PRICE && <Resultado resultado={resultado} />} 	{/* de esta manera muestro el componente resultado sólo cuando está presente la propiedad PRICE*/}
			</div>
		</Contenedor>
	)
  
}

export default App
