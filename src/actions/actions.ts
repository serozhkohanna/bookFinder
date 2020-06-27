import { SET_BOOKS, SET_ADVANCED_REQUEST } from "../constants/action-types";
import { apiKey, apiURL } from "../constants/googleApi";

import axios from 'axios';

export const setBooks = (params) => {
  let {intitle, inauthor, subject, filter, download, maxResults, langRestrict, startIndex, orderBy, keywords} = params;

  let titleParam = intitle ? `intitle:${intitle}` : '';
  let authorParam = inauthor ? `+inauthor:${inauthor}` : '';
  let subjectParams = subject ? `+subject:${subject}` : '';
  let startIndexParam = startIndex ? startIndex : '1';
  let orderByParam = orderBy ? `&orderBy=${orderBy}` : '';
  let langRestrictParam = langRestrict ? `&langRestrict=${langRestrict}` : '';
  let maxResultParam = maxResults ? `&maxResults=${maxResults}` : '&maxResults=10';
  let keywordsParams = keywords ? keywords : '';

  let url = `${apiURL}volumes?q=${keywordsParams}${titleParam}${authorParam}${subjectParams}${maxResultParam}${orderByParam}${langRestrictParam}&startIndex=${startIndexParam}&key=${apiKey}`;

  return dispatch => {
	axios.get(url)
	  .then(response => {
		dispatch({
		  type: SET_BOOKS,
		  payload: response.data
		})
	  })
  }
}

export const setAdvancedRequest = payload => ({
  type: SET_ADVANCED_REQUEST,
  payload
})