import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Blog = () => {

    const [blogData, setBlogData] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const [author, setAuthor] = useState("");
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
            axios.post("http://localhost:3004/articles", {
                author: author,
                content: content,
                date: Date.now(),
            // Then, attend d'avoir la data pour la charger dans la vue    
            }).then(() => {
                setError(false);
                setAuthor("");
                setContent("");
                getData();
            }, () => {
                setError(true);
            });
        }
    }

    return (

        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>Blog</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <input 
                    type="text" 
                    placeholder='Nom' 
                    onChange={(event) => setAuthor(event.target.value)}
                    value={author}
                />
                <textarea
                    style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
                    placeholder='Message' 
                    onChange={(event => setContent(event.target.value))}
                    value={content}
                >
                </textarea>
                {
                    error && <p>Veuillez écrire un minimum de 140 caractères !</p>
                }
                <input type="submit" value="Envoyer" />
            </form>

            <ul>
                {
                    blogData
                    //Trier les articles du plus récents au plus anciens
                    .sort((a, b) => b.date - a.date)
                    .map((article) => (
                        <Article key={article.id} article={article}/>
                    ))
                }
            </ul>
        </div>
        
    );
};

export default Blog;