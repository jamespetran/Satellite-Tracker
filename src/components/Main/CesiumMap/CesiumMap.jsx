import { Cartesian3 } from "cesium";
import { Viewer, Entity, ImageryLayer, Camera } from "resium";
import * as Cesium from 'cesium';
import { useState } from 'react';
import '../Main.css';
// import "cesium/Build/Cesium/Widgets/widgets.css";
import * as satelliteJS from 'satellite.js';
import { useSelector } from 'react-redux';

function getSatPosit(time) {
  const location = useSelector(store => store.location);
  const displayed = useSelector(store => store.displayed);
  console.log(displayed);

  // Initialize a satellite record
  const satrec = satelliteJS.twoline2satrec(
    displayed.line1,
    displayed.line2);

  // let positionAndVelocity
  // //  Propagate satellite using time since epoch (in minutes).
  // if (time === null) {
  // conpositionAndVelocity = satelliteJS.propagate(satrec, new Date());
  // } else {
    const date = time;
    const newDate = new Date();
    const positionAndVelocity = satelliteJS.propagate(satrec, date);
    // }

  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  const positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

  // Set the Observer at specified location
  const observerGd = {
    longitude: satelliteJS.degreesToRadians(location.lat),
    latitude: satelliteJS.degreesToRadians(location.lng),
    height: 0.370
  };

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  const gmst = satelliteJS.gstime(new Date());

  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  const positionEcf = satelliteJS.eciToEcf(positionEci, gmst),
    observerEcf = satelliteJS.geodeticToEcf(observerGd),
    positionGd = satelliteJS.eciToGeodetic(positionEci, gmst),
    lookAngles = satelliteJS.ecfToLookAngles(observerGd, positionEcf);
  // const dopplerFactor = Satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);
  // observerCoordsEcf is not defined?? idk

  // The coordinates are all stored in key-value pairs.
  // ECI and ECF are accessed by `x`, `y`, `z` properties.
  const satelliteX = positionEci.x,
    satelliteY = positionEci.y,
    satelliteZ = positionEci.z;

  // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
  const azimuth = lookAngles.azimuth,
    elevation = lookAngles.elevation,
    rangeSat = lookAngles.rangeSat;

  // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
  const longitude = positionGd.longitude,
    latitude = positionGd.latitude,
    height = positionGd.height;

  //  Convert the RADIANS to DEGREES.
  const longitudeDeg = satelliteJS.degreesLong(longitude),
    latitudeDeg = satelliteJS.degreesLat(latitude);

  const satelliteLocation = { lat: longitudeDeg, lng: latitudeDeg, height };

  return satelliteLocation;
}

function loopingSatellite(satTime, maxTimeS, timeStepS) {
  let positionsOverTime = new Cesium.SampledPositionProperty();
  const satrec = satelliteJS.twoline2satrec(
    displayed.line1,
    displayed.line2);

  for (let i = 0; i < maxTimeS; i += timeStepS) {
    const time = Cesium.JulianDate.addSeconds(satTime, i, new Cesium.JulianDate());
    // ...Get position from satellite-js...
    // const thisPosition = getSatPosit(satTime);
    const positionAndVelocity = satelliteJS.propagate(satrec, date);

    const positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;


    const positionToAdd = Cesium.Cartesian3.fromRadians(thisPosition.lng, thisPosition.lat, thisPosition.height * 1000);
    positionsOverTime.addSample(time, positionToAdd);
  }

  return positionsOverTime;

}

function CesiumMap() {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OGQ1ODM0Yy03YzNkLTRjOTAtYTA0ZC1lNmJiMGIxZDc0NzQiLCJpZCI6ODEzMjIsImlhdCI6MTY0NDI1MzUxN30.WPQk8jpvzQSMyzi0WmpDW_qyVMXkp2vjnlo4N74VTJM';
  // const satLoc = getSatPosit();
  // runs loopingSatellite() for 5-minute positions over an hour time scale
  const satLoc = loopingSatellite( new Date() , 3600, 600);
  const location = useSelector(store => store.location);


  // const { longitude, latitude } = satLoc.satelliteLocation;
  const satPosits = satLoc;
  console.log(satPosits);

  const west = -115.0;
  const south = 25.0;
  const east = -75.0;
  const north = 53.0;

  const usaRectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

  // example location properties for US Bank stadium 
  // this renders a little dot on the map
  // 44.97354852465797, -93.2581203075042
  // let entityLong = 44.97354852465797;
  // let entityLat = -9.3.2581203075042;

  Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = usaRectangle;

  // NOTE: Viewer constructed after default view is set.

  //default map background is black marble image
  const imageryProvider = new Cesium.IonImageryProvider({ assetId: 3812 })
  const [entityLoc, setEntityLoc] = useState({ lat: 44.97354852465797, long: -93.2581203075042, name: "location name", description: "location description" });


  return (
    <div id="cesium-map">
      <Viewer
        full
        id="map-element"
        baseLayerPicker={false}
        className="map"
        imageryLayer={imageryProvider}
        fullscreenButton={false}
        geocoder={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        timeline={false}
        // animation={false}
        infoBox={false}
      >
        <ImageryLayer
          imageryProvider={imageryProvider}
        />
        <Camera

        />
        <Entity
          name={entityLoc.name}
          description={entityLoc.description}
          // position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
          position={Cartesian3.fromDegrees(latitude, longitude, 408686)}
          point={{ pixelSize: 10, color: Cesium.Color.RED }}>
        </Entity>
        <Entity
          name="Your location"
          description="Where you are according to the location page"
          position={Cartesian3.fromDegrees(location.lng, location.lat, 0)}
          point={{ pixelSize: 10, color: Cesium.Color.GREENYELLOW, }}
        >
        </Entity>
      </Viewer>

    </div>
  )
}
export default CesiumMap;