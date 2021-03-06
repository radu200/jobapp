module.exports = function (app) {

  const jobsController = require('../controllers/jobs/jobs');
  const signupEmployerController = require('../controllers/authentication/employer/signup');
  const signupJobSeekerController = require('../controllers/authentication/job_seeker/signup');
  const settingsController = require('../controllers/users/settings/settings');
  const profileController = require('../controllers/users/profile/common/profile');
  const employerProfileController = require('../controllers/users/profile/employer/profile')
  const JobSeekerProfileController = require('../controllers/users/profile/job_seeker/profile');
  const EmployerProfileController = require('../controllers/users/profile/employer/profile');
  const chatController = require('../controllers/chat/chat');
  const loginController = require('../controllers/authentication/common/login');
  const homeController = require('../controllers/home');
  const contactUs = require('../controllers/helpPages/contactUs')
  const accessController = require('../middleware/access_control_middleware');
  const filesController = require('../middleware/files_control_middleware');
  const searchController = require('../controllers/search/search');
  const adminController = require('../controllers/dashboard/admin')
  const paymentController  = require('../controllers/payment/payment')

  
  app.get('/api/home',accessController.ensureAuthenticated,homeController.getHomePage)
  app.get('/api/success', homeController.getSuccessPage)
  //authetication routes
  app.get('/api/signup/employer', signupEmployerController.getSignUpEmployer)
  app.post('/api/signup/employer', signupEmployerController.postSignUpEmployer)

  app.get('/api/signup/jobseeker', signupJobSeekerController.getSignUpJobSeeker)
  app.post('/api/signup/jobseeker', signupJobSeekerController.postSignUpJobSeeker)

  //login
  app.get('/api/login', loginController.getLogin)
  app.post('/api/login', loginController.postLogin)
  app.get('/api/logout', loginController.getLogout)


  //user settings 
  app.get('/api/settings', accessController.ensureAuthenticated, settingsController.getSettings);
  //change email
  app.get('/api/change/email', accessController.ensureAuthenticated, settingsController.getChangeEmail)
  app.post('/api/change/email', accessController.ensureAuthenticated, settingsController.postChangeEmail)
  //verify email after signup
  app.get('/api/email/verify/:token', settingsController.getCheckEmail);
  app.get('/api/resend/email/check', settingsController.getResendEmailCheck)
  app.post('/api/resend/email/check', settingsController.postResendEmailCheck)
  //forgot password
  app.get('/api/forgot/password', settingsController.getForgotPassword);
  app.post('/api/forgot/password', settingsController.postForgotPassword);
  app.get('/api/forgot/password/reset/:token', settingsController.getForgotPasswordReset)
  app.post('/api/forgot/password/reset/:token', settingsController.postForgotPasswordReset)
  //change pasword within profile
  app.get('/api/change/password', accessController.ensureAuthenticated, accessController.ensureEmailChecked, settingsController.getChangePassword)
  app.post('/api/change/password', accessController.ensureAuthenticated, settingsController.postChangePassword)

  //profile common
  app.get('/api/profile', accessController.ensureAuthenticated, accessController.ensureEmailChecked, profileController.getProfile)
  app.get('/api/profile/avatar', accessController.ensureAuthenticated, profileController.getProfileAvatarEdit)
  app.post('/api/profile/avatar', accessController.ensureAuthenticated, filesController.avatar, profileController.postProfileAvatarEdit)
  app.post('/api/profile/delete', accessController.ensureAuthenticated, profileController.deleteProfile)
  //employer profile
  app.get('/api/profile/edit/employer', accessController.ensureAuthenticated, accessController.ensureEmailChecked, accessController.employer, employerProfileController.getEmployerProfileInfoEdit)
  app.post('/api/profile/edit/employer', accessController.ensureAuthenticated, accessController.employer, employerProfileController.postEmployerProfileInfoEdit)
  app.get('/api/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.getCompanyInfoEdit)
  app.post('/api/company/info/edit', accessController.ensureAuthenticated, accessController.employer, employerProfileController.postCompanyInfoEdit)
  app.get('/api/company/:id', accessController.ensureAuthenticated, employerProfileController.getCompanyProfile)
  //employer jobs
  app.get('/api/my-jobs', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobs)
  app.get('/api/candidate_details', accessController.ensureAuthenticated, accessController.employer, EmployerProfileController.getCandidateDetails)
  app.get('/api/employer/job/detail', accessController.ensureAuthenticated, accessController.employer, EmployerProfileController.getEmployerJobDetail)

  //jobseeker
  app.get('/api/application', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getApplication)
  app.get('/api/profile-edit/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerProfileInfoEdit)
  app.post('/api/profile-edit/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerProfileInfoEdit)
  app.get('/api/jobseeker/experience', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerExperienceAdd)
  app.post('/api/jobseeker/add/experience', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerExperience)
  app.get('/api/jobseeker/experience/edit/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.getJobSeekerEditExperience)
  app.post('/api/jobseeker/experience/edit/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.postJobSeekerEditExperience)
  app.delete('/api/jobseeker/experience/delete/:id', accessController.ensureAuthenticated, accessController.jobSeeker, JobSeekerProfileController.deleteJobSeekerExperience)



  //jobs controller 
  app.get('/api/job-applicants',accessController.ensureAuthenticated, accessController.employer, jobsController.jobApplicants)
  app.post('/api/applicants/status', jobsController.jobApplicantsStatus)
  app.post('/api/job-application/jobseeker', accessController.ensureAuthenticated, accessController.jobSeeker, jobsController.JobApplicationJobSeeker)
  app.get('/api/job/applied', jobsController.checkAppliedJobs)
  app.post('/api/apply/job', accessController.ensureAuthenticated, accessController.jobSeeker, jobsController.postApplyJobs)
  app.get('/api/jobs/add', accessController.ensureAuthenticated, accessController.employer, accessController.membershipJob,jobsController.getAddJobs)
  app.post('/api/jobs/add', accessController.ensureAuthenticated, accessController.employer, filesController.uploadJobImage,  accessController.membershipJob,jobsController.postAddJobs)
  app.get('/api/job_image/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getJobImageEdit)
  app.post('/api/job_image/edit/:id', accessController.ensureAuthenticated, accessController.employer, filesController.editJobImage, jobsController.postJobImageEdit)
  app.get('/api/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.getEmployerJobEdit)
  app.post('/api/job/edit/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.postEmployerJobEdit)
  app.post('/api/job/delete/:id', accessController.ensureAuthenticated, accessController.employer, jobsController.deleteJob)

  //search
  app.post('/api/search/job',  searchController.searchJobs)
  app.get('/api/candidate-details',accessController.ensureAuthenticatedJ, accessController.employerJ, searchController.getCandidateDetails)
  app.get('/api/candidate-search', accessController.ensureAuthenticatedJ, accessController.employerJ, searchController.searchCandidates)
  ///contact us
  app.get('/api/contact-us', accessController.ensureAuthenticated, contactUs.getContactUs);

   //dashboard
  app.get('/api/admin/users', accessController.ensureAuthenticated,accessController.admin, adminController.getAllUsers )
  app.get('/api/admin/check',accessController.ensureAuthenticated, accessController.admin, adminController.getCheckUsers )
  app.post('/api/admin/check',accessController.ensureAuthenticated,accessController.admin, adminController.postCheckUsers )
  app.get('/api/admin/black-list',accessController.ensureAuthenticated,accessController.admin,  adminController.getAllBlackListedUsers)
  app.post('/api/admin/black-list', accessController.ensureAuthenticated,accessController.admin, adminController.postBlackListedUsers )
  app.post('/api/admin/unblock', accessController.ensureAuthenticated, accessController.admin, adminController.unblockBlackListedUsers)
  app.get('/api/admin/reported', accessController.ensureAuthenticated, accessController.admin, adminController.getAllReportedUsers)
  
  //reports
  app.get('/api/report/:id', accessController.ensureAuthenticated, settingsController.getReportUser)
  app.post('/api/report', accessController.ensureAuthenticated, settingsController.postReportUser)

  app.get('/api/auth/me', accessController.authRole)
  app.get('/api/membership',accessController.ensureAuthenticated, accessController.employer, accessController.membership)
  //payment
  app.post('/api/payment',accessController.ensureAuthenticatedJ, accessController.employerJ, paymentController.postPayment )
  

  //chat 
  app.get('/api/chat',accessController.ensureAuthenticatedJ, chatController.getRooms)
  app.get('/api/chat/room',accessController.ensureAuthenticatedJ, chatController.getRoomDetails)
  app.post('/api/chat/room', accessController.ensureAuthenticatedJ, accessController.checkMembership, chatController.createRoom)
  app.post('/api/chat/remove', accessController.ensureAuthenticated, chatController.removeRoom)
}

