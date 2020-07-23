import React, {useState} from 'react';
import "./scss/main.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";

const App = () => {
	const[query, setQuery] = useState("");
	const[recipes, setRecipes] = useState([]);
	const[alert, setAlert] = useState("");

	const YOUR_APP_ID = "3e79a8e1";
	const YOUR_APP_KEY = "2bb832e46be63e2c97eb80c6405cfd02";
	const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

	const getData = async () => {
		if (query !== "") {
			const result = await fetch(url);
			const rs = await result.json();

			if(!rs.more){
				return setAlert("No food with such name");
			}
			console.log(rs);
			setRecipes(rs.hits);
			setAlert("");
			setQuery("");
		} else {
			setAlert("Please fill the form")
		}
	};
	const onSubmit = (event) => {
		event.preventDefault();
		getData();
	};
	const onChange = (event) =>{
		setQuery(event.target.value);
	};
	return (
  	<div className="app container">
	    <h1>Food Recipes Searching</h1>
	    <form className="search-form" onSubmit={onSubmit}>
		    {alert !== "" && <Alert alert = {alert}/>}
		    <input className="search" type="text"
		           placeholder="Search Food"
		           autoComplete="on"
		           onChange={onChange}
		            value={query }/>
		    <input className="search-submit" type="submit" value="Search"/>
	    </form>
	    <div className="recipes">
		    {recipes !== [] && recipes.map(recipe =>  <Recipe key={uuidv4()} recipe = {recipe}/>)}
	    </div>
    </div>
  );

};

export default App;
