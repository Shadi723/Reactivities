import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/Demo")
      .then((response) => {
        this.setState({
          values: response.data,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    var myValues = this.state.values;
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivitis</Header.Content>
        </Header>
        <List>
          {myValues.map((value: any) => (
            <List.Item>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
