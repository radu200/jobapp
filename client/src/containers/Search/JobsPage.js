import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NoJobFoundMsg } from '../../components/Utils/messages';
import JobCard from '../../components/Cards/JobCard';
import GetMoreButton from '../../components/Buttons/getMoreButton'
import axios from 'axios';
import MainNav from '../../components/NavBars/MainNav/MainNav'
import SelectInput from '../../components/Inputs/Select'
import SearchButton from '../../components/Buttons/Search';
import TextInput from '../../components/Inputs/TextInput';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
 
});


const cities = [
  'Chisinau', 
  'Anenii Noi',
  'Balti',
  'Basarabeasca',
  'Briceni' ,
  'Călărași',
  'Cantemir',
  'Căușeni',
  'Ceadîr-Lunga',
  'Cimișlia',
  'Comrat',
  'Cricova',
  'Criuleni',
  'Dondușeni',
  'Drochia',
  'Dubăsari',
  'Edineț',
  'Fălești',
  'Florești',
  'Glodeni',
  'Hîncești',
  'Ialoveni',
  'Leova',
  'Leuseni',
  'Nisporeni',
  'Ocnița',
  'Orhei',
  'Rezina',
  'Rîbnița',
  'Rîșcani',
  'Sîngerei',
  'Șoldănești',
  'Soroca',
  'Ștefan Vodă',
  'Taraclia',
  'Telenești',
  'Tighina',
  'Tiraspol',
  'Ungheni',
  'Vadul lui Vodă',
  'Vulcănești'
];

 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:0,
            query:'',
            location:'',
            url:'',
            isAuthenticated:'',
            formErrors:{
              searchError:'',
              locationError:''
            }

        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    


    //form validation
        validate = () => {
          const {location, query} = this.state;
          
          let searchError = "";
          let locationError = "";
        
          if(!query){
            searchError = "Nu poate fi gol"
          } else if( query.length > 70){
            searchError = " Te rog nu cauta mai mult de 70 de caractere"

          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          } else if(location.length > 70) {
            locationError = "Locatia are mai mult de 70 caractere"
      
          }

          if(searchError || locationError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError:locationError,
                searchError:searchError
              }
            }))
            return false;
          }
            return true;
      }
        
    async componentDidMount(){
     
        const url = '/api/jobs'
        const {offset} = this.state;
        try {
            const response = await axios.post(url,{
             offset:offset
            });
            
             const data = response.data;

             if(data.auth === 'employer'){
               this.setState({jobs:[],isAuthenticated:data.auth,})
              } else {
                this.setState({jobs:data.jobs,isAuthenticated:data.auth,url, offset:offset + 12})
            }
            
          } catch (error) {
            console.error(error);
          }
            
    }
          
            
           getMoreJobs =  async () => {
              const { url,offset} = this.state
            try {
              const response = await axios.post(url,{
                  offset:offset 
              });
            
              const data = response.data;

              this.setState({jobs:[...this.state.jobs, ...data.jobs], offset:offset + 12})

            } catch (error) {
              console.error(error);
            }
          }
    
      
         handleInputChange (event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState({
              [name]: value
            })
          }

      //submit form  
       async handleSubmit(event) {
            
        event.preventDefault();

        const isValid = this.validate();

        if(isValid){
              const url = `/api/search/job?search_query=${this.state.query}&location=${this.state.location}`
              const offset = 12;
              try {
                const response = await axios.post(url,{
                  offset:0
                })
                  const data = response.data
                  
                  this.setState({jobs:[...data.jobs],url, offset})

              } catch (error) {
                console.error(error);
              }
          
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError:'',
                searchError:''
              }
            }))

        }
    }
              
  render() {  
    const {classes} = this.props;
    const {query, formErrors,jobs,location,isAuthenticated} = this.state;
    const {handleSubmit,handleInputChange,getMoreJobs} = this;
    return (
      <div>
        <MainNav isAuthenticated={isAuthenticated}/> 
    
              <div className={classes.root} >
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={12}>   
                        <form onSubmit={handleSubmit}>
                          <SelectInput 
                            onChange={handleInputChange} 
                            value={location} 
                            error={formErrors.locationError} 
                            elements={cities} 
                            title="Locatie" 
                            name="location" />
    
                            <TextInput
                                type="search"
                                title="Cauta"
                                onChange={handleInputChange} 
                                value={query} 
                                name="query"
                                error={formErrors.searchError}
                                /> 
                              <SearchButton/>
                          </form>
                       </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        {jobs.length > 0 ? <JobCard job={jobs} /> : <h1>{NoJobFoundMsg}</h1> }
                    </Grid>

                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={12} md={12} >
                        {jobs.length >= 12 ? <GetMoreButton  onClick={getMoreJobs}/> : null}
                      </Grid>
                   </Grid>
              </div>     
          </div>
          )
      }
    }


  
JobsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsPage);