import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Ammon".padEnd(15),
      displayWord: "".padEnd(15, " "),
      names: [
        "Ammon".padEnd(15),
        "Frank".padEnd(15),
        "beans".padEnd(15),
        "bananas".padEnd(15)
      ]
    };
    this.nameInput = React.createRef();
  }

  //names = ["AMMON", "JOE", "BARTHEMULE", "joseph"];
  letters = " 123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".split(
    ""
  );

  componentDidMount = () => {};

  flip = displayWord => {
    let name = this.state.name;
    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) != displayWord.charAt(i)) {
        let newChar = this.letters[
          this.letters.indexOf(displayWord.charAt(i)) + 1
        ];
        if (!newChar) {
          newChar = this.letters[0];
        }
        displayWord =
          displayWord.substring(0, i) + newChar + displayWord.substring(i + 1);
      }
    }
    this.setState({ displayWord: displayWord });
    if (name != displayWord) {
      setTimeout(() => this.flip(displayWord), 5);
    }
  };

  changeName = () => {
    let randomIndex = this.random(this.state.names.length);
    var name = this.state.names[randomIndex];
    this.setState({ name: name }, () => {
      this.flip(this.state.displayWord);
    });
  };

  setNames = () => {
    let newNames = this.nameInput.current.value.split(";");
    if (newNames.length > 0) {
      this.setState({ names: newNames.map(x => x.padEnd(15)) });
    }
  };

  random = length =>
    Math.floor(
      (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * length
    );

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          {this.state.displayWord.split("").map((x, index) => (
            <div
              key={index}
              style={{
                border: "1px solid black",
                padding: "1px",
                width: "15px",
                textAlign: "center",
                height: "1em"
              }}
            >
              {x}
            </div>
          ))}
        </div>
        <br />
        <button onClick={() => this.changeName()}>Pick Name</button>
        <hr />
        <input ref={this.nameInput} placeholder="name;name;name" />
        <button onClick={() => this.setNames()}>Set names</button>
        <ul>
          {this.state.names.map((x, index) => (
            <li key={index}>{x}</li>
          ))}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
