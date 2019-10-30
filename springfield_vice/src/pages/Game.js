import React, { Component } from "react";
import Homer from "../components/Homer";
import ObstacleF from "../components/ObstacleF";
import config from "../components/configSpringfieldVice.json";
import JoyWrapper from "../components/Joystick";
import Timer from "../components/Timer";
import Donut from "../components/Item";
import DonutCounter from "../components/DonutCounter";
import BoutonA from "../components/BoutonA";
import "./game.css";
import Modal from "../components/Modal";
import MovingObs from "../components/MovingObs";
import { getRandomArbitrary } from "../components/helpers";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			positionX: config.initialPosition.x,
			positionY: config.initialPosition.y,
			positionObstacleY: getRandomArbitrary(config.limits.topLimit, config.limits.bottomLimit),
			positionObstacleX: getRandomArbitrary(config.limits.leftLimit, config.limits.rightLimit),
			showModal: false,
			seconds: config.timer.seconds,
			paused: false,
			positionDonutX: parseInt(getRandomArbitrary(config.limits.leftLimit, config.limits.rightLimit)),
			positionDonutY: parseInt(getRandomArbitrary(config.limits.topLimit, config.limits.bottomLimit)),
			catchDonut: false,
			donutCount: 0,
			throwing: false,
			moving: false,
			positionMovingObsX: 300,
			positionMovingObsY: 200,
			movX: [350, 400, 550],
			movY: [250, 200, 300]
		};
		this.tick = this.tick.bind(this);
		this.interval = undefined;
	}

	testLimitsOfMap = () => {
		if (this.state.positionY < config.limits.topLimit) this.setState({ positionY: config.limits.topLimit });
		else if (this.state.positionY > config.limits.bottomLimit)
			this.setState({ positionY: config.limits.bottomLimit });
		else if (this.state.positionX > config.limits.rightLimit)
			this.setState({ positionX: config.limits.rightLimit });
		else if (this.state.positionX < config.limits.leftLimit)
			this.setState({ positionX: config.limits.leftLimit });
	};

	move = (stepX, stepY) => {
		const { positionX, positionY, positionDonutX, positionObstacleX, positionMovingObsX } = this.state;

		this.setState({
			positionX: positionX + stepX,
			positionY: positionY + stepY,
			moving: true
		});
		if (positionX !== config.limits.leftLimit)
			this.setState({
				positionDonutX: positionDonutX - stepX / config.background.defilement,
				positionObstacleX: positionObstacleX - stepX / config.background.defilement,
				positionMovingObsX: positionMovingObsX - stepX / config.background.defilement,
			});

		this.stopMove();
		this.timeOut = setTimeout(() => this.move(stepX, stepY), 20);
		this.collisionDetection();
		this.toCountDonuts();
	};

	stopMove = () => {
		clearTimeout(this.timeOut);
	};

	moveObs = () => {
		let i=0;
		setInterval(() => {
			let newPosX = this.state.movX[i];
			let newPosY = this.state.movY[i];
			this.setState({positionMovingObsX: newPosX});
			this.setState({positionMovingObsY: newPosY});
			i++;
			if(i>=this.state.movX.length){
				i = 0;
			}
		}, 1000);
	};



	tick = () => {
		let { seconds } = this.state;
		this.setState({ seconds: seconds - 1 });

		if (seconds === 0) {
			this.setState({ seconds: 0 });
			alert("GAME OVER");
			clearInterval(this.interval);
		}
	};

	componentDidMount = () => {
		this.interval = setInterval(() => this.tick(), 1000);
		this.moveObs();
	};

	pauseTimer = () => {
		if (this.state.paused === false) {
			clearInterval(this.interval);
		} else {
			this.componentDidMount();
		}
	};

	pauseGame = () => {
		this.setState({ paused: !this.state.paused });
		this.pauseTimer();
	};

	showModal = () => {
		this.setState({ showModal: true });
	};

	hideModal = () => {
		this.setState({ showModal: false });
	};

	collisionDetection = () => {
		if (
			this.state.positionX > this.state.positionDonutX - 30 &&
			this.state.positionX < this.state.positionDonutX + 30 &&
			this.state.positionY < this.state.positionDonutY + 30 &&
			this.state.positionY > this.state.positionDonutY - 30
		)
			this.setState({ catchDonut: true });
	};
	toCountDonuts = () => {
		if (this.state.catchDonut) this.setState({ donutCount: 1 });
	};
	throwingDonut = () => {
		this.setState({ throwing: !this.state.throwing });
		this.setState({ donutCount: 0 });
		this.setState({ catchDonut: false });
	};

	render() {
		const bgStyle = {
			backgroundPositionY: config.background.position,
			backgroundPositionX: -this.state.positionX / config.background.defilement,
			height: config.background.height
		};

		const donutStyle = this.state.catchDonut ? "none" : "block";

		return (
			<div className="game" style={bgStyle}>
				{this.testLimitsOfMap()}

				<Donut
					positionDonutX={this.state.positionDonutX}
					positionDonutY={this.state.positionDonutY}
					donutStyle={donutStyle}
				/>

				<ObstacleF
					positionObstacleX={this.state.positionObstacleX}
					positionObstacleY={this.state.positionObstacleY}
				/>
				<MovingObs
					positionMovingObsX={this.state.positionMovingObsX}
					positionMovingObsY={this.state.positionMovingObsY}
				/>
				<Homer
					positionX={this.state.positionX}
					positionY={this.state.positionY}
					donut={this.state.catchDonut}
				/>
				<DonutCounter donutCount={this.state.donutCount} />
				<JoyWrapper
					move={this.move}
					stopMove={this.stopMove}
					toTheRight={this.toTheRight}
					toTheLeft={this.toTheLeft}
					toTheTop={this.toTheTop}
					toTheBottom={this.toTheBottom}
				/>
				<BoutonA throwingDonut={this.throwingDonut} />

				<Timer pauseGame={this.pauseGame} showModal={this.showModal} seconds={this.state.seconds} />
				<Modal
					className="modal"
					pauseGame={this.pauseGame}
					show={this.state.showModal}
					hideModal={this.hideModal}
					showModal={this.showModal}
				/>
			</div>
		);
	}
}
export default Game;
