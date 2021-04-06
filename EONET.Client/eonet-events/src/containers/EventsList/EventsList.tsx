import React from "react";
import getEventsList from "./api";
import { EventListItem } from "../../components/EventListItem/EventListItem";
import { AxiosResponse } from "axios";
import "./EventsList.css";
import { EventsFilterModel } from "../../core/models/EventsFilterModel";
import { EventsFilter } from "../../components/EventsFilter/EventsFilter";
import { EventModel } from "../../core/models/EventModel";

export class EventsList extends React.PureComponent<
  any,
  { events: EventModel[]; eventsLoaded: boolean; filter: EventsFilterModel }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      eventsLoaded: false,
      filter: new EventsFilterModel(),
    };
  }

  render() {
    let eventsTable;
    if (this.state.eventsLoaded) {
      eventsTable = (
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
              return <EventListItem key={event.id} {...event}></EventListItem>;
            })}
          </tbody>
        </table>
      );
    } else {
      eventsTable = <p>Loading...</p>;
    }

    return (
      <div className="EventsList">
        <EventsFilter
          {...this.state.filter}
          submitHandler={this.filterSubmitHandler.bind(this)}
          statusChangeHandler={this.statusChangeHandler.bind(this)}
          lastDaysChangeHandler={this.lastDaysChangeHandler.bind(this)}
          categoryFilterChangeHandler={this.categoryFilterChangeHandler.bind(
            this
          )}
          sortingChangeHandler={this.sortingChangeHandler.bind(this)}
        ></EventsFilter>
        {eventsTable}
      </div>
    );
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate() {
    this.getEvents();
  }

  getEvents = () => {
    if (!this.state.eventsLoaded)
      getEventsList(this.state.filter)
        .then((response: AxiosResponse<EventModel[]>) => {
          this.setState({
            events: response.data,
            eventsLoaded: true,
          });
        })
        .catch((error) => {
          console.error(error);
          //TODO: Better error handling here
        });
  };

  filterSubmitHandler() {
    this.setState({
      eventsLoaded: false,
    });
  }

  statusChangeHandler(event: any) {
    const filter: EventsFilterModel = { ...this.state.filter };
    filter.statusFilter = event.target.value;

    this.setState({
      filter: filter,
    });
  }

  lastDaysChangeHandler(event: any) {
    const filter: EventsFilterModel = { ...this.state.filter };
    filter.lastDaysFilter = event.target.value;

    this.setState({
      filter: filter,
    });
  }

  categoryFilterChangeHandler(event: any) {
    const filter: EventsFilterModel = { ...this.state.filter };
    filter.categoryId = event.target.value;

    this.setState({
      filter: filter,
    });
  }

  sortingChangeHandler(event: any) {
    const filter: EventsFilterModel = { ...this.state.filter };
    filter.sorting = event.target.value;

    this.setState({
      filter: filter,
    });
  }
}
