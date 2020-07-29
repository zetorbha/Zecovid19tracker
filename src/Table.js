import React from 'react'
import './Table.css'
import numeral from "numeral";

const Table = ({countries}) => {
    return (
        <div class="table">
            {countries.map(({country, cases, countryInfo})=>(
               <tr> 
                <td> <img src={countryInfo.flag} alt={countryInfo.iso2}/></td>
                <td>{country}</td>
                <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
               )
            )}
        </div>
    )
}

export default Table
