import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './SearchKeywords.scss';

import SearchIcon from '../../assets/icons/search.svg';
import CloseIcon from '../../assets/icons/close.svg';

import { setBooks, setAdvancedRequest } from "../../actions/actions";
import { connect } from 'react-redux';

import { SearchParams } from "../../constants/interfaces";
import { SEARCH_PAGE } from "../../constants/routes";

interface Props {
  className: string;
  setBooks: any;
  setAdvancedRequest: any;
  hasButton: boolean;
}

const SearchKeywords = ({className, setBooks, setAdvancedRequest, hasButton}: Props, searchInput: any, props) => {
  const [searchValue, setValue] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [tags, setTags] = React.useState([]);


  let history = useHistory();

  const handleSearchChange = (e: any) => {
    if (!hasButton) {
	  setValue(e.target.value)
	} else {
	  e.target.value.trim().length >= 0 && setValue(e.target.value);
	}
  }

  const handleSearchComponentClick = (e: any) => {
	if (searchInput.contains(e.target)) {
	  setFocus(true)
	} else {
	  setFocus(false)
	}
  }

  const handleSearchSubmit = (e) => {
	e.preventDefault();

	let params: SearchParams = {};
	params.keywords = tags.length > 0 ? tags : searchValue.split(' ');
	params.startIndex = 0;

	setBooks(params);
	setAdvancedRequest(params);

	setValue('');
	setFocus(false);

	history.push(SEARCH_PAGE);
	setTimeout(setAnchor, 1000);
  }

  const setAnchor = () => {
    return window.location.hash = '#book-request';
  }

  const addTags = (event) => {
	if ((event.key === " ") && event.target.value.trim().length > 2) {
	  // @ts-ignore
	  setTags([...tags, event.currentTarget.value]);
	  event.target.value = "";
	}
  };

  const removeTags = index => {
	setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  return <div className={`search ${className}`}>
	<div className={`search-component ${(isFocus || hasButton) && 'active'}`} onClick={handleSearchComponentClick}>
	  <form className="search-input-wrapper" onSubmit={handleSearchSubmit}>
		{!hasButton && <input ref={(input) => searchInput = input} minLength={1} required value={searchValue}
				onChange={handleSearchChange}
				className='search-input' placeholder='Enter keywords'
				type="text"/>}
		{hasButton && <div className="tags-input">
		  <ul className='tags-list'>
			{tags.map((tag, index) => (
			  <li key={index} className="tag button is-medium secondary">
				<span>{tag}</span>
				<i className="tag-close-icon" onClick={() => removeTags(index)}>
				  <svg width="7" height="7" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
					  d="M11.8323 10.0001L19.6199 2.21215C20.1267 1.70557 20.1267 0.88651 19.6199 0.379933C19.1133 -0.126644 18.2943 -0.126644 17.7877 0.379933L9.99988 8.16793L2.21228 0.379933C1.70548 -0.126644 0.886669 -0.126644 0.380103 0.379933C-0.126701 0.88651 -0.126701 1.70557 0.380103 2.21215L8.1677 10.0001L0.380103 17.7881C-0.126701 18.2947 -0.126701 19.1138 0.380103 19.6204C0.632555 19.8731 0.964493 20 1.29619 20C1.62789 20 1.95959 19.8731 2.21228 19.6204L9.99988 11.8324L17.7877 19.6204C18.0404 19.8731 18.3721 20 18.7038 20C19.0355 20 19.3672 19.8731 19.6199 19.6204C20.1267 19.1138 20.1267 18.2947 19.6199 17.7881L11.8323 10.0001Z"
					  fill="#fff"/>
				  </svg>
				</i>
			  </li>
			))}
		  </ul>
		  <input
			type="text"
			onKeyUp={event => addTags(event)}
			placeholder="Enter keywords"
			ref={(input) => searchInput = input}
			onChange={handleSearchChange}
		  />
		</div>}
		{hasButton && <button className='button btn-submit secondary is-large'>submit</button>}
	  </form>
	  <div className="search-icon">
		<img src={SearchIcon} alt="search-icon"/>
	  </div>
	  {!hasButton && <div className="close-icon">
		<img src={CloseIcon} alt="close-icon"/>
	  </div>}
	</div>
  </div>
}

const mapDispatchToProps = {
  setBooks,
  setAdvancedRequest
}

export default connect(null, mapDispatchToProps)(SearchKeywords);