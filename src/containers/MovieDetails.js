import React,{Component} from 'react'

import {Link} from 'react-router-dom'

import MyContext from '../config/context'

import firebase from 'firebase'
import {db} from '../config/store'

import {omdbapi} from '../secret/index'

import axios from 'axios'
import { Facebook } from 'react-content-loader';
class movieDetails extends Component {


    constructor(){
        super()

       
        this.database=db.ref();
    }

    state={
        movie:{},
        loading:true
    }

    componentDidMount(){
        axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=${omdbapi}`)
        .then(res=>{
            this.setState({loading:false})
            const {data} =res;
            this.setState({movie:data})
        })
        .catch( err =>{
            console.log(err)
            this.setState({loading:false})
        })
    }
    render(){
           const {Poster,imdbID,Title,Actors,Awards,BoxOffice,Country,Director,Genre,Language,Metascore,Plot,Released,Runtime,Website,Year,imdbRating} =this.state.movie
    return(
        <MyContext.Consumer>
            {
                value=>{
                    const {BookMarksId} = value;

                    const onBookmark=()=>{
                         
                        this.database.child('Bookmark').child(firebase.auth().currentUser.uid).child(imdbID).set({
                            Title,
                            Poster,
                            imdbID
                            
                        })
                     }

                     const onRemoveBookmark=()=>{
                        this.database.child('Bookmark').child(firebase.auth().currentUser.uid).child(imdbID).remove();
                     }

                     let bookmarkbtn=null;
                     if (BookMarksId.indexOf(imdbID)!==-1)
                         {
                            bookmarkbtn=<button className="primary_button" onClick={onRemoveBookmark}>
                            <i class="far fa-bookmark fa-lg"></i>Bookmarked
                            </button>
                             
                         }
                         else{
                            bookmarkbtn=  <button className="primary_button" onClick={onBookmark}>
                            <i class="far fa-bookmark fa-lg"></i>Bookmark
                            </button>
                         }
                    return(
                        <div className="movieDetails">
                        <Link className="link" onClick={this.props.history.goBack}>
                             <i className="fas fa-arrow-left fa-lg"> </i>      
                           
                         </Link>
                     {
                         this.state.loading?<Facebook />:
                         <div className="wrapper">
                     <aside>
                         <img className="poster" src={Poster} alt={Title} />
                     </aside>
                     <main>
                         <h2 className="heading">{Title}</h2>
                         <hr />
                         <span className="link">{Runtime} | {Country} | {Year}</span>
                         <ul>
                             <li>
                                 <i className="fas fa-volume-up fa-md"></i> <span className="link">{Language}</span></li>
                             <li>
                               {bookmarkbtn}
                 
                             </li>
                             <li className="lead">
                                 {Plot}
                             </li>
                             <li>
                                 <table>
                                     <tr>
                                         <th>Director</th>
                                         <td className="secondary_text">{Director}</td>
                                     </tr>
                                     <tr>
                                         <th>Actors</th>
                                         <td className="secondary_text">{Actors}</td>
                                     </tr>
                                     <tr>
                                         <th>Genres</th>
                                         <td className="secondary_text">{Genre}</td>
                                     </tr>
                                 </table>
                             </li>
                         </ul>
                     </main>
                     </div>
                     }
                    
                     </div>
             
               
                    )
                }
            }
        </MyContext.Consumer> 
      
    );

    }

 
}

export default movieDetails;