import {
    jobDetailsContentEl,
    BASE_API_URL,
    state,
    getData,
} from '../common.js'
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js';
import renderJobList from './JobList.js';
import renderSpinner from './Spinner.js';

const loadHashChangeHandler = async () => {
    //get the id from the url
    const id = location.hash.substring(1);

    if(id){
        //remove active class when back happen in broswer
        document.querySelectorAll('.job-item--active').forEach(jobItemActive => {
            jobItemActive.classList.remove('job-item--active');
        });
        
        // remove previous content
        jobDetailsContentEl.innerHTML = '';

        //add spinner
         renderSpinner('jobDetails');

        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
         
            const { jobItem } = data;

            //update state
            state.activeJobItem = jobItem;

            //render search job list
            renderJobList();

             //remove the spinner
             renderSpinner('jobDetails');
         
             //render job details item
             renderJobDetails(jobItem);
             
          } catch (error) {
             renderSpinner('spinner');
             renderError(error.message);
          }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);