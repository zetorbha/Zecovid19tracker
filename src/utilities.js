import React from 'react'
import {Circle, Popup} from 'react-leaflet';
import numeral from "numeral";

const caseColors={
    cases:{
        hex:"#FFA500",
        half_op:"rgb(255,165,0, 0.5)",
        multiplier:800
    }, 
     recovered:{
        hex:"#7dd71d",
        half_op:"rgb(125,25,29, 0.5)",
        multiplier: 1200
    }, 
     deaths:{
        hex:"#fb4443",
        half_op:"rgb(251,68,67, 0.5)",
        multiplier:2000
    }
}

export const SortData= (data)=>{
    const sortedData= [...data];

    return sortedData.sort((a,b)=>(a.cases > b.cases? -1:1));
    
}


export const showCercile=(data, casesType="cases") =>  (data.map(country=>(
    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    fillOpacity={0.4}
    color={caseColors[casesType].hex}
    fillColor={caseColors[casesType].hex}
    radius={
        Math.sqrt( country[casesType] )*caseColors[casesType].multiplier
    }
    >
        <Popup>
            <div className="pop-cintainer">
                <div style={{backgroundImage:`url(${country.countryInfo.flag})`}} className="pop-flag"/>
<div className="pop-name">{country.country}</div>
<div className="pop-cases"><strong>Cases:</strong>{numeral(country.cases).format("0,0")} </div>
                <div className="pop-recoverd"><strong>Recoverd:</strong>{numeral(country.recovered).format("0,0")}</div>
                <div className="pop-deaths"><strong>Deaths:</strong>{numeral(country.deaths).format("0,0")}</div>
            </div>
        </Popup>

    </Circle>
)))


export const printPlus= (stat)=> stat ?`+${numeral(stat).format('0,0a')}`: "+0";