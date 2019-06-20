import React,{useContext} from 'react'

import MyContext from '../config/context'

import Profile from '../components/Profile'
import Search from '../components/Search'
import MovieList from '../components/MovieList'

export default props =>{
    const {Bookmarks} = useContext(MyContext)
    return(
        <div className="Dashboard">
            
            <header>
            <div className="wrapper">
                <Profile />
                <Search />
            </div>
            </header>
            <main>
                 <div className="wrapper">
            
                <section>
                <MovieList
                myList={Bookmarks}
                />
                </section>
                </div>
            </main>
            </div>
  
    )
}