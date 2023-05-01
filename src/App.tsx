import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import CardList from "./components/cardList/cardList";
import SearchBox from "./components/searchBox/searchBox";
import { getData } from "./utils/data.utils";

export type Monster = {
	id: string;
	name: string;
	email: string;
};

const App = () => {
	const [searchField, setSearchField] = useState("");
	const [monsters, setMonsters] = useState<Monster[]>([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getData<Monster[]>(
				"https://jsonplaceholder.typicode.com/users"
			);
			setMonsters(users);
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name
				.toUpperCase()
				.includes(searchField.toUpperCase());
		});

		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchField(event.target.value);
	};

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
