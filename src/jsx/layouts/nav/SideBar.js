import React, { Component, useContext, useEffect, useReducer, useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
//  import Collapse from 'react-bootstrap/Collapse';
import {Collapse, Dropdown} from 'react-bootstrap';

/// Link
import { Link } from "react-router-dom";

import {MenuList} from './Menu';
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';

import profile from "../../../images/profile/pic1.jpg";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active : "",
  activeSubmenu : "",
}


const SideBar = () => {
  var d  = new Date();
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
    ChangeIconSidebar,
  
	} = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);	
	//useEffect(() => {			
	//}, []);
 //For scroll
 
 
	  let handleheartBlast = document.querySelector('.heart');
	  function heartBlast(){
		return handleheartBlast.classList.toggle("heart-blast");
	  }
  
 	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)

 
	const handleMenuActive = status => {		
		setState({active : status});			
		if(state.active === status){				
			setState({active : ""});
		}   
	}
	const handleSubmenuActive = (status) => {		
		setState({activeSubmenu : status})
		if(state.activeSubmenu === status){
			setState({activeSubmenu : ""})			
		}    
	}
	// Menu dropdown list End

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  	
  return (
    <div 
      onMouseEnter={()=>ChangeIconSidebar(true)}
      onMouseLeave={()=>ChangeIconSidebar(false)}
      className={`deznav  border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">         
          <ul className="metismenu" id="menu">
              {MenuList.map((data, index)=>{
                let menuClass = data.classsChange;
                  if(menuClass === "menu-title"){
                    return(
                        <li className={menuClass}  key={index} >{data.title}</li>
                    )
                  }else{
                    return(				
                      <li className={` ${ state.active === data.title ? 'mm-active' : ''}`}
                        key={index} 
                      >
                        
                        {data.content && data.content.length > 0 ?
                            <Link to={"#"} 
                              className="has-arrow"
                              onClick={() => {handleMenuActive(data.title)}}
                            >								
								                {data.iconStyle}
                                {" "}<span className="nav-text">{data.title}
                                  {data.update && data.update.length > 0 ?
                                    <span className="badge badge-xs badge-danger ms-2">{data.update}</span>
                                    :
                                    ''
                                  }
                                </span>
                            </Link>
                        :
                          <Link  to={data.to} >
                              {data.iconStyle}
                              {" "}<span className="nav-text">{data.title}
                                  {data.update && data.update.length > 0 ?
                                    <span className="badge badge-xs badge-danger ms-2">{data.update}</span>
                                    :
                                    ''
                                  }
                              </span>
                          </Link>
                        }
                        <Collapse in={state.active === data.title ? true :false}>
                          <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                            {data.content && data.content.map((data,index) => {									
                              return(	
                                  <li key={index}
                                    className={`${ state.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                  >
                                    {data.content && data.content.length > 0 ?
                                        <>
                                          <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                            onClick={() => { handleSubmenuActive(data.title)}}
                                          >
                                            {data.title}
                                          </Link>
                                          <Collapse in={state.activeSubmenu === data.title ? true :false}>
                                              <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                {data.content && data.content.map((data,index) => {
                                                  return(	
                                                    <>
                                                      <li key={index}>
                                                        <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                                      </li>
                                                    </>
                                                  )
                                                })}
                                              </ul>
                                          </Collapse>
                                        </>
                                      :
                                      <Link to={data.to}>
                                        {data.title}
                                      </Link>
                                    }
                                    
                                  </li>
                                
                              )
                            })}
                          </ul>
                        </Collapse>
                      </li>	
                    )
                }
              })}          
          </ul>		
          <div className="plus-box">
            <p className="fs-15 font-w500 mb-1">Get summary report now</p>
            <Link to={"#"} className="text-white fs-26"><i className="las la-long-arrow-alt-right"></i></Link>
          </div>
          <div className="copyright">
            <p className="fs-13 font-w200"><strong className="font-w400">Karciz Ticketing Admin Dashboard</strong> © {d.getFullYear()} All Rights Reserved</p>
            <p>Made with <i className="fa fa-heart text-danger"></i> by DexignZone</p>
          </div> 
        </PerfectScrollbar>
      </div>
    );
};

export default SideBar;