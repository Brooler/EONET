import React from "react";
import getEvent from "./api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { EventModel } from "../../core/models/EventModel";

export class EventDetails extends React.PureComponent<
  any,
  { event: EventModel; eventLoaded: boolean }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      event: {},
      eventLoaded: false,
    };

    console.log(props);
  }

  render() {
    if (this.state.eventLoaded) {
      return (
        <div className="EventDetails">
          <Link to="/">Return to list</Link>
          <h1>{this.state.event.title}</h1>
          <a href={this.state.event.link} target="blank">
            Refference
          </a>
        </div>
      );
      //TODO: More details here
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails() {
    if (!this.state.eventLoaded) {
      getEvent(this.props.location.search.substring(1))
        .then((response: AxiosResponse<EventModel>) => {
          this.setState({
            event: response.data,
            eventLoaded: true,
          });
        })
        .catch((error) => {
          console.error(error);
          //TODO: better error handling here
        });
    }
  }
}
