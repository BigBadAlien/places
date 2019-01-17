import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { PlaceActions } from "app/actions/place";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import { InputFile } from "app/components/InputFile";
import { Place } from '../../models/Place';
import '!style-loader!css-loader!antd/dist/antd.css'
import { PlaceList } from '../../components/PlaceList';
import { MoveColumnPayload } from '../../models/MoveColumnPayload';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { GeoMap } from '../../components/GeoMap';
import { environment } from '../../../environment';
import * as style from './style.css';
import { MarkerData } from '../../models/MarkerData';


export interface Props extends RouteComponentProps<void> {
  actions: PlaceActions;
  places: Place[];
  columns: string[];
  markers: MarkerData[];
}

@connect(
  (state: RootState): Pick<Props, 'places' | 'columns' | 'markers'> => {
    return {
      places: state.place.places,
      columns: state.place.columns,
      markers: state.place.markers,
    };
  },
  (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    actions: bindActionCreators(omit(PlaceActions, 'Type'), dispatch)
  })
)
export class Main extends React.Component<Props> {
  private Root = withScriptjs(
    withGoogleMap(() => (
      <div>
        <GeoMap markers={this.props.markers}/>
        <InputFile
          onLoad={(data) => this.handleLoad(data as string)}
          onError={(event) => console.log(event)}
        />
        <button onClick={() => this.props.actions.showMarkers()}>Show places</button>
        <PlaceList places={this.props.places}
                   columns={this.props.columns}
                   onColumnMove={this.onColumnMove}
        />
      </div>
    ))
  );

  private handleLoad(data: string) {
    this.props.actions.loadTable(data);
  }

  private onColumnMove = (params: MoveColumnPayload) => {
    this.props.actions.moveColumn(params);
  };

  render() {
    const Root = this.Root;

    return <Root
      googleMapURL={environment.googleMapURL}
      loadingElement={<div>Loading...</div>}
      containerElement={<div className={style.container} />}
      mapElement={<div className={style.map} />}
    />;
  }
}
