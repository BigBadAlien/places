import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { PlaceActions } from "app/actions/place";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import { InputFile } from "app/components/InputFile";
import { Place } from '../../models/Place';
import Table from 'antd/es/table/Table';
import '!style-loader!css-loader!antd/dist/antd.css'


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

      <Table dataSource={this.props.places}
             columns={[{
               title: 'Address',
               dataIndex: 'address',
             }, {
               title: 'City',
               dataIndex: 'city',
             }, {
               title: 'State',
               dataIndex: 'state',
             }, {
               title: 'Zip Code',
               dataIndex: 'zipcode',
             }, {
               title: 'Category',
               dataIndex: 'category',
             }]}
             pagination={false}
      />
    </div>;
  }
}
