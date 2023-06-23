import React from "react";
import players1 from "../../players.json";
export default function PlayerDetail({ close, i, addPlayer, selectedPlayers }) {
	const [players] = React.useState([...players1]);
	return (
		//Style fixed to center
		<div
			className="card outlined mt-0"
			style={{
				position: "fixed",
				left: "50%",
				transform: "translateX(-50%)",
				padding: "20px",
				width: "500px",
				top: "30%",
			}}
			data-testid={`player-Rohit-Sharma-details`}
		>
			<h1 className="card-title" style={{ textAlign: "center" }}>
				Player Detail
			</h1>
			<p>
				<strong>Name:</strong> <span data-testid="player-detail-Rohit-Sharma-name">{players[i].name}</span>
			</p>
			<p>
				<strong>Type:</strong> <span data-testid="player-detail-Rohit-Sharma-type">{players[i].type}</span>
			</p>
			<p>
				<strong>Batting:</strong> <span data-testid="player-detail-Rohit-Sharma-batting">{players[i].battingSkill}</span>
			</p>
			<p>
				<strong>Bowling:</strong> <span data-testid="player-detail-Rohit-Sharma-bowling">{players[i].bowlingSkill}</span>
			</p>
			<button
				disabled={selectedPlayers.includes(players[i])}
				onClick={() => addPlayer(i)}
				data-testid="player-detail-Rohit-Sharma-add"
			>
				Select
			</button>
			<button onClick={close} className="danger" data-testid="player-detail-Rohit-Sharma-close">
				Close
			</button>
		</div>
	);
}
