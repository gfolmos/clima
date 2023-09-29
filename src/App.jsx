import React, { useState } from 'react'
import { useDom } from './useDom'

export const App = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'f9b1af680e4280115ba15a3433407793'
    //?q={city name}&appid={API key}
    const difKelvin = 273.15
    const [ciudad, setciudad] = useState('')
    const [dataClima, setdataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setciudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }
    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setdataClima(data)
        }catch(error){
            console.error('ocurrio un error en:' , error)
        }

    }

  return (
    <div className="container">
        <h1>Aplicacion clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
            label ="teclea ciudad"
            type="text" 
            value={ciudad}
           onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} grados</p>
                    <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        }
    </div>
  )
}
