import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    paginationNumberBackEl,
    paginationNumberNextEl,
    RESULTS_FOR_PAGE
} from '../common.js';
import renderJobList from './JobList.js'

const renderPaginationButtons = () => {
    // display black btn if we are in page two or further
    if(state.currentPage >= 2){
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    //display next btn if there are more job on next page (if zero or less hide)
    if((state.searchJobItems.length - state.currentPage * RESULTS_FOR_PAGE) <= 0 ){
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    

    //update page number
    paginationNumberNextEl.textContent = state.currentPage +1;
    paginationNumberBackEl.textContent = state.currentPage -1;

    // unfocus

    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
}

const clickHandler = e => {
    //get clicked btn
    const clickedButtonEl = e.target.closest('.pagination__button');

    //stop function in null
    if(!clickedButtonEl) return;

    //check user intention if next or back
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false ;

    //update state

    nextPage ? state.currentPage++ : state.currentPage-- ;

    //add back btn
    renderPaginationButtons();

    // render the job items for that page

    renderJobList();

}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;