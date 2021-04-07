import React from "react";
import getEvent from "./api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { EventModel } from "../../core/models/EventModel";
import { Badge, Container, Jumbotron } from "react-bootstrap";
import "./EventDetails.css";

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
    let content = <p>Loading...</p>;
    const categories = this.state.event.categories
      ? this.state.event.categories.map((category) => {
          return (
            <Badge key={category.id} variant="info">
              {category.title}
            </Badge>
          );
        })
      : "";
    const sources = this.state.event.sources
      ? this.state.event.sources.map((source) => {
          return (
            <a
              key={source.id}
              href={source.url}
              target="blank"
              className="btn btn-secondary"
            >
              {source.id}
            </a>
          );
        })
      : "";
    if (this.state.eventLoaded) {
      content = (
        <Jumbotron>
          <h3>
            {this.state.event.title}
            {categories}
          </h3>
          {this.state.event.closed ? (
            <div>Closed On: {this.state.event.closed}</div> //TODO: formatting needed to be implemented
          ) : (
            ""
          )}
          <div>Sources:</div>
          <div>{sources}</div>
          <a href={this.state.event.link} target="blank">
            Refference
          </a>
        </Jumbotron>
      );
      //TODO: More details here
    }

    return (
      <Container className="EventDetails">
        <Link to="/">Return to list</Link>
        {content}
      </Container>
    );
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
