import React,{useContext} from 'react'

import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import MyContext from '../config/context'
import {Link} from 'react-router-dom'

export default props =>{

    const context = useContext(MyContext)
    const {changeHandler,email,password,logInWithGmail,logInWithEmail,loading,resetPassword} = context;
    return(
        <div className='Login'>
        <Link to='/'>
        <i className="fas fa-arrow-left fa-lg"></i>       
        </Link>
         
            <header>
           
                <h1 className="heading"> Log In </h1>
                <p className="secondary_text">
                Log in using the email address and password you registered with in order to access your bookmarks.
                </p>
            </header>
            <form>
                <div className="input_group">
                    <label for="email"> Email </label>
                    <input type="email" placeholder="xyz@gmail.com" id="email" value={email} name="email" onChange={changeHandler}/>
                </div>
                
                <div className="input_group">
                    <label for="password"> password </label>
                    <input type="password" placeholder="123" id="password" value={password} name="password" onChange={changeHandler}/>
                </div>
                <div className="centered">
                {
                    loading?<div><Bounce /></div>:<input type="submit" className="primary_button" 
                    onClick={logInWithEmail}
                    value="Log In" />
                }
                <span className="link" onClick={resetPassword}> Forgot password ?</span>
                <hr />
                <button className="secondary_button" onClick={logInWithGmail}>Log In Using Gmail</button>
                <p className="link"> Don't Have An Account, <span className="link">
                <Link to="/register" className="highlighted_text"> Register Here </Link>
                </span></p>
                </div>
               
            
            </form>
           
        </div>
    )
}