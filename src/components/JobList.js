import { 
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state,
    RESULTS_FOR_PAGE,
    jobListBookmarksEl,
} from '../common.js';
import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';
import renderError from './Error.js';
//import BookmarkIconF from './Bookmarks.js';

//create the blueprint of the function that we export and use into the search component
const renderJobList = (whichJobList = 'search') => {

    //determine correct selector for joblist (search or bookmark)
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;

    //remove previus item
    jobListEl.innerHTML = '';

    // determine the jon item that should be rendered
    let jobItemsArray;
    if(whichJobList === 'search'){
        jobItemsArray = state.searchJobItems.slice(state.currentPage * RESULTS_FOR_PAGE - RESULTS_FOR_PAGE , state.currentPage * RESULTS_FOR_PAGE)
    } else if (whichJobList === 'bookmarks'){
        jobItemsArray = state.bookmarkJobItems;
    }

    //display jobs
    jobItemsArray.forEach(jobItem => {
        const newJobItemHTML = 
        `<li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkedJobItem => bookmarkedJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
        </li>`
    
        jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    })    
}

const clickHandler = async e => {
    e.preventDefault();

    // get clicked job item
   const jobItemEl = e.target.closest('.job-item');

   //remove the active class form previusly active item
   //previous version
//    const activeJobItemEl =  document.querySelector('.job-item--active');
//    if(activeJobItemEl){
//     activeJobItemEl.classList.remove('job-item--active');
//    }

//more compact way with &&
// document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('job-item--active');

//actual way with ? operator for remove active class even if non existent
//document.querySelector('.job-item--active')?.classList.remove('job-item--active');

//with this one we don't need "?" or if cause querySelectorAll not give an error if the element not exist
document.querySelectorAll('.job-item--active').forEach(jobItemActive => {
    jobItemActive.classList.remove('job-item--active');
});

    // empty the inner html for job detail content
    jobDetailsContentEl.innerHTML = '';

    //render spinner importing function
    renderSpinner('jobDetails');

    //get the id of the clicked job item
     const id = jobItemEl.children[0].getAttribute('href');

     //update the state
     const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
     state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

     //render job list updated after click in bookmarks
     renderJobList();



     //add id to the url
     history.pushState(null, '', `/#${id}`);
     
     try {
       const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
         const { jobItem } = data;

        //remove the spinner
        renderSpinner('jobDetails');
    
        //render job details item
        renderJobDetails(jobItem);

        //test with export function
        //BookmarkIconF();
        
     } catch (error) {
        renderSpinner('jobDetails');
        renderError(error.message);
     }


    //  //fetch job item data
    //  fetch(`${BASE_API_URL}/jobs/${id}`).then(res => {
    //     if(!res.ok){
    //         throw new Error("Resource issue (e.g. resourse doesn't exist) or server issue");
    //     }
    //     return res.json();
    //  }).then(data => {
    //     console.log(data);
    //     const { jobItem } = data;
    //     //remove the spinner
    //     renderSpinner('jobDetails');


    // //render job details item
    // renderJobDetails(jobItem);
    

    //  }).catch(error => { //network problem or other problem
    //     renderSpinner('spinner');
    //     renderError(error.message);
    // });

}



jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);

export default renderJobList;