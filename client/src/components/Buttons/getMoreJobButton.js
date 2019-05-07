import React from 'react';
import PropTypes from 'prop-types';


const GetMoreJobsButton  = ({onclick}) => {
    return(
        <button onClick={onclick}>GetMore</button>
    )
}

GetMoreJobsButton.propTypes = {
    onclick:PropTypes.func.isRequired
}
export default GetMoreJobsButton;


