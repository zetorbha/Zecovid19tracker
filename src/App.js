import React,{useState,useEffect} from 'react';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import {SortData, printPlus} from './utilities';
import LineGraph from './LineGraph.js'
import "leaflet/dist/leaflet.css"

function App() {
  // 

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(['worldwide']);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState({});
  const [countriesTable, setCountriesTable] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:23.1148533,lng:86.6525328,});
  const [mapZoom, setMapZoom]= useState(3);
  const [mapCountries, setMapCountries]= useState([]);
  const [casetype, setCasetype]= useState("cases")
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((res)=> res.json()).then(data=>{
      setSelectedCountryInfo(data);
    })
  },[])
  useEffect(()=>{
      const getCountriesData= async()=>{
       await fetch('https://disease.sh/v3/covid-19/countries').then((res=>res.json()))
       .then((data)=>{ 
          const countries= data.map((country)=>({
            name: country.country,
            value: country.countryInfo.iso3,
            key: country.countryInfo._id
          }))
          const sortedData=SortData(data)
          setCountriesTable(sortedData)
          setCountries(countries);
          setMapCountries(data)
         
       })
      }

      getCountriesData();
  },[]);

  const onCountryChange=async (e)=>{
    const countryCode= e.target.value;
   
    const url= countryCode==='worldwide'
    ? 'https://disease.sh/v3/covid-19/all' 
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then((res)=>res.json())
    .then(data=>
    {  setSelectedCountry(countryCode);
      setSelectedCountryInfo(data);
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(3)
    })
  };
  //console.log(selectedCountryInfo)
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={selectedCountry}>
          <MenuItem value= "worldwide">Worldwide</MenuItem>
          {countries.map(country =>(
            <MenuItem value= {country.value} key={country.key}>{country.name}</MenuItem>
          ))}
              
            </Select>
        </FormControl>
      </div>
      <div className="app__state">
        <Infobox isOrenge onClick={e=> setCasetype('cases')}  active={casetype==="cases"}title="Cases" cases={printPlus(selectedCountryInfo.todayCases)} total= {printPlus(selectedCountryInfo.cases)}/>
        <Infobox  onClick={e=> setCasetype('recovered')}active={casetype==="recovered"} title="Recoverd" cases={printPlus(selectedCountryInfo.todayRecovered)} total= {printPlus(selectedCountryInfo.recovered)}/>
        <Infobox isRed onClick={e=> setCasetype('deaths')} active={casetype==="deaths"}title="Deaths" cases={printPlus(selectedCountryInfo.todayDeaths)} total= {printPlus(selectedCountryInfo.deaths)}/>
        

      </div>
      <Map casesType={casetype} countries={mapCountries}center={mapCenter}
      zoom={mapZoom}/>
      </div>
      <Card className="app__right">
      <CardContent >
        <h2>Live Cases by County</h2>
        <Table countries={countriesTable}/>
          <h3 className="app__graphtitle">WorldWide new {casetype}</h3>
        <LineGraph className="app__graph" casesType={casetype}/>
      </CardContent>
        
       
     
     
     
      </Card>
     
   
     
    
    </div>
  );
}

export default App;
