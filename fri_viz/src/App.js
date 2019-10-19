import React from 'react';
import './App.css';
import DeckGL from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGFudDIwMDIiLCJhIjoiY2prenlwb2ZtMHlnMjNxbW1ld3VxYWZ4cCJ9.rOb8DhCzsysBIw69MxyWKg';

// Viewport settings
const initialViewState = {
  longitude: -86.881900,
  latitude: 33.351460,
  zoom: 13,
  pitch: 0,
  bearing: 0
};
c
// Data to be used by the LineLayer/ArcLayer
const data = [{sourcePosition: [-86.881900, 33.351460], 
               targetPosition: [-86.667976, 33.541592],
               getSourceColor: [51,255,102,0.2],
               getTargetColor: [51,255,102,0.2]}];

function App() {
  
  // create all Deck.gl layers
  const layers = [
    new ArcLayer({id: 'arc-layer', data})
  ];

  // plot Deck.gl layers on top of Mapbox layer
  return (
    <div className="App">
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                   mapStyle= {'mapbox://styles/mapbox/dark-v9'} />
      </DeckGL>
    </div>
  );
}
export default App;
