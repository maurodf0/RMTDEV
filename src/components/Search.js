import { 
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';
import renderSpinner from './Spinner.js';

const submitHandler = event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain number');
        return ;
    }

    //blur input
    searchInputEl.blur();

     //remove previous job items
     jobListSearchEl.innerHTML = '';

    //render spinner

    renderSpinner('search');

    // fetch search result from API

    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then(res => {
        if(!res.ok){
            // what you in throw is what you find in the parameters
            throw new Error("Resource issue (e.g. resourse doesn't exist) or server issue");
        }
        return res.json();
    }).then(data => {
        console.log(data);
        //extract job Items - you can rename the new item with double point
        const {jobItems} = data;    
        console.log(jobItems);

        //remove spinner function from spinner component
        renderSpinner('search');

            //render the job items number
            numberEl.textContent = jobItems.length;

            //render the job items inside the list from external component
        renderJobList(jobItems);   

    }).catch(error => { //network problem or other problem
        renderSpinner('search');
        renderError(error.message);
    });
}

searchFormEl.addEventListener('submit', submitHandler);