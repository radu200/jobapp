const db = require('../../../config/database.js');

module.exports.getCandidate = (req,res,next) => {
   res.render('profile/employer/candidate_search')
}

module.exports.getCandidateDetails = (req,res,next) => {
    res.render('profile/employer/candidate_details')
 }
 

 module.exports.getEmployerJobDetail = (req,res,next) => {
    res.render('profile/employer/employer_job_detail')
 }