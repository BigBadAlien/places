import * as React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { MarkerData } from '../../models/MarkerData';

export interface Props {
  markers: MarkerData[];
}

const defaultProps: Partial<Props> = {};
const defaultCenter = { lat: 22.326442, lng: 114.167811 };


export const GeoMap: React.SFC<Props> = (props) => {
  return (
    <GoogleMap
      defaultCenter={defaultCenter}
      defaultZoom={10}
      center={(props.markers[0] && props.markers[0].position) || defaultCenter}
    >
      {props.markers.map((marker, index) =>
        <Marker key={index}
                position={marker.position}
                title={marker.title}
                icon={new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + marker.color,
                  new google.maps.Size(21, 34),
                  new google.maps.Point(0,0),
                  new google.maps.Point(10, 34))}
        />)}
    </GoogleMap>
  );
};

GeoMap.defaultProps = defaultProps;
