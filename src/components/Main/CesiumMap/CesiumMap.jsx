import { Cartesian3 } from "cesium";
import { Viewer, Entity, ImageryLayer, Camera } from "resium";
import * as Cesium from 'cesium';
import { useState } from 'react';
// import "cesium/Build/Cesium/Widgets/widgets.css";


function CesiumMap() {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OGQ1ODM0Yy03YzNkLTRjOTAtYTA0ZC1lNmJiMGIxZDc0NzQiLCJpZCI6ODEzMjIsImlhdCI6MTY0NDI1MzUxN30.WPQk8jpvzQSMyzi0WmpDW_qyVMXkp2vjnlo4N74VTJM';


  const west = -115.0;
  const south = 25.0;
  const east = -75.0;
  const north = 53.0;

  const usaRectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

  // example location properties for US Bank stadium 
  // this renders a little dot on the map
  // 44.97354852465797, -93.2581203075042
  // let entityLong = 44.97354852465797;
  // let entityLat = -93.2581203075042;

  Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = usaRectangle;

  // NOTE: Viewer constructed after default view is set.

  //default map background is black marble image
  const imageryProvider = new Cesium.IonImageryProvider({ assetId: 3812 })
  const [entityLoc, setEntityLoc] = useState({ lat: 44.97354852465797, long: -93.2581203075042, name: "location name", description: "location description" });


  return (
    <div id="cesium-map">
      <Viewer
        id="map-element"
        baseLayerPicker={false}
        className="map"
        imageryLayer={imageryProvider}
        fullscreenButton={false}
        geocoder={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        timeline={false}
        animation={false}
        infoBox={false}
      >
        <ImageryLayer
          imageryProvider={imageryProvider}
        />
        <Camera

        />
        {/* <Entity
          name={entityLoc.name}
          description={entityLoc.description}
          // position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
          position={Cartesian3.fromDegrees(entityLoc.long, entityLoc.lat, 408686)}
          point={{ pixelSize: 10 }}>
        </Entity> */}
      </Viewer>

    </div>
  )
}
export default CesiumMap;