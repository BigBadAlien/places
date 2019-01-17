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
import { Alert } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import Radio from 'antd/lib/radio/radio';


export interface Props extends RouteComponentProps<void> {
  actions: PlaceActions;
  places: Place[];
  tablesHistory: number[];
  currentPaceTableId: number | undefined;
  columns: string[];
  markers: MarkerData[];
}

@connect(
  (state: RootState): Pick<Props, 'places' | 'columns' | 'markers' | 'tablesHistory' | 'currentPaceTableId'> => {
    return {
      places: state.place.places[state.place.currentPaceTableId] || [],
      tablesHistory: state.place.places.map((_place, tableIndex) => tableIndex),
      currentPaceTableId: state.place.currentPaceTableId,
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
        <div className={style.actions}>
          <div className={style.action}>
            <InputFile
              onLoad={(data) => this.handleLoad(data as string)}
              onError={(event) => console.log(event)}
            />
          </div>
          <div className={style.action}>
            <button
              disabled={this.props.places.length === 0}
              onClick={() => this.props.actions.showMarkers()}>
              Show places on the map
            </button>
          </div>
          <div className={style.action}>
            <div>
              <RadioGroup onChange={(event) => this.props.actions.setCurrentTable({tableId: event.target.value})}
                          value={this.props.currentPaceTableId}>
                {this.props.tablesHistory.map((tableIndex) =>
                  <Radio key={tableIndex} value={tableIndex}>{tableIndex}</Radio>)}
              </RadioGroup>
            </div>
          </div>
        </div>
        {this.props.places.length > 0 ?
          <>
            <Alert message="Columns can be reordered using drag and drop" type="warning"/>
            <PlaceList places={this.props.places}
                       columns={this.props.columns}
                       onColumnMove={this.onColumnMove}
            />
          </> :
          <Alert message="Please, load a table" type="warning"/>}
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
      containerElement={<div className={style.container}/>}
      mapElement={<div className={style.map}/>}
    />;
  }
}
