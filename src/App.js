import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import {
	faGem,
	faPaperPlane,
	faAnchor,
	faBolt,
	faCube,
	faLeaf,
	faBicycle,
	faStar,
} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
	state = {
		isFlipped: Array(16).fill(false),
		shuffleCard: App.duplicateCard().sort(() => Math.random() - 0.5),
		clickCount: 1,
		prevSelectedCard: -1,
		prevCardId: -1,
	};

	static duplicateCard = () => {
		return [
			{ icon: faGem, colour: "#66d1d2" },
			{ icon: faPaperPlane, colour: "#00aeef" },
			{ icon: faAnchor, colour: "#9ac6e0" },
			{ icon: faBolt, colour: "#0e6ebf" },
			{ icon: faCube, colour: "#a2d2df" },
			{ icon: faLeaf, colour: "#2ea44f" },
			{ icon: faBicycle, colour: "#f99f00" },
			{ icon: faStar, colour: "#733ad5" },
		].reduce((preValue, current, index, array) => {
			return preValue.concat([current, current]);
		}, []);
	};

	handleClick = (event) => {
		event.preventDefault();
		const cardId = event.target.id;
		const newFlips = this.state.isFlipped.slice();
		this.setState({
			prevSelectedCard: this.state.shuffleCard[cardId],
			prevCardId: cardId,
		});

		if (newFlips[cardId] === false) {
			newFlips[cardId] = !newFlips[cardId];
			this.setState((prevState) => ({
				isFlipped: newFlips,
				clickCount: this.state.clickCount + 1,
			}));

			if (this.state.clickCount === 2) {
				this.setState({ clickCount: 1 });
				const prevCardId = this.state.prevCardId;
				const newCard = this.state.shuffleCard[cardId];
				const previousCard = this.state.prevSelectedCard;

				this.isCardMatch(previousCard, newCard, prevCardId, cardId);
			}
		}
	};

	isCardMatch = (card1, card2, card1Id, card2Id) => {
		if (card1 === card2) {
			const hideCard = this.state.shuffleCard.slice();

			hideCard[card1Id] = -1;
			hideCard[card2Id] = -1;

			setTimeout(() => {
				this.setState((prevState) => ({
					shuffleCard: hideCard,
				}));
			}, 1000);
		} else {
			const flipBack = this.state.isFlipped.slice();
			flipBack[card1Id] = false;
			flipBack[card2Id] = false;

			setTimeout(() => {
				this.setState((prevState) => ({
					isFlipped: flipBack,
				}));
			}, 1000);
		}
	};

	restartGame = () => {
		this.setState({
			isFlipped: Array(16).fill(false),
			shuffleCard: App.duplicateCard().sort(() => Math.random() - 0.5),
			clickCount: 1,
			prevSelectedCard: -1,
			prevCardId: -1,
		});
	};

	isGameOver = () => {
		return this.state.isFlipped.every(
			(element, index, array) => element !== false,
		);
	};

	render() {
		return (
			<div id='game' className='game container-fluid'>
				<Header restartGame={this.restartGame} />
				<main id='game-play' className='game-play-area container-fluid'>
					<div id='game-play-row' className='game-play-row row'>
						<div id='game-grid' className='game-grid container'>
							{this.state.shuffleCard.map((card, index) => {
								return (
									<Card
										key={index}
										id={index}
										card={card.icon}
										background={card.colour}
										isFlipped={this.state.isFlipped[index]}
										clickHandler={this.handleClick}
									/>
								);
							})}
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
