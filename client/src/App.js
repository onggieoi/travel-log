import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';
import defaultConfig from './constants/mapConfig';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    zoom: 2
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    console.log(event);
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const srcData = {
    type: 'FeatureCollection',
    features: [
      { 
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [[[110, 10], [120, 10], [110, 20], [120, 20]]]},
        properties: {
          color: "#bf4040",
          contour: 10,
          fill: "#bf4040",
          'fill-opacity': 0.33,
          fillColor: "#bf4040",
          fillOpacity: 0.33,
          opacity: 0.33,
        }
      }
    ]
  }
    
  return (
    <>
      <ReactMapGL
        {...viewport}
        {...defaultConfig}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
      >
        <div style={{display: 'flex', width: '100vw', position: 'absolute', top: 0, left: 0}}>
          <div style={{margin: '0 auto', background: 'white',}}>
            hello
          </div>
        </div>
        <Source type="geojson" data={srcData}>
          <Layer type='fill' paint={{'fill-color': '#123456', 'fill-opacity': 1}} />
        </Source>
      </ReactMapGL>
    </>
  );
}

// {
//         addEntryLocation ? (
//           <>
//           <Marker
//             latitude={addEntryLocation.latitude}
//             longitude={addEntryLocation.longitude}
//           >
//             <div>
//               <svg
//                 className="marker red"
//                 style={{
//                   height: `${6 * viewport.zoom}px`,
//                   width: `${6 * viewport.zoom}px`,
//                 }}
//                 version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
//                 <g>
//                   <g>
//                     <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
//                       c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
//                       c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
//                   </g>
//                 </g>
//               </svg>
//             </div>
//           </Marker>
//           <Popup
//             latitude={addEntryLocation.latitude}
//             longitude={addEntryLocation.longitude}
//             closeButton={true}
//             closeOnClick={false}
//             dynamicPosition={true}
//             onClose={() => setAddEntryLocation(null)}
//             anchor="top" >
//             <div className="popup">
//               <LogEntryForm onClose={() => {
//                 setAddEntryLocation(null);
//                 getEntries();
//               }} location={addEntryLocation} />
//             </div>
//           </Popup>
//           </>
//         ) : null
//       }

export default App;
