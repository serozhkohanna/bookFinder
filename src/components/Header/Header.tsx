import React from 'react';
import './Header.scss';
import { HOME_PAGE, SEARCH_PAGE } from "../../constants/routes";
import SearchKeywords from "../SearchKeywords/SearchKeywords";
//@ts-ignore
import { NavLink } from 'react-router-dom';

import Favourites from "../FavouritesButton/FavouritesButton";

const Header = ({pageHeader}: any) => {
  const handlePageScroll = () => {
	// console.log(window.pageYOffset)
	//TODO
	//add on scroll event and change header styling.
  }
  window.addEventListener('scroll', handlePageScroll);

  // @ts-ignore
  return <header ref={(header) => pageHeader = header}>
	<h1>BookFinder</h1>
	<ul className='navigation'>
	  <li className='navigation-item'>
		<NavLink activeClassName='navigation-item-active' to={HOME_PAGE}>Home</NavLink>
	  </li>
	  <li className='navigation-item'>
		<NavLink activeClassName='navigation-item-active' to={SEARCH_PAGE}>My bookshelf</NavLink>
	  </li>
	  <li className='navigation-item'>
		<Favourites/>
	  </li>
	</ul>
	<SearchKeywords className={'header-search'} />
  </header>
}

export default Header;