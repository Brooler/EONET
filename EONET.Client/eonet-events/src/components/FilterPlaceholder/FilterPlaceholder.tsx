import React from "react";
import { Button, Container } from "react-bootstrap";
import "./FilterPlaceholder.css";

export class FilterPlaceholder extends React.PureComponent<any> {
  render() {
    return (
      <Container className="FilterPlaceholder">
        <Button
          variant="light"
          onClick={this.props.showFilterHandler.bind(this, false)}
        >
          Show Filter
        </Button>
      </Container>
    );
  }
}
