import React, { Component } from 'react';
import './App.css';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import 'antd/dist/antd.css';
import { Radio } from 'antd';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import loadTable from "p5";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGFudDIwMDIiLCJhIjoiY2prenlwb2ZtMHlnMjNxbW1ld3VxYWZ4cCJ9.rOb8DhCzsysBIw69MxyWKg';

const DATA_URL = "final_data.csv";
const data = loadTable(DATA_URL, 'csv', 'header');

console.log(data.getColumn('a'))

// Viewport settings
const initialViewState = {
  longitude: 76.125,
  latitude: -102.824996948242,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const hexagonLayer = new HexagonLayer({
  id: "hexagon-layer",
  data,
  pickable: true,
  extruded: true,
  radius: 200,
  elevationScale: 1,
  getPosition: d => d.features.geometry.coordinates,
  getColorValue: d => d.features.properties.rfe,
  getElevationValue: d => d.features.properties.nvdi
});

// elevation as indicator, color = FRI

export default class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      upperPercentile: 80,
      overlay: "nvdi",
      layers: hexagonLayer
    };
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.renderLayers = this.renderLayers.bind(this);
  }

  

  renderLayers() {
    const hexagonLayer = new HexagonLayer({
      id: "hexagon-layer",
      data,
      pickable: true,
      extruded: true,
      radius: 200,
      elevationScale: 1,
      getPosition: d => d.features.geometry.coordinates,
      getColorValue: d => d.features.properties.rfe,
      getElevationValue: d => d.features.properties.nvdi
    });
    return this.setState({layers: hexagonLayer});
  }

  handleRadio(event) {
    this.setState({ overlay: event.target.value });
    this.renderLayers();
  }

  handleSlider(event) {
    this.setState({ upperPercentile: event.target.value });
    this.renderLayers();
  }

  render() {
    return (
      <div className="App">
        <div className = "controlPanel">
          <div className = "controlPanelContainer">
            <div className = "controlPanelHeader">Famine</div>
            <div className = "controlPanelDefinitionExcerpt">
                We visualize a custom Famine Risk Index (FRI) as a consequence of drought for identifying populations at a high risk for famine. FRI takes into account vegetation abundance, local population density, and available percipitation.
            </div>
            <div className = "breakLine">
                <hr></hr>
            </div>
            <div className = "gradientScale">
                <div className = "gr1"></div>
                <div className = "gr2"></div>
                <div className = "gr3"></div>
                <div className = "gr4"></div>
                <div className = "gr5"></div>
                <div className = "gr6"></div>
            </div>
            <div className = "gradientMarkers">
                <div className = "gradientMarkerLeft">Low FRI</div>
                <div className = "gradientMarkerRight">High FRI</div>
                <br></br>
            </div>
            <div className = "percentileSlider">
                <label>Upper Percentile</label>
                <input className = "upperPercentileSlider" id="upperPercentile" type="range" min="80" max="99" step="1" defaultValue="80" value={this.state.upperPercentile} onChange = {this.handleSlider}></input>
                <span id="upperPercentile-value" className = "upperPercentileReadOut">{this.state.upperPercentile}%</span>
            </div>
            <div className = "overlaySelectors">
              <form onSubmit={this.handleSubmit}>
                <label>
                      <Radio
                        type="radio"
                        value="nvdi"
                        className = "selectorOne"
                        checked={this.state.overlay === "nvdi"}
                        onClick={this.handleRadio}
                      />
                      NVDI

                  </label>
                  <label>
                      <Radio
                        type="radio"
                        value="pop_density"
                        className = "selectorTwo"
                        checked={this.state.overlay === "pop_density"}
                        onClick={this.handleRadio}
                      />
                      Pop. Density
                    </label>
                    <label>
                      <Radio
                        type="radio"
                        value="rainfall"
                        className = "selectorThree"
                        checked={this.state.overlay === "rainfall"}
                        onClick={this.handleRadio}
                      />
                      Rainfall
                    </label>
                    <label>
                      <Radio
                        type="radio"
                        value="soil_moisture_index"
                        className = "selectorFour"
                        checked={this.state.overlay === "soil_moisture_index"}
                        onClick={this.handleRadio}
                      />
                      Soil Moisture Index
                    </label>
              </form>
          </div>
        </div>
        </div>
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={this.state.layers}
        >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle= {'mapbox://styles/mapbox/satellite-v9'} />
      </DeckGL>
    </div>
    )
  }
}

