import React, { Component } from "react";
import getEventsList from "./api";
import { EventListItem } from "../../components/EventListItem/EventListItem";
import { AxiosResponse } from "axios";
import "./EventsList.css";
import { EventsFilterModel } from "../../core/models/EventsFilterModel";

export class EventsList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      eventsLoaded: false,
      filter: new EventsFilterModel(),
    };
  }

  render() {
    if (this.state.eventsLoaded) {
      return (
        <div className="EventsList">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.events.map((event: any) => {
                return (
                  <EventListItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                  ></EventListItem>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    if (!this.state.eventsLoaded)
      getEventsList(this.state.filter).then(
        (response: AxiosResponse<any[]>) => {
          this.setState({
            events: response.data,
            eventsLoaded: true,
          });
        }
      );
  };
}
