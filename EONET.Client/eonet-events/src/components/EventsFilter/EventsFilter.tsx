import React, { ChangeEvent } from "react";
import "./EventsFilter.css";
import getCategories from "./api";
import { AxiosResponse } from "axios";
import { EventsFilterModel } from "../../core/models/EventsFilterModel";

export class EventsFilter extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      categoriesLoaded: false,
      categories: [],
    };
  }

  private filter: EventsFilterModel = {};

  componentDidMount() {
    this.getCategories();
  }

  render() {
    if (this.state.categoriesLoaded) {
      return (
        <div className="EventsFilter">
          <span>Status Filter:</span>
          <select
            onChange={this.props.statusChangeHandler}
            value={this.props.statusFilter}
          >
            <option value="">all</option>
            <option value="open">open</option>
            <option value="closed">closed</option>
          </select>
          <span>Last Days Filter:</span>
          <input
            type="number"
            min="1"
            onChange={this.props.lastDaysChangeHandler}
            value={this.props.lastDaysFilter}
          ></input>
          <span>Category Filter:</span>
          <select
            onChange={this.props.categoryFilterChangeHandler}
            value={this.props.categoryId}
          >
            <option value="">all</option>
            {this.state.categories.map((category: any) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              );
            })}
          </select>
          <span>Order by:</span>
          <select
            onChange={this.props.sortingChangeHandler}
            value={this.props.sorting}
          >
            <option value="">Default</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
            <option value="category">Category</option>
          </select>
          <button onClick={this.props.submitHandler}>Apply filter</button>
        </div>
      );
    } else {
      return <p className="EventsFilter">Loading...</p>;
    }
  }

  getCategories() {
    if (!this.state.categoriesLoaded) {
      getCategories().then((response: AxiosResponse<any>) => {
        this.setState({
          categories: response.data,
          categoriesLoaded: true,
        });
      });
    }
  }

  statusChangeHandler(event: any) {
    this.filter.statusFilter = event.target.value;
  }

  lastDaysChangeHandler(event: any) {
    this.filter.lastDaysFilter = event.target.value;
  }

  categoryFilterChangeHandler(event: any) {
    this.filter.categoryId = event.target.value;
  }

  sortingChangeHandler(event: any) {
    this.filter.sorting = event.target.value;
  }
}
