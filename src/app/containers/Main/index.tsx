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
import { MoveColumnParams } from '../../models/MoveColumnParams';


export interface Props extends RouteComponentProps<void> {
  actions: PlaceActions;
  places: Place[];
  columns: string[];
}

@connect(
  (state: RootState): Pick<Props, 'places' | 'columns'> => {
    return {
      places: state.place.places,
      columns: state.place.columns,
    };
  },
  (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    actions: bindActionCreators(omit(PlaceActions, 'Type'), dispatch)
  })
)
export class Main extends React.Component<Props> {
  private handleLoad(data: string) {
    this.props.actions.loadTable(data);
  }

  private onColumnMove = (params: MoveColumnParams) => {
    this.props.actions.moveColumn(params);
  };

  render() {
    return <div>
      <InputFile
        onLoad={(data) => this.handleLoad(data as string)}
        onError={(event) => console.log(event)}
      />
      <PlaceList places={this.props.places}
                 columns={this.props.columns}
                 onColumnMove={this.onColumnMove}
      />
    </div>;
  }
}
