import React from "react";
import ReactCardFlip from "react-card-flip";

export default function Card(props) {
	const { id, card, isFlipped, clickHandler } = props;

	return (
		<ReactCardFlip
			isFlipped={isFlipped}
			flipSpeedBackToFront={1}
			flipSpeedFrontToBack={1}
		>
			<div
				id={id}
				className={`card card-front ${card !== -1 ? "" : "hide-card"}`}
				onClick={clickHandler}
				key='front'
			></div>
			<div
				id={id}
				className={`card card-back ${card !== -1 ? "" : "hide-card"}`}
				onClick={clickHandler}
				key='back'
			>
				<span>{card}</span>
			</div>
		</ReactCardFlip>
	);
}
