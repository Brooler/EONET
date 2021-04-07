import React from "react";
import "./EventsFilter.css";
import getCategories from "./api";
import { AxiosResponse } from "axios";
import { CategoryModel } from "../../core/models/CategoryModel";
import { Button, Container, Form } from "react-bootstrap";

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
    let content = <p>Loading...</p>;

    if (this.state.categoriesLoaded) {
      content = (
        <Form>
          <Form.Group>
            <Form.Label>Status Filter:</Form.Label>
            <Form.Control
              as="select"
              onChange={this.props.statusChangeHandler}
              value={this.props.statusFilter}
            >
              <option value="">all</option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Days Filter:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              onChange={this.props.lastDaysChangeHandler}
              value={this.props.lastDaysFilter}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category Filter:</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Order by:</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.props.submitHandler}>
            Apply filter
          </Button>
          <Button
            className="float-right"
            variant="light"
            onClick={this.props.hideFilterHandler.bind(this, true)}
          >
            Hide Filter
          </Button>
        </Form>
      );
    }

    return <Container className="EventsFilter">{content}</Container>;
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
