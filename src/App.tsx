import React from 'react';
import './App.scss';
import { HOME_PAGE, SEARCH_PAGE, DETAILS_PAGE } from "./constants/routes";
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import MainPage from "./pages/MainPage/MainPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Page404 from "./pages/404Page/404Page";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ModalSaved from "./components/ModalSaved/ModalSaved";

function App({isSidebarOpen}) {
  console.log(isSidebarOpen);
  return (
	<div className={`page ${isSidebarOpen && 'scroll-disabled'}`}>
	  <Header/>
	  <ModalSaved/>
	  <div className="page-content">
		<Switch>
		  <Route exact path={HOME_PAGE} component={MainPage}/>
		  <Route exact path={SEARCH_PAGE} component={SearchPage}/>
		  <Route exact path={DETAILS_PAGE} component={DetailsPage} />
		  <Route component={Page404}/>
		</Switch>
	  </div>
	  <Footer/>
	</div>
  );
}

const mapStateToProps = ({application}) => {
  return {
	isSidebarOpen: application.isSidebarOpen
  }
}

export default connect(mapStateToProps)(App);
