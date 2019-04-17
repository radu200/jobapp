import React from 'react'

const JobSearchRes =  (props) => {

    if(props.jobs.length > 0){
      return props.jobs.map((job) => {
           return(
               <div key={job.id}>
               <li>{job.id}</li>
               <li>{job.position}</li>
               <li>{job.category}</li>
           </div>
           )
      } )
  } else {
       return <h1>Nu am gasit nici un job</h1>
  }
   
}

export default JobSearchRes;