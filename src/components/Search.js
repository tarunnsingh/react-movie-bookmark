import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import MyContext from '../config/context'

export default props =>{

    const {searchString,searchChangeHandler} = useContext(MyContext)
    return(
        <section className="search">
      
            <div>
            <Link to='/search'>
                <input className="search_bar" 
                type="text" 
                value={searchString} 
                placeholder="search here" 
                name="searchString"
                onChange={searchChangeHandler}
                />
                 </Link>
            </div>
       
        </section>
    )
}