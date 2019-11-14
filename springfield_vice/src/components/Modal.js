/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import config from "../components/configSpringfieldVice.json";
import { createPortal } from "react-dom";
import "./modal.css";
import "./homer.css";
import img_winner from './img/homer_bart.gif';
import img_looser from './img/bart_gameover.png';


const modalStyle = {
  display: "flex",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  // backgroundColor: "rgba(255,0,230,1)",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "#FFF",
  fontSize: "20px",
  justifyContent: "center",
  verticalAlign: "middle",
};
const imgStyle = {
  backgroundColor: "rgba(56,42,125,0.9)",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  textShadow: "2px 2px 2px rgba(255,0,230,1)",
  
}

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      music: config.modal.music,
      sounds: config.modal.sounds,
    };
  };

  showHeader() {
    const other_buttons = 
      <>
        <button>SCORES</button>
        <button onClick={() => this.toggleSounds()}>SOUNDS {!this.state.sounds ? 'ON' : 'OFF'}</button>
        <button onClick={() => this.toggleMusic()}>MUSIC {!this.state.music ? 'ON' : 'OFF'}</button>
      </>;
    const content = [];
    content.image = imgStyle

    // this.props.origin
    switch ("go_win") {
      case "start":
        content.image = {...content.image,
            backgroundColor: "rgba(56,42,125,0.9)",
            }
        {content.header = "Settings"};
        {content.quote = `"Trying is the first step towards failure."`};
        content.buttons = 
          <>
            {other_buttons}
            <Link to="/game/"><button>PLAY</button></Link>
            <button id="close" onClick={() => this.props.close()}>X</button>
          </>;
        break;
      case "go_win": // FIN DE PARTIE + GAGNANT
        content.image2 = { backgroundImage: `url(${img_winner})`, backgroundSize: "70%", position: "absolute", width: "710px", height: "77.5vh", backgroundRepeat: "no-repeat", zIndex: "-1", justifyContent: "center",
        }
        content.header = "GOOD JOB !"
        content.quote = `"Stupid risks make life worth living."`;
        content.buttons = 
          <>
            <button>SCORES</button>
            <Link to="/"><button>RESTART</button></Link>
          </>;
        {this.props.hide(true)}
        break;
      case "go_lost": // FIN DE PARTIE + PERDANT
        content.image = {...content.image,
          backgroundPosition: "right 10% center",
          backgroundRepeat: "no-repeat", 
          backgroundSize: "30%",
          backgroundImage: `url(${img_looser})`,
          backgroundColor: "rgba(56,42,125,0.9)",
          }
        content.header = "GAME OVER"
        content.quote = `"Kid, you tried your best, and you failed miserably.`;
        content.quote2 = `The lesson is: never try."`;
        content.buttons = 
          <>
            <button>SCORES</button>
            <Link to="/"><button>RESTART</button></Link>
          </>;
        {this.props.hide(true)}
        break;
      default: 
        content.image = {...content.image,
          backgroundColor: "rgba(56,42,125,0.9)",
        }
        content.header = "PAUSE";
        content.quote = `"Do you need a break or are you giving up?"`;
        content.buttons =
          <>
            <Link to="/"><button>RESTART</button></Link>
            {other_buttons}
            <Link to={{ pathname: "/game", search: "" }}>
              <button onClick={() => this.props.resume()}>RESUME</button>
              <button id="close" onClick={() => this.props.resume()}>X</button>
            </Link>
          </>;
        {this.props.hide()}
    }
    return content;
  }

  toggleMusic = () => {
    this.setState({music: !this.state.music});
    if (this.state.music) {
      // couper la musique...
    }
    else {
      // remettre la musique...
    }
  }

  toggleSounds = () => {
    this.setState({sounds: !this.state.sounds});
    if (this.state.sounds) {
      // couper les sons...
    }
    else {
      // remettre les sons...
    }
  }

  render() {

    // const containerWrapStyle ={
    //   position: "absolute",
    //   display: "block",
    //   justifyContent: "center",
    //   width: "498px",
    //   height: "100vh",
    //   top: "11%",
    //   zIndex: "-1"
      
    // }

    return createPortal(
      <div style={modalStyle} className="modal" onClick={this.props.onClick}>
          {/* <div style={containerWrapStyle}>
              <div style={this.showHeader().image2}></div>
          </div> */}
        <div className="modal-wrapper" style={this.showHeader().image}>
          <div className="modal-header">
            <h3>{this.showHeader().header}</h3>
          </div>
          <div className="stranglingBart"></div>
          <div className="modal-body">
            <p>{this.showHeader().quote}</p>
            <p>{this.showHeader().quote2}</p>
          </div>
          <div>
            
            {this.showHeader().buttons}
          </div>
        </div>
      </div>,
      document.getElementById("modal_root"),
    );
  }
}
