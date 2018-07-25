import { Card } from 'antd';
import * as numeral from 'numeral';
import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import data from './data';
import './HomePage.css';
import { Contact } from './models';

const Home = () => (
  <div className="dashboard" >
    <CustomerCount count={data.length} />
    <AverageAge avgAge={getAvgAge(data)} />
    <StandardDeviationAmount standardDev={getStandardDeviation(data)} />
    <MapComponent
      markers={data}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAKbPeHxXhp8A9HyXQafxGepq2Yct2P5Yc"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div className="googleMaps" />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
)

export default Home;

interface CustomerCountProps {
  count: number;
}

const CustomerCount = ({count}: CustomerCountProps) => (
  <Card className="customerCountCard" >
    <p>Customers</p>
    <h1>{count}</h1>
  </Card>
)

interface AverageAgeProps {
  avgAge: number;
}

const AverageAge = ({avgAge}: AverageAgeProps) => (
  <Card className="avgAgeCard" >
    <p>Average Age</p>
    <h1>{avgAge}</h1>
  </Card>
)

const getAvgAge = (contactList: Contact[]): number => {
  const sum = contactList.map(({age}) => age).reduce((a, b) => a + b);
  return Math.ceil(sum / contactList.length);
}

interface StandardDeviationAmountProps {
  standardDev: number;
}

const StandardDeviationAmount = ({standardDev}: StandardDeviationAmountProps) => (
  <Card className="SDCard" >
    <p>S.D. of debt</p>
    <h1>{standardDev}</h1>
  </Card>
)

const getStandardDeviation = (contactList: Contact[]): number => {
  const debts = contactList.map(({balance}) => numeral(balance).value());
  
  // calculate average
  const sum = debts.reduce((a, b) => a + b);
  const meanVal = sum / debts.length;

  // calculate standard deviation
  const SDprep = debts.reduce((a, b) => a + Math.pow((b - meanVal), 2));
  const SDresult = Math.sqrt(SDprep / debts.length);

  return SDresult;
}

interface MapComponentProps {
  markers: Contact[];
}

const MapComponent = withScriptjs(withGoogleMap(({markers}: MapComponentProps) =>
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{
      lat: Number(markers[0].latitude),
      lng: Number(markers[0].longitude)
    }}
  >
    {markers.map(marker => 
      <Marker
        position={{
          lat: Number(marker.latitude),
          lng: Number(marker.longitude)
        }}
        key={marker._id}
      />
    )}
  </GoogleMap>
))
