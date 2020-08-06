import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Header(props) {
	const { restartGame } = props;
	return (
		<header id='header-game' className='header-game'>
			<div id='game-nav-row' className='game-nav row'>
				<div className='game-title'>Match Memory Game</div>
				{/* <div className='timer'>Timer</div>
				<div className='game-status'>Status</div> */}
				<div className='restart-game' onClick={restartGame}>
					<FontAwesomeIcon icon={faRedoAlt} />
					<span className='restart-game-text'>Restart</span>
				</div>
			</div>
		</header>
	);
}
