import {
    sortingEl,
    state,
    sortingBtnRecentEl,
    sortingBtnRelevantEl

} from '../common.js'
import renderJobList from './JobList.js';

const clickHandler = e => {
    //get clicked btn
    const clickedBtnEl = e.target.closest('.sorting__button');

    if(!clickedBtnEl) return;

   const recent = clickedBtnEl.className.includes('--recent') ? true : false ;

   //active click to recent
   if(recent){
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
   } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
   }
   
   if(recent){
        state.searchJobItems.sort((a,b) => {
                return a.daysAgo - b.daysAgo;
        })
   } else {
    state.searchJobItems.sort((a,b) => {
        return b.relevanceScore - a.relevanceScore;
    })
   }

   //render the new job list sorted
   renderJobList();

};

sortingEl.addEventListener('click', clickHandler);