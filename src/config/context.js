import React,{Component} from 'react'
import firebase from 'firebase'
import axios from 'axios'

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

import {omdbapi} from '../secret/index'

import {firebaseAuth,db} from './store'
import { thisExpression } from '@babel/types';

import SimpleReactValidator from 'simple-react-validator';

const MyContext = React.createContext()

export class Provider extends Component{

    constructor(){
        super()

        this.databaseRef = db.ref()
        this.authStateListner()
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.rvalidator =  new SimpleReactValidator()
    }

     /*************************** STATE ********************************* */
    state={
        searchString:'',
        searchResults:[],
        authed:false,
        email:'',
        password:'',
        rname:'',
        remail:'',
        rpassword:'',
        user:null,
        BookMarksId:[],
        Bookmarks:[],
        loading:false,
        contentloading:false
       
    }

    /*************************** AUTH STATE LISTNER ********************************* */
    authStateListner=()=>{
        firebaseAuth.onAuthStateChanged((user)=>{
            if(user){
                this.setState({user:user,authed:true})

                this.databaseRef.child('Bookmark').child(firebaseAuth.currentUser.uid).on('value',snap=>{
                   const BookMarks = snap.val(); 
                   //console.log(snap.val())
                   let myArr =[];
                   let bid=[];
                    for(const key in BookMarks)
                    {
                     myArr.push(Object.assign({},BookMarks[key],{key:key}));
                     bid.push(key);
                    }
                    this.setState({BookMarksId:bid,
                    Bookmarks:myArr});
                })
            }
            else{
                this.setState({user:null,authed:false})
            }
        })
    }

     /*************************** HELPER FUNCTIONS ********************************* */
    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    searchChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        this.setState({contentloading:true})
        axios.get(`http://www.omdbapi.com/?s=${this.state.searchString}&apikey=${omdbapi}`)
        .then(res => {
           
            const {data:{Search}} = res;
            //console.log(Search)
            if(Search)
            this.setState({searchResults:Search})
            this.setState({contentloading:false})
            
        })
        .catch(err =>{
            //console.log(err)
            Alert.error("There was some problem with API", {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
            this.setState({contentloading:false})
        })
        
    }

     /*************************** FIREBASE HELPER FUNCTIONS ********************************* */
    SignInWithEmail=(e)=>{
        e.preventDefault()
        if (this.rvalidator.allValid()){
            this.setState({loading:true})
            firebaseAuth.createUserWithEmailAndPassword(this.state.remail,this.state.rpassword)
        .then( res=>{
            this.setState({loading:false})
            firebaseAuth.currentUser.updateProfile({
                displayName:this.state.rname,

                //This can be changed 
                //Instead user can be asked to provide profile picture
                photoURL:'https://semantic-ui.com/images/avatar/large/daniel.jpg'
            })
            Alert.success("Created New Account Successfully", {
                position: 'bottom-right',
                effect: 'jelly',
                timeout: 3000
            });
        })
        .catch( err =>{
            Alert.error(err.message, {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
            //console.log(err)
            this.setState({loading:false})
        })
        }
        else{
            this.rvalidator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
        this.forceUpdate();
        }
        
    }

    logInWithEmail=(e)=>{
        e.preventDefault()
        this.setState({loading:true})
        firebaseAuth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then( res =>{
            Alert.success("Logged In Successfully", {
                position: 'bottom-right',
                effect: 'jelly',
                timeout: 3000
            });
            this.setState({loading:false})
            //console.log(res)
        })
        .catch(err=>{
            Alert.error(err.message, {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
            //console.log(err)
            this.setState({loading:false})
        })
    }
    logInWithGmail=(e)=>{
        e.preventDefault()
        firebase.auth().signInWithPopup(this.provider).then(function(result) {
            
            //dispatch({type:'ADD_USER',payload:result.user})
            //console.log(result)
            Alert.success("Logged In Successfully", {
                position: 'bottom-right',
                effect: 'jelly',
                timeout: 3000
            });
           
          }).catch(function(error) {
            Alert.error(error.message, {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
            //console.log(error)
          });
    }

    resetPassword=()=>{
        firebaseAuth.sendPasswordResetEmail(this.state.email).then(function() {
            Alert.success("Link to reset password is sent to registered email", {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
          }).catch(function(error) {
            Alert.error(error.message, {
                position: 'top',
                effect: 'jelly',
                timeout: 3000
            });
          });
    }
    logmeout=()=>{
        firebase.auth().signOut();
    }
    render(){

        return(

            <MyContext.Provider value={
                {changeHandler:this.changeHandler,
                searchChangeHandler:this.searchChangeHandler,
                logInWithGmail:this.logInWithGmail,
                logInWithEmail:this.logInWithEmail,
                SignInWithEmail:this.SignInWithEmail,
                logmeout:this.logmeout,
                rvalidator:this.rvalidator,
                resetPassword:this.resetPassword,
                ...this.state}}>
                {this.props.children}
              
            </MyContext.Provider>
        )
    }
}

export default MyContext