import React, { Component } from "react";
import "./homer.css";
import config from "./configSpringfieldVice.json";

// import homer from "./img/homersprite.png";
import donut from "./img/donut.png";
import ripchain from "./img/ripchain.png";

class Homer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ripchain: false,
			animeClass: 'donutHide'
		};
	}

	render() {
		const scaledPosY = this.props.positionY * config.homerSize.scale;
		
		const displayDonut = this.props.donutCount > 0 ? "block" : "none";
		const displayRipchain = this.state.ripchain ? "block" : "none";
		
		const isHomerRunningLeft = this.props.isHomerRunningLeft ? 'homerRunLeft' : 'homerRun';
		const isRunning = this.props.isRunning ? isHomerRunningLeft : 'homerStand';
		const isThrowing = this.props.isThrowing ? 'homerThrow' : isRunning;
		// const throwingDonut = this.props.isThrowing ? 'donutThrow' : 'donutHide';

		if(this.props.isThrowing && this.state.animeClass === 'donutHide') {
			this.setState({animeClass:'donutThrow'})
			setTimeout(() => this.setState({animeClass:'donutHide'}), 1000)
		}

		
		
		const donutStyle = {
			display: displayDonut,
			width: config.donutSize.width,
		};
		
		const ripchainStyle = {
			display: displayRipchain,
			width: "60px",
			position: "absolute",
			left: "50%",
			bottom: "0"
		};

		const homerZone = {
			width: "50px",
			height: "50px",
			backgroundColor: "",
			left: `${this.props.positionX}px`,
			top: `${this.props.positionY}px`,
			transform: "scale(" + scaledPosY + ")",
			position: "absolute",
			borderRadius: "50%"
		};

		const homerStyle = {
			backgroundColor: "transparent",
			paddingBottom: "30px",
			height: config.homerSize.height,	
		};
		return (
			<div>
				<div style={homerZone}>
					<div style={homerStyle} className={isThrowing} ></div>
					<img src={donut} style={donutStyle} className={this.state.animeClass} alt="donut" />
					<img src={ripchain} style={ripchainStyle} alt="ripchain" />
				</div>
			</div>
		);
	}
}

export default Homer;
