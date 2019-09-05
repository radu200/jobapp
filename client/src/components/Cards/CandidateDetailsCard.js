import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const styles = {
  

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },

  heading:{
    opacity:0.7
  },
  candidateAbout:{
    wordWrap: 'break-word',
  },
  companyName:{
   color:'black',
   fontWeight:'bold'
  },
  responsibilities:{
    wordWrap: 'break-word',
  },
  card:{
    marginTop:10,
  
  },

  avatarContainer:{
    width:'100%',
    display:'flex'

  },
  avatar: {
    marginTop:0,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:0,
    width: 200,
    height: 157,
    borderRadius:10
  
    
  },
  lang:{
    fontWeight:'bold'
  },
  availability:{
    color:'#43a047'
  }
};


  
const CandidateDetailsCard = ({candidateDetails,experience,classes}) => {
  
  return(
        <Card className={classes.card}>
          {candidateDetails.map((candidate,index) => {
               return( 
                  <CardActionArea key={index} >
                    <div className={classes.avatarContainer}>
                     <img alt="Remy Sharp" src={candidate.avatar} className={classes.avatar} />
                    </div>
                  <CardContent>
                  <Typography    gutterBottom component="p" className={classes.availability} >
                      {candidate.job_seeker_availability}
                    </Typography>
                    <Typography component="p">
                       {candidate.job_seeker_employment_type}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    {candidate.first_name} {candidate.last_name}
                    </Typography>

                    { candidate.job_seeker_about_me ? 
                    <Typography component="p" className={classes.candidateAbout} >
                      <b>Despre</b>  {candidate.job_seeker_about_me} 
                    </Typography>
                      : null } 
                      { candidate.job_seeker_languages ?
                      <Typography    gutterBottom component="p" className={classes.lang}>
                        <b> Limbi :</b>
                         {candidate.job_seeker_languages} 
                        </Typography> :null}
                   
                    <Typography component="p">
                          {candidate.job_seeker_location}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                )} )}
                {experience.map((experience,index) =>{
                 return (
                  <CardActionArea key={index}>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                    {experience.position}
                    </Typography>
                    <Typography component="p">
                      {experience.category}
                    </Typography>
                       <Typography component="p" className={classes.companyName}>
                      {experience.company_name}
                    </Typography>
                   <Typography    gutterBottom component="p" color="primary">
                      {experience.start_date}- {experience.end_date} - {experience.years} ani {experience.months} luni {experience.days} zile
                    </Typography>
                    <Typography    gutterBottom component="p"  className={classes.responsibilities} >
                      {experience.responsibilities}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                )})}
                   
            </Card>
        
           )

}

CandidateDetailsCard.propTypes = {
     classes: PropTypes.object.isRequired,
   };

export default withStyles(styles)(CandidateDetailsCard);