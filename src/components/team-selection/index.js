import React from "react";

import PlayerDetail from "../player-info";
import playersList from "../../players.json";
export default function TeamSelection() {
	const [players] = React.useState([...playersList]);
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
	const [idx, setIdx] = React.useState(null);
	const [welcome, setWelcome] = React.useState(true);
	const [noBat, setNoBat] = React.useState(0);
	const [noBowl, setNoBowl] = React.useState(0);
	const [noAR, setNoAR] = React.useState(0);
	const [noWk, setNoWK] = React.useState(0);


	const addPlayer = (index) => {

		if (selectedPlayers.length < 11) {

			switch (players[index].type) {
				case 'Batsman':
					noBat === 6 && alert("Max batsmen limit of 6 already reached. Please select other players.");
					if (noAR + noBat + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 bowlers');
						return;
					};
					if (noBat + noBowl + noWk === 10) {
						alert('Remove player(s) if needed, and add at least 1 all rounder');
						return;
					};
					if (noBat + noBowl + noAR === 10) {
						alert('Remove player(s) if needed, and add at least 1 wicket keeper');
						return;
					};
					if (noBat < 6) {
						setNoBat(n => n + 1);
						setSelectedPlayers(p => [...p, players[index]]);
					};
					break;

				case 'Bowler':
					noBowl === 6 && alert("Max bowler limit of 6 already reached. Please select other players.");
					if (noAR + noBowl + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 batsmen');
						return;
					};
					if (noBat + noBowl + noAR === 10) {
						alert('Remove player(s) if needed, and add at least 1 all rounder');
						return;
					};
					if (noBat + noBowl + noWk === 10) {
						alert('Remove player(s) if needed, and add at least 1 wicket keeper');
						return;
					};
					if (noBowl < 6) {
						setNoBowl(n => n + 1);
						setSelectedPlayers(p => [...p, players[index]]);
					};
					break;

				case 'AllRounder':
					noAR === 4 && alert("Max all-rounder limit of 4 already reached. Please select other players.");
					if (noAR + noBowl + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 batsmen');
						return;
					};
					if (noAR + noBat + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 bowlers');
						return;
					};
					if (noBat + noBowl + noAR === 10) {
						alert('Remove player(s) if needed, and add at least 1 wicket keeper');
						return;
					};
					if (noAR < 4) {
						setNoAR(n => n + 1);
						setSelectedPlayers(p => [...p, players[index]]);
					};
					break;

				case 'WicketKeeper':
					noWk === 1 && alert("Max wicket-keeper limit of 1 already reached. Please select other players.");
					if (noAR + noBowl + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 batsmen');
						return;
					};
					if (noAR + noBat + noWk === 8) {
						alert('Remove player(s) if needed, and add at least 3 bowlers');
						return;
					};
					if (noBat + noBowl + noWk === 10) {
						alert('Remove player(s) if needed, and add at least 1 all rounder');
						return;
					};
					if (noWk < 1) {
						setNoWK(n => n + 1);
						setSelectedPlayers(p => [...p, players[index]]);
					};
					break;

				default:
					break;
			}

		}

		else if (selectedPlayers.length === 11) {
			alert('Max of 11 players already added. Remove some players to add more.')
		}

		return;
	};

	const removePlayer = (index) => {
		setSelectedPlayers(p => p.filter(ele => ele !== p[index]));

		switch (players[index].type) {
			case 'Batsman':
				setNoBat(n => n - 1);
				break;

			case 'Bowler':
				setNoBowl(n => n - 1);
				break;

			case 'AllRounder':
				setNoAR(n => n - 1);
				break;

			case 'WicketKeeper':
				setNoWK(n => n - 1);
				break;

			default:
				break;
		}

		return;
	};

	const showplayerDetailsCard = (i) => {
		setIdx(i);
		setShowPlayerDetail(true);
		return;
	};

	const closeCard = () => {
		setShowPlayerDetail(false);
		return;
	};

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div style={{ display: "flex", width: "80%" }}>
				{showPlayerDetail ?
					(
						<PlayerDetail
							selectedPlayers={selectedPlayers}
							i={idx}
							close={closeCard}
							index={0}
							addPlayer={addPlayer}
						/>
					)
					: null
				}
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Available Players</h4>
						<table>
							<thead>
								<tr>
									<th
										data-testid="available-players-name"
									>
										Name
									</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="available-players-table-body">
								{
									welcome ?
										(<tr>
											<td data-testid="selection-rules" colSpan="3" className="card pb-20">
												<p data-testid="close-welcome" style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => setWelcome(false)}>X</p>
												<h3 style={{ textAlign: "center" }}>
													<strong>Welcome to Team Selection</strong>
												</h3>
												11 players are required in a team <br />
												3-6 batsmen and bowlers are allowed in a team
												<br />
												Only 1 Wicket Keeper required in a team
												<br />
												1-4 All Rounders are allowed in a team
											</td>
										</tr>) : null
								}
								{
									players.map((player, index) => {
										return (
											<tr
												data-testid={`available-${player.name}
														.split(" ")
														.join("-")-row`}
												key={index}
											>
												<td
													data-testid={`available-${player.name}
														.split(" ")
														.join("-")-name`}
													onClick={() => showplayerDetailsCard(index)}
												>
													{player.name}
												</td>
												<td onClick={() => showplayerDetailsCard(index)}>
													{player.type}
												</td>
												<td>
													<button
														data-testid={`available-${player.name}
														.split(" ")
														.join("-")-select`}
														onClick={() => addPlayer(index)}
														disabled={selectedPlayers.includes(players[index])}
														className="btn btn-primary text"
													>
														Select
													</button>
												</td>
											</tr>
										)
									}
									)}
							</tbody>
						</table>
					</div>
				</div>
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Selected Players</h4>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="selected-players-table-body">
								{selectedPlayers && selectedPlayers.map((player, index) => {
									return (
										<tr
											data-testid={`selected-${player.name
												.split(" ")
												.join("-")}-row`}
											key={index}
										>
											<td>{player.name}</td>
											<td>{player.type}</td>
											<td>
												<button
													data-testid={`selected-${player.name
														.split(" ")
														.join("-")}-remove`}
													onClick={() => removePlayer(index)}
													className="btn danger text"
												>
													Remove
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
