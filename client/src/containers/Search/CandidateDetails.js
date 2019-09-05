import React, { Component } from 'react';
import axios from 'axios';
import CandidateDetailsPage from '../../components/Search/Pages/CandidateDetails'

export default class CandidateDetails extends Component {

    constructor(props){
        super(props)

         this.state = {
             candidate:[],
             experience:[],
             isAuthenticated:''
         }
    }

    componentDidMount () {
        
         const id = this.props.match.params.id;
           const getCandidateDetails =  async () => {
           try {
               const res = await axios.get(`/api/candidate-details/${id}`)
                
               const data = res.data
  
              if(data.auth){
                this.setState({isAuthenticated:data.auth,candidate:data.details, experience:data.experience})   
              } else {
                this.setState({isAuthenticated:''})
              }
           } catch (err){
               console.log(err)
           }
        }
        
          getCandidateDetails();

      }

        render(){
      
            return (
                <div>
                    <CandidateDetailsPage 
                      isAuthenticated = {this.state.isAuthenticated}
                      candidateDetails={this.state.candidate} 
                      experience={this.state.experience}
                      />
                </div>
            )
        }
}