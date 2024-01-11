import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl

} from '../common.js'
import renderJobList from './JobList.js'


const clickHandler = e => {
    if(!e.target.className.includes('bookmark')) return ;

    //if id is already bookmarked then remove else push it into array
    if (state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    //persist data width Local Storage
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));

    // //update bookmark icon
 document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

}

const MouseEnterHandler = () => {
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    //make joblist visible
    jobListBookmarksEl.classList.add('job-list--visible');

    //render bookmarked job list

    renderJobList('bookmarks');
}


const MouseLeave = () => {
    jobListBookmarksEl.classList.remove('bookmarks-btn--active');

    //make joblist visible
    jobListBookmarksEl.classList.remove('job-list--visible');
}

//Little own test if you try to add the function only if the bookmark icon exist and the run this code // in the JobList file (after we render the jobDetails the code works the same (cause we have now // the bookmark icon in the html))
// const BookmarkIconF = () => {
// if(BookmarkIcon) {
//     BookmarkIcon.addEventListener('click', clickHandler);
//     }
// }
// export default BookmarkIconF;


bookmarksBtnEl.addEventListener('mouseenter', MouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', MouseLeave);
jobDetailsEl.addEventListener('click', clickHandler);

