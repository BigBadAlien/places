import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { PlaceActions } from "app/actions/place";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import { InputFile } from "app/components/InputFile";
import { Place } from '../../models/Place';

export interface Props extends RouteComponentProps<void> {
  actions: PlaceActions;
  places: Place[];
}

@connect(
  (state: RootState): Pick<Props, 'places'> => {
    return {
      places: state.place.places
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

  render() {
    return <div>
      <InputFile
        onLoad={(data) => this.handleLoad(data as string)}
        onError={(event) => console.log(event)}
      />
      {JSON.stringify(this.props.places)}
    </div>;
  }
}
