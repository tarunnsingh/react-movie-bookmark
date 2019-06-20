import React,{useContext} from 'react'

import MyContext from '../config/context'

export default props =>{

    const {logmeout,user} = useContext(MyContext)
    return(
        <section className="profile">
            <img src={user.photoURL} className="avatar" align="middle"/>
            <div>
            <span className="name"> Hello, {user.displayName}</span>
            <button className="small_button" onClick={logmeout}> Log Out </button>
        
            </div>
           </section>
    )
}