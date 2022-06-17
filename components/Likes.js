import React from "react";
import _ from "lodash";
import { SlackCounter, SlackSelector } from "@charkour/react-reactions";
import { API, Auth } from "aws-amplify";
import { updatePost } from "../src/graphql/mutations";
import { GoSmiley } from "react-icons/go";
export class Slack extends React.Component {
  state = {
    counters: this.props.counters,
    user: "case",
    showSelector: false,
  };

  async componentDidMount() {
    const userAttri = await Auth.currentUserInfo();
    const { username } = userAttri;
    console.log(username);
    this.setState({ user: username });
  }

  handleAdd = () => this.setState({ showSelector: true });

  handleSelect = async (emoji) => {
    const index = _.findIndex(this.state.counters, {
      emoji,
      by: this.state.user,
    });
    if (index > -1) {
      const arr = [
        ...this.state.counters.slice(0, index),
        ...this.state.counters.slice(index + 1),
      ];

      await API.graphql({
        query: updatePost,
        variables: {
          input: {
            id: this.props.id,
            reactions: [
              ...this.state.counters.slice(0, index),
              ...this.state.counters.slice(index + 1),
            ],
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      this.setState({
        counters: [...arr],
        showSelector: false,
      });
    } else {
      const arr = [...this.state.counters, { emoji, by: this.state.user }];

      await API.graphql({
        query: updatePost,
        variables: {
          input: {
            id: this.props.id,
            reactions: arr,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      this.setState({
        counters: arr,
        showSelector: false,
      });
    }
  };

  render() {
    return (
      <div style={{ position: "relative" }} className="emoji-slide">
        <div onClick={this.handleAdd} style={{ marginBottom: 30 }}>
          <GoSmiley />
        </div>
        <SlackCounter
          counters={this.state.counters}
          user={this.state.user}
          onAdd={this.handleAdd}
          onSelect={this.handleSelect}
        />

        {this.state.showSelector ? (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              marginBottom: "10px",
            }}
          >
            <SlackSelector onSelect={this.handleSelect} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Slack;
