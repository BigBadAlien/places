import * as React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { MarkerData } from '../../models/MarkerData';

export namespace PlaceAutocomplete {

  export interface Props {
    markers: MarkerData[];
  }

  export interface State {}
}

export class GeoMap extends React.Component<PlaceAutocomplete.Props, PlaceAutocomplete.State> {
  static defaultProps: Partial<PlaceAutocomplete.Props> = {};
  static defaultCenter = { lat: 22.326442, lng: 114.167811 };

  constructor(props: PlaceAutocomplete.Props) {
    super(props);
  }

  render() {
    return (
      <GoogleMap
        defaultCenter={GeoMap.defaultCenter}
        defaultZoom={8}
        center={(this.props.markers[0] && this.props.markers[0].position) || GeoMap.defaultCenter}
      >
        {this.props.markers.map((marker, index) =>
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
  }
}
