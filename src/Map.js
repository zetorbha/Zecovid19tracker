import React from 'react'
import {Map as LeafLetMap, TileLayer} from 'react-leaflet';
import './Map.css';
import{showCercile} from './utilities';

const Map = ({center,zoom, countries, casesType }) => {
    return (
        <div className="map">
          <LeafLetMap center={center} zoom={zoom}>
          <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />{showCercile(countries, casesType)}
          </LeafLetMap>
        </div>
    )
}

export default Map
