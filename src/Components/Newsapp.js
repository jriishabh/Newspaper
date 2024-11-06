import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState(null)
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    

    const getData = async () => {
        if (!search.trim()) return;  // Avoid fetching if search is empty or just spaces
    
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            console.log(jsonData.articles);
            
            // Only update if jsonData.articles exists and has items
            if (jsonData.articles && jsonData.articles.length > 0) {
                let dt = jsonData.articles.slice(0, 10); // Get the first 10 articles
                setNewsData(dt);
            } else {
                setNewsData([]); // Set an empty array if no articles found
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setNewsData([]); // Handle errors by setting empty data
        }
    };
    

    useEffect(()=>{
        getData()
    },[])

    const handleInput = (e) =>{
        console.log(e.target.value);
        setSearch(e.target.value)
        
    }
    const userInput = (event) =>{
        setSearch(event.target.value)
    }

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
            <button onClick={userInput} value="ChatGpt">ChatGpt</button>
            <button onClick={userInput} value="Technology">Technology</button>
            <button onClick={userInput} value="Blockchain">Blockchain</button>
            <button onClick={userInput} value="Artificial Intelligence">AI</button>
            <button onClick={userInput} value="fitness">Fitness</button>
        </div>

        <div className='content-container'>
        {newsData && newsData.length > 0 ? <Card data={newsData} /> : <p className="no-news-message">No news available</p>}
    </div>

    </div>
  )
}

export default Newsapp