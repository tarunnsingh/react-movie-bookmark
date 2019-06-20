import React,{useContext} from 'react'
import {Link} from 'react-router-dom'

import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import MyContext from '../config/context'

import Search from '../components/Search'
import MovieList from '../components/MovieList'

export default props =>{

    const {searchResults,contentloading} = useContext(MyContext)
    return(
        <div className="searchResult">
            <header>
            <Link className="link" to="/dashboard">
                <i className="fas fa-arrow-left fa-lg"> </i>
            </Link>
            <Search />
            </header>
           
            <section>
            {
                contentloading?<div className="content_center">
                <Spinner color="#6c63ff" size={32} speed={1} animating={true} />
                </div>: <MovieList
                myList={searchResults}
                />
            }
               
            </section>
            
            
        </div>
    )
}