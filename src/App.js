import { Component } from "react";
import "./App.css";
import CardList from "./components/cardList/cardList";
import SearchBox from "./components/searchBox/searchBox";

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: "",
		};
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) =>
				this.setState(() => {
					return { monsters: users };
				})
			);
	}

	onSearchChange = (event) => {
		this.setState(() => {
			return { searchField: event.target.value };
		});
	};

	render() {
		const { monsters, searchField } = this.state;
		const { onSearchChange } = this;

		const filteredMonsters = monsters.filter(
			/*prettier-ignore*/
			(monster) => monster.name.toUpperCase().includes(searchField.toUpperCase())
		);

		return (
			<div className="App">
				<SearchBox
					onChangeHandler={onSearchChange}
					placeholder="Search Monster"
					className="search-box"
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
