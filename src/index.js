import React from "react";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import "./style/App.css";

const container = document.getElementById("root");
const root = createRoot(container);

class App extends React.Component {
  state = { lat: null, errorMsg: "" };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMsg: err.message })
    );
  }

  renderContent() {
    if (!this.state.lat && !this.state.errorMsg) {
      return <Spinner message="You need to enable Location to run this app." />;
    } else if (!this.state.lat && this.state.errorMsg) {
      return <div>Error: {this.state.errorMsg}</div>;
    }

    return <SeasonDisplay lat={this.state.lat} />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

root.render(<App />);
