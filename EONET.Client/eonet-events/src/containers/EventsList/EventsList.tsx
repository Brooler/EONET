import React from "react";
import getEventsList from "./api";
import { EventListItem } from "../../components/EventListItem/EventListItem";
import { AxiosResponse } from "axios";
import "./EventsList.css";
import { EventsFilterModel } from "../../core/models/EventsFilterModel";
import { EventsFilter } from "../../components/EventsFilter/EventsFilter";
import { EventModel } from "../../core/models/EventModel";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { FilterPlaceholder } from "../../components/FilterPlaceholder/FilterPlaceholder";

export class EventsList extends React.PureComponent<
  any,
  {
    events: EventModel[];
    eventsLoaded: boolean;
    filter: EventsFilterModel;
    hideFilter: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    const filter: EventsFilterModel = {
      lastDaysFilter: 365,
    };

    this.state = {
      events: [],
      eventsLoaded: false,
      filter: filter,
      hideFilter: true,
    };
  }

  render() {
    let eventsTable;
    if (this.state.eventsLoaded) {
      eventsTable = (
        <Table bordered>
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
        </Table>
      );
    } else {
      eventsTable = <p>Loading...</p>;
    }

    let filterComponent;

    if (!this.state.hideFilter) {
      filterComponent = (
        <EventsFilter
          {...this.state.filter}
          submitHandler={this.filterSubmitHandler.bind(this)}
          statusChangeHandler={this.statusChangeHandler.bind(this)}
          lastDaysChangeHandler={this.lastDaysChangeHandler.bind(this)}
          categoryFilterChangeHandler={this.categoryFilterChangeHandler.bind(
            this
          )}
          sortingChangeHandler={this.sortingChangeHandler.bind(this)}
          hideFilterHandler={this.hideFilterHandler.bind(this)}
        ></EventsFilter>
      );
    } else {
      filterComponent = (
        <FilterPlaceholder
          showFilterHandler={this.hideFilterHandler.bind(this)}
        />
      );
    }

    return (
      <Container className="EventsList">
        {filterComponent}
        {eventsTable}
      </Container>
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

  hideFilterHandler(hide: boolean) {
    this.setState({
      hideFilter: hide,
    });
  }
}
