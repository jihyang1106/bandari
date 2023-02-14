// import { useEffect, useState } from "react"
// import { useParams } from "react-router"
// import styled from 'styled-components';
// import {Nav} from 'react-bootstrap';
// import './../App.css';
// import { useDispatch } from "react-redux";
// import { addItem } from './../store.js';
// const Detail = function(props) {

// let {id} = useParams();
// let findProd = props.shoes.find(function(el){
//  return el.id == id;
// });
// let [alert, setAlert] = useState(true);
// let [checkAlert, setChekAlert] = useState(false);
// let [inputValue, setInputValue] = useState('');
// let
//  = useState(0);
// let [fade2, setFade2] = useState('');
// let dispatch = useDispatch();
// useEffect(() => {
// /* alertDisplay(); */
// const a = setTimeout(()=> {setAlert(false);}, 2000);
//  return () => {
// clearTimeout(a)
// }
// }, []);
// useEffect(()=> {
// if(isNaN(inputValue) == true) {
// setChekAlert(true);
// } else {
// setChekAlert(false);
// }
// }, [inputValue]);
// useEffect(()=> {
// setTimeout(() => {
// setFade2('end');
// }, 100);
//  return(
// setFade2('')
// )
// }, []);
//  return(
// <div className={`container start ${fade2}`}>
// {
// alert == true ?
// <div className="alert alert-warning">2초 이내 구매시 할인!</div>
// : null
// }
// <div className="row">
// <div className="col-md-6">

// </div>
// <div className="col-md-6">
// {
// checkAlert == true ?
// <div className="alert alert-danger">숫자만 입력하세요</div>
// : null
// }
// <input type="text" onChange={(e)=> {
// setInputValue(e.target.value);
//  }}/>
// <h4 className="pt-5">{findProd.title}</h4>
// <p>{findProd.content}</p>
// <p>{findProd.price}</p>
// <button className="btn btn-danger" onClick={()=>{
// dispatch(addItem( {id: findProd.id, name: findProd.title, count: 1} ))
//  }
// }>주문하기</button>
// </div>
// </div>
// <div className="row">
// <div className="col-md-12">
// <Nav variant="tabs" defaultActiveKey="link0">
// <Nav.Item>
// <Nav.Link onClick={ ()=>{setTab(0)} } eventKey="link0">버튼0</Nav.Link>
// </Nav.Item>
// <Nav.Item>
// <Nav.Link onClick={ ()=>{setTab(1)} } eventKey="link1">버튼1</Nav.Link>
// </Nav.Item>
// <Nav.Item>
// <Nav.Link onClick={ ()=>{setTab(2)} } eventKey="link2">버튼2</Nav.Link>
// </Nav.Item>
// </Nav>
// <TabContent tab={tab} />
// </div>
// </div>
// </div>

// )
// }
// function TabContent({tab, shoes}){/* props 대신 {}괄호 안에 useState 변수 넣어줘도 됨 */
// /* if(tab == 0) {
//  return (<div>탭 01</div>);
//  }
//  if(tab == 1) {
//  return (<div>탭 02</div>);
//  }
//  if(tab == 2) {
//  return (<div>탭 03</div>);
//  } */
// let [fade, setFade] = useState('');
// useEffect(()=>{
// setTimeout(()=> {
// setFade('end');
//  }, 100)
// return () => {
// setFade('');
//  }
//  },
// );
// return(
// <div className={`start ${fade}`}>
// {[<div>탭 01</div>, <div>탭 02</div>, <div>탭 03</div>]
// }
// </div>
//  )
// }
// export {Detail}

// ----------------------------------------

// 선생님 localStorage 최근 본 상품 기능 숙제를 하기 위해
// 메인(home)에서 상품리스트 클릭 시, 해당되는 디테일 페이지로 이동하도록 하고싶은데
// 라우터? 링크? 를 어떻게 적용시켜야 할 지 모르겠습니다.
// 주소창에 직접 http://localhost:3000/detail/0 이렇게 쳐서 이동하면 정상적으로 id값에 해당되는 상품페이지로 이동되긴 하나,
// 선생님처럼 메인페이지에서 상품이미지 클릭시 디테일 페이지로 이동하는 방법을 어떻게 적용해야할지 모르겠습니다 ㅠㅠ..
// 저렇게 컴포넌트를 map 함수로 이용하여 뿌려줄 땐 페이지 이동링크를 어떻게 달아줘야 하나요?
