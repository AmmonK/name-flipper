import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      displayWord: "",
      wordLength: 15,
      names: ["Ammon", "Frank", "beans", "bananas"],
      speed: 5,
      iterations: 0
    };
    this.nameInput = React.createRef();
  }

  letters = " !@#$%^&*()?123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".split(
    ""
  );

  componentDidMount = () => {
    this.setState({
      name: this.state.names[0].padEnd(this.state.wordLength),
      displayWord: "".padEnd(this.state.wordLength)
    });
  };

  flip = (name, displayWord) => {
    if (this.state.iterations > 200) return;
    // counter iterations so that it does not run forever
    this.setState({ iterations: this.state.iterations + 1 });
    // this is here so i can see if the flip is still running when it should not be
    console.log("running");
    for (let i = 0; i < this.state.wordLength; i++) {
      if (name.charAt(i) !== displayWord.charAt(i)) {
        let newChar = this.getNextLetter(displayWord.charAt(i));
        displayWord =
          displayWord.substring(0, i) + newChar + displayWord.substring(i + 1);
      }
    }
    this.setState({ displayWord: displayWord }, () => {
      if (name !== displayWord) {
        setTimeout(() => this.flip(name, displayWord), this.state.speed);
      } else {
        this.setState({ iterations: 0 });
      }
    });
  };

  getNextLetter = character => {
    let position = this.letters.indexOf(character);
    // ternary, if the position is less than the length of the array then increment, otherwise start at 0
    return this.letters[position < this.letters.length - 1 ? position + 1 : 0];
  };

  changeName = () => {
    let randomIndex = this.random(this.state.names.length);
    var name = this.state.names[randomIndex];
    this.setState({ name: name.padEnd(15) }, () => {
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
