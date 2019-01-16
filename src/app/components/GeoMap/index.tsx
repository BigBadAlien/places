import * as React from 'react';
import { GoogleMap } from 'react-google-maps';

export namespace PlaceAutocomplete {

  export interface Props {
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
        defaultZoom={12}
        options={{
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          }
        }}
      >
      </GoogleMap>
    );
  }
}
