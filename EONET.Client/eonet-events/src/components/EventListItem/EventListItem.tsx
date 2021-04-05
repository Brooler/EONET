import React from "react";
import { Link } from "react-router-dom";

export class EventListItem extends React.PureComponent<any, any> {
  render() {
    return (
      <tr>
        <th>{this.props.id}</th>
        <th>{this.props.title}</th>
        <th>
          <Link
            to={{
              pathname: "/event",
              search: this.props.id,
            }}
          >
            Details
          </Link>
        </th>
      </tr>
    );
  }
}
