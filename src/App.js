import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/cardList/cardList";
import SearchBox from "./components/searchBox/searchBox";

const App = () => {
	const [searchField, setSearchField] = useState("");
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	console.log("rendered");
	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	};

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name
				.toUpperCase()
				.includes(searchField.toUpperCase());
		});

		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>
			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder="Search Monster"
				className="search-box-monsters"
			/>
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

export default App;
