import React from 'react'
import {Link} from 'react-router-dom'
export default props =>{

    const movieList = props.myList.map( movie => {
        return (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
        <div className="movieThumbnail">
            <img src={movie.Poster} width="100" alt={movie.Title} />
            
        </div>
        </Link>
        )
    })
    return(
        <div className="movieList">
            {movieList}
        </div>
    )
}