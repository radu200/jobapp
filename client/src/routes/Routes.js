import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Jobs from '../containers/Search/JobsPage';
import Candidates from '../containers/Search/CandidatesPage';
import CandidateDetails from '../containers/Search/CandidateDetails';
import Applicants from '../containers/JobApplication/JobSeekerList';

const Routes = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/jobs' component={Jobs} />
        <Route exact path='/candidate-details/:id' component={CandidateDetails} />
        <Route exact path='/search-candidate' component={Candidates} />
        <Route exact path='/job-application/employer/:id' component={Applicants} />

      </Switch>
  </BrowserRouter>
  </main>
)

export default Routes;