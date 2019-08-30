
const webSiteUrl = 'http://localhost:8000';
const  LoginUrl = `${webSiteUrl}/api/login`;
const LogOut = `${webSiteUrl}/api/logout`
const JobDetailsUrl = `${webSiteUrl}/api/job/details/`;
const SignUpUrlJobSeeker =`${webSiteUrl}/api/signup/jobseeker`;
const SignUpUrlEmployer =`${webSiteUrl}/api/signup/employer`;
const Profile = `${webSiteUrl}/api/profile`;
const searchCandidate = `${webSiteUrl}/api/search-candidate`;
const MyJobs  = `${webSiteUrl}/api/my-jobs`;
const Help = `${webSiteUrl}/api/help`;
const Settings = `${webSiteUrl}/api/settings`
const Chats = `${webSiteUrl}/chats`
module.exports = {
    LoginUrl,
    JobDetailsUrl,
    SignUpUrlJobSeeker,
    SignUpUrlEmployer,
    LogOut,
    Profile,
    searchCandidate,
    MyJobs,
    Help,
    Settings,
    Chats
};