import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link";

import MenuLink from "./menu-link";

import { store } from "../store";

const Menu = styled.div`
  .mobile-menu--open {
    display: block !important;
  }
`


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media(max-width: 989px) {
  }
`;



const ColLeft = styled.div`
  display: flex;
  flex-basis: 50%;
  padding: 10px;
`;

const ColLeftInnerLeft = styled.div`
  flex-basis: 50%;
`;

const ColLeftInnerRight = styled.div`
  flex-basis: 50%;
  display: flex;

  > div {
    flex-basis: 50%;
  }
`;

const ColRight = styled.div`
  display: flex;
  flex-basis: 50%;
`;

const ColRightInnerLeft = styled.div`
  flex-basis: 90%;
`;

const ColRightInnerRight = styled.div`
  flex-basis: 10%;
`;

const DesktopMenu = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media(max-width: 989px) {
    display: none;
  }
`


const MobileBurger = styled.div`
  display: none;

  @media(max-width: 989px) {
    display: block;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  height: 100%;
  width: 100vw;
  background:white;
  top: 0;
  left: 0;
  z-index: 9999;

  display: none;
`

const ContainerMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 80px;

  border-bottom: 2px solid #C5C7CA;


  .cls-1 {
    fill:none;
  }
  
  .cls-2{
    fill:#1d1d1b;
  }

  svg {
    height: 60px;
  }

  @media(max-width: 989px) {

    padding: 25px;

    svg {
      height: 40px;
    }
  }
`;

const MobileMenuInner = styled.div`
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  width: fit-content;
`

const LinkStyle = styled.div`
  flex-basis: 33.3333%;
  padding: 10px 5px 5px 5px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;

  @media(max-width: 989px) {
  }
`





export default function Header({ data }) {

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  useEffect(() => {
    // let menuClose = document.querySelector("#menu-close");
    // let menuOpen = document.querySelector("#menu-open");

    // const closeMenu = () => {
    //   document.querySelector(".mobile-menu").classList.remove("mobile-menu--open")
    // }

    // const openMenu = () => {
    //   document.querySelector(".mobile-menu").classList.add("mobile-menu--open")
    // }

    // menuClose.addEventListener("click", () => closeMenu())
    // menuOpen.addEventListener("click", () => openMenu())

    // document.querySelectorAll("a").forEach(item => {item.addEventListener("click", () => closeMenu())})


  },[]);


  return (
    <Menu>
    <MobileMenu className="mobile-menu">
    <ContainerMobile>
      <ColLeft>
        <MenuLink href="/">
        </MenuLink>
      </ColLeft>

      <ColRight>
        <MobileBurger id="menu-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V24H24V0H0ZM20.0287 18.9638L18.9713 20.025L12 13.0537L5.02875 20.025L3.97125 18.9638L10.9388 12L3.97125 5.025L5.02875 3.96375L12 10.935L18.9713 3.96375L20.0287 5.025L13.0613 12L20.0287 18.9638Z" fill="black"/>
          </svg>
        </MobileBurger>
      </ColRight>
    </ContainerMobile>

      <MobileMenuInner>
        {data !== null ? 
        data.menu_items.map((item, index) => 
          {
            if(index === 0) {
              return (
                <>
                <LinkStyle key={index} className="button"><Link data={item.link}>{item.link_text}</Link></LinkStyle>
                {/* <SubMenu>
                   { data.menu_sub_items.map((item, index) => <SubLinkStyle className="button" colour={item.underline_colour}><Link data={item.link}>{item.link_text}</Link></SubLinkStyle>)}
                </SubMenu> */}
                </>
              )
            }
            return <LinkStyle key={index} className="button"><Link data={item.link}>{item.link_text}</Link></LinkStyle>
          }) 
        : 
        null}
      </MobileMenuInner>
    </MobileMenu>

    <Container>
      <ColLeft>
        <ColLeftInnerLeft>
          <MenuLink href="/">
            Art au Centre Genève <br/>
            25.11.21-28.02.22
          </MenuLink>
        </ColLeftInnerLeft>

          <ColLeftInnerRight>
            <div>{data != null && data.text_one}</div>
            <div>{data != null && data.text_two}</div>
          </ColLeftInnerRight>
      </ColLeft>

      <ColRight>
        <ColRightInnerLeft>
          <DesktopMenu>
            {data !== null ? data.menu_items.map((item, index) => <LinkStyle key={item.index}><Link data={item.link}>{item.link_text}</Link></LinkStyle>) : null}
          </DesktopMenu>
        </ColRightInnerLeft>

        <ColRightInnerRight>
          <LinkStyle><MenuLink href="/fr-fr">Fr</MenuLink></LinkStyle>
          <LinkStyle><MenuLink href="/en-gb">En</MenuLink></LinkStyle>
        </ColRightInnerRight>
        
         {/* <MobileBurger id="menu-open">
           <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M24 16H0V13.3333H24V16ZM24 9.33333H0V6.66667H24V9.33333ZM24 2.66667H0V0H24V2.66667Z" fill="black"/>
           </svg>
         </MobileBurger> */}
      </ColRight>
    </Container>
    </Menu>
  );
}
