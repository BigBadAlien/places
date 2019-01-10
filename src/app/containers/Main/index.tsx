import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import {PlaceActions} from "app/actions/place";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {RootState} from "app/reducers";

export interface Props extends RouteComponentProps<void> {
  actions: PlaceActions;
}

@connect(
  (state: RootState): Partial<Props> => {
    return {};
  },
  (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    actions: bindActionCreators(omit(PlaceActions, 'Type'), dispatch)
  })
)
export class Main extends React.Component<Props> {
  render() {
    return <div>HELLO</div>;
  }
}
