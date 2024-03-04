import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase/setup';

const Home = (props) => {
    const [news, setNews] = useState([]);

    

    const addNews =  async (data) =>{
        const newsDoc = doc(database, "News",`${data.url.substr(-10,10)}`)
        try{
            await setDoc(newsDoc,{
                title: data.title,
                description: data.description
            })
        }catch(err){
            console.error(err)
        }
        
    }

    const getNews = () => {
        fetch(`https://newsapi.org/v2/everything?q=${props.menu ? props.menu : "indonesia"}&sortBy=popularity&apiKey=be575729b2654fbcb48a27a70813f941`)
            .then(res => res.json())
            .then(json => setNews(json.articles))
            .catch(error => console.error('Error fetching news:', error));
    };

    useEffect(() => {
        getNews();
    }, [props.menu]);

    return (
        <div className='mt-40 ml-6 p-5 grid grid-cols-4 gap-3'>
            {news?.filter(data => data.title.includes(props.search)).map((data) => {
                return <>
                    <Link onClick={()=> addNews(data)} to="/details" state={{data:data}}> 
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={data.urlToImage} alt="gambare langka" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{data.title}</div>
                                <p className="text-gray-700 text-base">
                                    {data.content ? data.content : 'No content available'}
                                </p>
                            </div>
                        </div>
                    </Link>

                </>
            })}

        </div>
    );
};

export default Home;
