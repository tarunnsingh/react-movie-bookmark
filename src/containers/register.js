import React,{useContext} from 'react'


import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import MyContext from '../config/context'

import {Link} from 'react-router-dom';
export default props =>{
    const context = useContext(MyContext)
    const {changeHandler,remail,rpassword,rname,logInWithGmail,SignInWithEmail,loading,rvalidator} = context;
    return(
        <div className='Login'>
                 <Link to='/login'>
                    <i className="fas fa-arrow-left fa-lg"></i>       
                </Link>
         
            <header>
                <h1 className="heading"> Sign Up</h1>
                <p class="secondary_text">
                Sign Up using the email address and password or your gmail account.
                </p>
            </header>
            <form>
            <div className="input_group">
                    <label for="name"> Name </label>
                    <input type="text" placeholder="John" id="name" name="rname" value={rname}  onChange={changeHandler}/>
                    {rvalidator.message('name', rname, 'required|max:12|min:3')}
                </div>
                <div className="input_group">
                    <label for="email"> Email </label>
                    <input type="email" placeholder="xyz@gmail.com" id="email" name="remail" value={remail}  onChange={changeHandler}/>
                    {rvalidator.message('email', remail, 'required|email')}
                </div>
                
                <div className="input_group">
                    <label for="password"> password </label>
                    <input type="password" placeholder="123" id="password" name="rpassword" value={rpassword}  onChange={changeHandler}/>
                    {rvalidator.message('password', rpassword, 'required|max:12|min:5')}
                </div>
                <div className="centered">
                {
                    loading?<div><Bounce /></div>:
                    <input className="primary_button" type="submit" value="Sign Up"  onClick={SignInWithEmail}/>

                }
                <hr />
                    <button className="secondary_button" onClick={logInWithGmail}>Sign Up Using Gmail</button>
                    <h4 className="link"> Already Have An Account, 
                    <Link to="/login" className="highlighted_text" > Log In Here </Link>
                    </h4>
                </div>
                
            </form>
            
        </div>
    )
}