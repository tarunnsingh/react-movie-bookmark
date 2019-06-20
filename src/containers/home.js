import React from 'react'
import {Link} from 'react-router-dom'

export default props =>{

    return(
        <div className="home">
            <div className="wrapper">
                <section className="home_text">
                    <h1 className="heading">
                    Seach  and <br />
                    bookmark movies
                    </h1>
                    <p className="lead">
                    Stop writing down movies on your memo/notes application. 
                    Search through thousands of Movies,Tv Shows and bookmark them
                    with this application.
                    </p>
                    <Link to="/dashboard" >
                    <button className="primary_button">
                    Get Started
                    </button>
                        
                    </Link>
                </section>
                <section>
                    <img src="assets/hero.png" alt="Hero"/>
                </section>
            </div>
        </div>
    )
}