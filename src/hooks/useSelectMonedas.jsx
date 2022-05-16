//hooks
import {useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: #FFF;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
    margin-bottom: 20px;

`

const useSelectMonedas = (label, opciones) => { 

    const [state, setState] = useState('') //para que sea reutilizable por eso el nombre genérico

    const SelectMonedas = () => ( //Para seleccionar monedas
        <>
            <Label>{label}</Label> 
            <Select 
                value= {state}
                onChange= {e => setState(e.target.value)}
            >
                <option value="">Seleccione</option> 
                
                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>                    
                ))}
            </Select>       
        </>
    )

    return [state, SelectMonedas] //Para poder importarlo en otro componente
}

export default useSelectMonedas