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
      ],
      speed: 5
    };
    this.nameInput = React.createRef();
  }

  letters = " !@#$%^&*()?123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".split(
    ""
  );

  flip = (name, displayWord) => {
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
    this.setState({ displayWord: displayWord }, () => {
      if (name != displayWord) {
        setTimeout(() => this.flip(name, displayWord), this.state.speed);
      }
    });
  };

  changeName = () => {
    let randomIndex = this.random(this.state.names.length);
    var name = this.state.names[randomIndex];
    this.setState({ name: name }, () => {
      this.flip(this.state.name, this.state.displayWord);
    });
  };

  setNames = () => {
    if (!this.nameInput.current.value) return;
    let newNames = this.nameInput.current.value.split(";");
    this.setState({ names: newNames.map(x => x.padEnd(15)) });
  };

  random = length =>
    Math.floor(
      (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * length
    );

  faster = () => {
    let newSpeed = this.state.speed - 2;
    if (newSpeed < 0) newSpeed = 0;
    this.setState({ speed: newSpeed });
  };

  slower = () => {
    let newSpeed = this.state.speed + 2;
    this.setState({ speed: newSpeed });
  };

  render() {
    return (
      <div>
        <h1>Name Flipper</h1>
        <DisplayFlipper word={this.state.displayWord} />
        <br />
        <hr />
        <br />
        <input
          className="input-text"
          ref={this.nameInput}
          placeholder="name;name;name"
        />
        <button className="raise" onClick={() => this.changeName()}>
          Pick Name
        </button>
        <button className="raise" onClick={() => this.setNames()}>
          Set names
        </button>
        <button className="raise" onClick={() => this.faster()}>
          Faster ({this.state.speed})
        </button>
        <button className="raise" onClick={() => this.slower()}>
          Slower ({this.state.speed})
        </button>
        <ListNames names={this.state.names} />
      </div>
    );
  }
}

const DisplayFlipper = ({ word }) => (
  <div className="word">
    {word.split("").map((x, index) => (
      <div key={index} className="letter">
        {x}
      </div>
    ))}
  </div>
);

const ListNames = ({ names }) => (
  <ul>
    {names.map((x, index) => (
      <li key={index}>{x}</li>
    ))}
  </ul>
);

render(<App />, document.getElementById("root"));
