import React from 'react';
import './flatly.css';
import './App.css'
import {connect, sendMsg} from "./api";

// $b2:#F9FAFA;
// $b3:#FFFBEB;
// $b4:#947205;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chatHistory: [], message: "Hello"}
  }

  componentDidMount() {
    connect(msg => {
      console.log("A new Message is sent");
      this.setState({chatHistory: [...this.state.chatHistory, msg]});
      console.log(this.state)
    });
  }

  sendHello() {
    console.log(this.state.message);
    sendMsg(this.state.message);
  }

  render() {
    const {message, chatHistory} = this.state;
    let inRow = true;
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Chat App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                    aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
              {/*<span className="navbar-toggler-icon"></span>*/}
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className='m-3'>
            <button type="button" className="btn btn-secondary btn-lg"
                    onClick={() => this.sendHello()}>Say Hello
            </button>
          </div>
          <div className='container m-3'>
            <section>
              <h1>Chat History</h1>
              <div className='chat-history'>
                <table className="table table-hover">
                  <thead>
                  <tr>
                    <th scope="col">Message Sent to the Server</th>
                    <th scope="col">Message received by the Server</th>
                  </tr>
                  </thead>
                  <tbody>
                  {chatHistory.map((msg, index) => {
                    if (inRow) {
                      inRow = false;
                      return (
                          <tr>
                            <td>{message}</td>
                            <td>{msg.data}</td>
                          </tr>
                      )
                    } else {
                      inRow = true;
                      return (
                          <tr className="table-dark">
                            <td>{message}</td>
                            <td>{msg.data}</td>
                          </tr>
                      )
                    }
                  })}
                  </tbody>
                </table>

              </div>

            </section>
          </div>
        </div>
    );
  }
}


export default App;
