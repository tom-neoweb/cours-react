// useEffect, useState sont des hooks
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';

const Countries = () => {

    // On modifie jamais directement la data, on passe toujours par set{Nom} ex: setData
    // C'est pour ça qu'on utilise const (constante)

    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania" ];

    // Le useEffect se joue lorsque le composant est monté, mis en place
    useEffect(() => {
        axios
        .get('https://restcountries.com/v3.1/all')
        .then((response) => setData(response.data));
    }, [])

    return (
        <div className='countries'>
            <ul className="radio-container">
                <input 
                    type="range" 
                    min="1" 
                    max="250" 
                    defaultValue ={rangeValue} 
                    onChange={(event) => setRangeValue(event.target.value)}
                />
                {
                    radios.map((continent) => (
                        <li>
                            <input 
                                type="radio" 
                                id={continent} 
                                name="continentRadio"
                                checked = {continent === selectedRadio} 
                                onChange={(event) => setSelectedRadio(event.target.id)}
                            />
                            <label htmlFor={continent}>{continent}</label>
                        </li>
                    ))
                }
            </ul>
            {
                selectedRadio &&  (
                    <button onClick={() => setSelectedRadio("")}>Annuler la recherche</button>
                )
            }
            <ul>
                {
                    data
                    .filter((country) => country.continents[0].includes(selectedRadio))
                    .sort((a, b) => b.population - a.population)
                    // Couper pour garder par exemple 5 pays grâce à Slice
                    .slice(0, rangeValue)
                    .map((country, index) => (
                        // <li key={index}>{country.translations.fra.common}</li>
                        <Card key={index} country={country}/>
                    ))
                }
            </ul>
        </div>
    );
};

export default Countries;