import React from "react";
import "./EventsFilter.css";
import getCategories from "./api";
import { AxiosResponse } from "axios";
import { CategoryModel } from "../../core/models/CategoryModel";

export class EventsFilter extends React.PureComponent<
  any,
  { categories: CategoryModel[]; categoriesLoaded: boolean }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      categoriesLoaded: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  //TODO: Better to split all filters/sorting to its own components
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
            <option value="dateAsc">Date Asc</option>
            <option value="dateDesc">Date Desc</option>
            <option value="statusAsc">Status Asc</option>
            <option value="statusDesc">Status Desc</option>
            <option value="categoryAsc">Category Asc</option>
            <option value="categoryDesc">Category Desc</option>
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
      getCategories()
        .then((response: AxiosResponse<CategoryModel[]>) => {
          this.setState({
            categories: response.data,
            categoriesLoaded: true,
          });
        })
        .catch((error) => {
          console.error(error);
          //TODO: Better error handling here
        });
    }
  }
}
