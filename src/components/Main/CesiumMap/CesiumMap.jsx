import { Cartesian3 } from "cesium";
import { Viewer, Entity, ImageryLayer, Camera } from "resium";
import * as Cesium from 'cesium';
import { useState } from 'react';
import '../Main.css';
// import "cesium/Build/Cesium/Widgets/widgets.css";
import * as satellite from 'satellite.js';
import { useSelector } from 'react-redux';

function defineSatellite() {
  const location = useSelector(store => store.location);
  const displayed = useSelector(store => store.displayed);

  // Initialize a satellite record
  const satrec = satellite.twoline2satrec(
    displayed.line1,
    displayed.line2);

  //  Propagate satellite using time since epoch (in minutes).
  const positionAndVelocity = satellite.propagate(satrec, new Date());

  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  const positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

  // Set the Observer at specified location
  const observerGd = {
    longitude: satellite.degreesToRadians(location.lat),
    latitude: satellite.degreesToRadians(location.lng),
    height: 0.370
  };

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  const gmst = satellite.gstime(new Date());

  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  const positionEcf = satellite.eciToEcf(positionEci, gmst),
    observerEcf = satellite.geodeticToEcf(observerGd),
    positionGd = satellite.eciToGeodetic(positionEci, gmst),
    lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
  // const dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);
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
  const longitudeDeg = satellite.degreesLong(longitude),
    latitudeDeg = satellite.degreesLat(latitude);

  const satelliteLocation = { latitude: longitudeDeg, longitude: latitudeDeg };
  return satelliteLocation;
}

function CesiumMap() {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OGQ1ODM0Yy03YzNkLTRjOTAtYTA0ZC1lNmJiMGIxZDc0NzQiLCJpZCI6ODEzMjIsImlhdCI6MTY0NDI1MzUxN30.WPQk8jpvzQSMyzi0WmpDW_qyVMXkp2vjnlo4N74VTJM';
  const satLoc = defineSatellite();
  const location = useSelector(store => store.location);


  const { latitude, longitude } = satLoc;

  // console.log(`in CesiumMap:
  // longitude: ${longitude}, latitude: ${latitude}`)

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
  // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = usaRectangle;

  // NOTE: Viewer constructed after default view is set.

  //default map background is black marble image
  const imageryProvider = new Cesium.IonImageryProvider({ assetId: 3812 })
  // const [entityLoc, setEntityLoc] = useState({ lat: 44.97354852465797, long: -93.2581203075042, name: "location name", description: "location description" });

  const mapProjection = new Cesium.WebMercatorProjection();
  const sceneMode = Cesium.SceneMode.SCENE2D;

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
        animation={false}
        infoBox={false}
        // these 2 force the map to be flat ~ comment out to make it a globe
        sceneMode={sceneMode}
        mapProjection={mapProjection}

      >
        {/* <ImageryLayer
          imageryProvider={imageryProvider}
        /> */}
        <Camera

        />
        <Entity
          // name={entityLoc.name}
          // description={entityLoc.description}
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