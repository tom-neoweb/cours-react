import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Blog = () => {

    const [blogData, setBlogData] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const getData = () => {
        axios
        .get("http://localhost:3004/articles")
        .then((response) => setBlogData(response.data));
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(content.length < 140) {
            setError(true);
        } else {
            setError(false);
        }
    }

    return (

        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>Blog</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <input type="text" placeholder='Nom' />
                <textarea
                    style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
                    placeholder='Message' 
                    onChange={(event => setContent(event.target.value))}>
                </textarea>
                {
                    error && <p>Veuillez écrire un minimum de 140 caractères !</p>
                }
                <input type="submit" value="Envoyer" />
            </form>

            <ul>
                {
                    blogData.map((article) => (
                        <Article key={article.id} article={article}/>
                    ))
                }
            </ul>
        </div>
        
    );
};

export default Blog;