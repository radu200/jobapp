import React, { Component } from 'react';
import axios from 'axios';
import CandidateSearchPage from '../../components/Search/Pages/CandidateSearchPage'



 class CandidatesPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            candidates:[],
            offset:2,
            category:'',
            location:'Chisinau',
            experienceMax:1,
            url:'',
            loginError:'',
            formErrors:{
              categoryError:'',
              locationError:'',
             
              
            }

        }

     
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleExperienceValue =  this.handleExperienceValue.bind(this)
        }
    

        componentDidMount () {
          const searchVal = {location:'Chisinau',category:'Frumusete si Bunastare' ,experienceMax:10}
         
          const {location, category ,experienceMax} = searchVal;
         
          const getCandidates =  async () => {
            const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
            const offset = 2;
            try {
            
              const response = await axios.post(url,{
                offset:0
              })
              
               const data = response.data
               
               if(data.code === 99){
                this.setState({loginError:[...data.msg]})   
              } else {
                this.setState({candidates:[...data],url, offset})
              }
            } catch (error) {
              console.error(error);
            }
          }
          getCandidates();
          
        }
    
    //   //form validation
        validate = () => {
          const {location, category } = this.state;
          
          let categoryError = "";
          let locationError = "";
      
        
          if(!category){
           categoryError = "Te rog alege categoria"
          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          }

       

         

          if(categoryError || locationError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError,
                categoryError,
              
              }
            }))
            return false;
          }
            return true;
      }
        
      
        handleExperienceValue (event,value) {
          this.setState({experienceMax:event.target.value})
        }    

        handleInputChange(event){
         const target = event.target;
         const value = target.value
         const name = target.name;
         this.setState({
           [name]:value
         })
       
        }


           handleSubmit(event) {
             
             event.preventDefault();

             const isValid = this.validate();
             const { location, category, experienceMax, errorMsg} = this.state;
             
  
                  if(isValid){
                       const getCandidates=  async () => {
                         const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
                         const offset = 2;
                         try {
   
                           const response = await axios.post(url,{
                             offset:0
                           })
                           const data = response.data
                
                               
                          if(data.code === 99){
                            this.setState({loginError:[...data.msg]})  
                          } else {
                            this.setState({candidates:[...data],url, offset})
                          }
       
                         } catch (error) {
                           console.error(error);
                         }
                       }
                       getCandidates();
                       
                       this.setState(prevState => ({
                         formErrors:{
                           ...prevState.formErrors,
                           locationError:'',
                           categoryError:'',
                         
                         }
                       }))
   
                     }

               
          }


                    
        getMoreCandidates =  async () => {
          const { url } = this.state
            try {
              const response = await axios.post(url,{
                  offset: this.state.offset 
              });
            
              this.setState({candidates:[...this.state.candidates, ...response.data], offset:this.state.offset + 2})
            } catch (error) {
              console.error(error);
            }
          }  

          render() {
            return (
              <div>
                <CandidateSearchPage
                  onSubmit={this.handleSubmit}
                  handleInputChange = {this.handleInputChange}
                  errors={this.state.formErrors}
                  categoryVal={this.state.category}
                  locationVal={this.state.location}
                  candidates={this.state.candidates}
                  onClick = {this.getMoreCandidates}
                  experienceVal = {this.state.experienceMax}
                  handleExperienceValue = {this.handleExperienceValue}
                  loginError={this.state.loginError}
                />
              </div>
           )
        }
  }

export default CandidatesPage;
