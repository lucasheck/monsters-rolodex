import "./card.css";
import { Monster } from "../../App";

type CardProps = {
	monster: Monster;
};

const Card = ({ monster }: CardProps) => {
	const { name, id, email } = monster;

	return (
		<div key={id} className="card-container">
			<img
				src={`https://robohash.org/${id}?set=set2&size=180x180`}
				alt={`Monsters ${name}`}
			/>
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	);
};

export default Card;
