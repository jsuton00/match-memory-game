import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

class App extends Component {
	state = {
		isFlipped: Array(16).fill(false),
		shuffleCard: App.duplicateCard().sort(() => Math.random() - 0.5),
		clickCount: 1,
		prevSelectedCard: -1,
		prevCardId: -1,
	};

	static duplicateCard = () => {
		return [0, 1, 2, 3, 4, 5, 6, 7].reduce(
			(preValue, current, index, array) => {
				return preValue.concat([current, current]);
			},
			[],
		);
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
				<div id='game-container' className='game-container container-fluid'>
					<div id='game-grid' className='game-grid container container-fluid'>
						{this.state.shuffleCard.map((card, index) => {
							return (
								<Card
									key={index}
									id={index}
									card={card}
									isFlipped={this.state.isFlipped[index]}
									clickHandler={this.handleClick}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
