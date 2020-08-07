import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactCardFlip from "react-card-flip";

export default function Card(props) {
	const { id, card, background, isFlipped, clickHandler } = props;

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
				style={{ backgroundColor: background }}
				onClick={clickHandler}
				key='back'
			>
				<span>
					<FontAwesomeIcon icon={card} size='2x' fixedWidth />
				</span>
			</div>
		</ReactCardFlip>
	);
}
