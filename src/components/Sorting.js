import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl

} from '../common.js'

const clickHandler = e => {
    //get clicked btn
    const clickedBtnEl = e.target.closest('.sorting__button');

    if(!clickedBtnEl) return;

   const recent = clickedBtnEl.className.includes('--recent') ? true : false ;
   
   if(recent){
    
   } else {
    
   }
}

sortingEl.addEventListener('click', clickHandler);