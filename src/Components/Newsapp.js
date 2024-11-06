import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "b678e4d03bdb4779a994dc901b973d6a";

    const getData = async () => {
        if (!search.trim()) return;  // Avoid fetching if search is empty or just spaces
    
        try {
            console.log(`Fetching news for: ${search}`);  // Debugging: log the search term
            
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
    
            // Check for HTTP status errors
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const jsonData = await response.json();
            console.log(jsonData);  // Log the full response to verify the structure
    
            // Only update if jsonData.articles exists and has items
            if (jsonData.articles && jsonData.articles.length > 0) {
                let dt = jsonData.articles.slice(0, 10); // Get the first 10 articles
                setNewsData(dt);
            } else {
                setNewsData([]); // Set an empty array if no articles found
            }
        } catch (error) {
            // Log the error details
            console.error("Error fetching news:", error);
            setNewsData([]); // Handle errors by setting empty data
        }
    };
    

    useEffect(() => {
        getData();
    }, [search]);  // Trigger getData whenever search state changes

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryClick = (category) => {
        setSearch(category);  // Set the search term to the category clicked
    };

    return (
        <div>
            <nav>
                <div>
                    <h1 className='tittle'>Trendy News</h1>
                </div>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput}/>
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>some trendy topics!!!</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={() => handleCategoryClick("ChatGpt")}>ChatGpt</button>
                <button onClick={() => handleCategoryClick("Technology")}>Technology</button>
                <button onClick={() => handleCategoryClick("Blockchain")}>Blockchain</button>
                <button onClick={() => handleCategoryClick("Artificial Intelligence")}>AI</button>
                <button onClick={() => handleCategoryClick("fitness")}>Fitness</button>
            </div>

            <div className='content-container'>
                {newsData && newsData.length > 0 ? <Card data={newsData} /> : <p className="no-news-message">No news available</p>}
            </div>
        </div>
    );
};

export default Newsapp;
//updated