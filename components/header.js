import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link";

import MenuLink from "./menu-link";

import LocaleLink from "./locale-link";

import { store } from "../store";

import RichText from './rich-text';


const Menu = styled.div`
  .mobile-menu--open {
    display: block !important;
  }

  position: fixed;
  z-index: 999 !important;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;


  font-size: 1.38vw;
  line-height: 0.95;

  a, span {
    font-size: 1.38vw;
    line-height: 0.95;
    color: black;
  }

  @media(max-width: 989px) {
    a, span {
      font-size: 20px;
      line-height: 1;
      color: black;
    }
  }
`


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  a:hover {
    background-color: rgb(255, 148, 67);
  }
`;



const ColLeft = styled.div`
  display: flex;
  flex-basis: 50%;
  // padding: 0 30px 0 10px;
  padding: 0 2.08vw 0 0.69vw;
  border-bottom: 1px solid black;
  align-items: center;

  @media(max-width: 989px) {
    padding: 5px 10px;
  }
`;

const ColLeftInnerLeft = styled.div`
  flex-grow: 1;

  a {
    background-color: transparent !important;
  }

  @media(max-width: 989px) {
    a {
      font-size: 14px;
    }
  }
`;

const ColLeftInnerRight = styled.div`
  flex-basis: 43%;
  display: flex;
  justify-content: flex-end;

  > div:nth-child(1) {
    flex-basis: 44%;
  }

  > div:nth-child(2) {
    flex-basis: auto;
  }

  p {
    margin: 0;
  }

  @media(max-width: 989px) {
    display: none;
  }
`;

const ColRight = styled.div`
  display: flex;
  flex-basis: 50%;

  @media(max-width: 989px) {
    justify-content: flex-end;
    padding: 0 10px;
    border-bottom: 1px solid black;
  }
`;

const ColRightInnerLeft = styled.div`
  flex-basis: 94%;

  @media(max-width: 989px) {
    display: none;
  }
`;

const ColRightInnerRight = styled.div`
  flex-basis: 6%;
  display: flex;
  flex-direction: column;

  > div {
    flex-basis: 50%;
  }

  > div:nth-child(1) > a {
    display: flex;
    align-items: flex-end;
  }

  > div:nth-child(1) > a {
    display: flex;
    align-items: flex-end;
    padding: 0.48vw 0.69vw 0.24vw 0.69vw;
  }
}

@media(max-width: 989px) {
  display: none;
}


`;

const DesktopMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  > div:nth-last-child(n+4) > a {
    display: flex;
    align-items: flex-end;
    padding: 0.48vw 0.69vw 0.24vw 0.69vw;
  }

  // @media(max-width: 989px) {
  //   display: none;
  // }
`


const MobileBurger = styled.div`
  display: none;

  @media(max-width: 989px) {
    display: flex;
    align-items: center;
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

  > div {
    width: 100%;
  }

  display: none;
`

const ContainerMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid black;


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

    padding: 5px 10px;

    svg {
      height: 40px;
    }
  }
`;

const MobileMenuInner = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  width: fit-content;s

  @media(max-width: 989px) {
    width: 100%;
  }
`

const LinkStyle = styled.div`
  display: flex;
  flex-basis: 33.3333%;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  // height: 35px;
  height: 2.43vw;

  > a {
    display: block;
    // padding: 7px 10px;
    padding: 0.48vw 0.69vw;
    height: 100%;
    width: 100%;
    line-height: 0.8;
    cursor: pointer;
  }

  @media(max-width: 989px) {
    border-left: 0;
    height: auto;
    
    > a {
      display: block;
      // padding: 7px 10px;
      padding: 20px 10px;
      height: 100%;
      width: 100%;
      line-height: 0.8;
    }
  }
`

const MobileColLeft = styled.div`
  a {
    font-size: 14px;
  }
`

const MobileColRight = styled.div``

const MobileLocaleSwitch = styled.div`
  display: flex;

  > div {
    flex-basis: 50%;
  }

  > div:nth-child(2) {
    border-left: 1px solid black;
  }
`
const MobileBurgerClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 30px;

  > div {
    position: absolute;
    height: 1px;
    width: 30px;
    background-color: black;
  }

  > div:nth-child(1) {
    transform: rotateZ(45deg);
    transform-origin: center center;
  }

  > div:nth-child(2) {
    transform: rotateZ(-45deg);
    transform-origin: center center;
  }
`

const MobileBurgerOpen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 35px;

  > div {
    height: 1px;
    width: 30px;
    background-color: black;
    margin: 5px 0;
  } 
`



export default function Header({ data }) {

  let router = useRouter()

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  useEffect(() => {
    let menuClose = document.querySelector("#menu-close");
    let menuOpen = document.querySelector("#menu-open");

    if(menuClose === null || menuOpen === null) return;

    const closeMenu = () => {
      setTimeout(() => {
        document.querySelector(".mobile-menu").classList.remove("mobile-menu--open")
      }, 100)
    }

    const openMenu = () => {
      document.querySelector(".mobile-menu").classList.add("mobile-menu--open")
    }

    menuClose.addEventListener("click", () => closeMenu())
    menuOpen.addEventListener("click", () => openMenu())

    document.querySelectorAll("a").forEach(item => {item.addEventListener("click", () => closeMenu())})


  });


  
  return data ? (
    <Menu>
    <MobileMenu className="mobile-menu">
    <ContainerMobile>
      <MobileColLeft>
        <MenuLink href="">
          Art au Centre <br/> Genève <br/>
          25.11.21-06.03.22
        </MenuLink>
      </MobileColLeft>

      <MobileColRight>
        <MobileBurger id="menu-close">
          <MobileBurgerClose>
            <div></div>  
            <div></div>
          </MobileBurgerClose>          
        </MobileBurger>
      </MobileColRight>
    </ContainerMobile>

      <MobileMenuInner>
        {data.mobile_menu_items !== null ? 
          <>
          {
            data.mobile_menu_items.map((item, index) => 
              {
                return <LinkStyle key={item.index} className="button"><Link data={item.link}>{item.link_text}</Link></LinkStyle>
              })
          }
          <MobileLocaleSwitch>
            <LinkStyle><LocaleLink href="/fr-fr"><span>Fr</span></LocaleLink></LinkStyle>
            <LinkStyle><LocaleLink href="/en-gb"><span>En</span></LocaleLink></LinkStyle>
          </MobileLocaleSwitch>
          </>
        : 
        null}
      </MobileMenuInner>
    </MobileMenu>

    <Container>
      <ColLeft>
        <ColLeftInnerLeft>
          <MenuLink href="">
            Art au Centre <br/> Genève <br/>
            25.11.21-28.02.22
          </MenuLink>
        </ColLeftInnerLeft>

          <ColLeftInnerRight>
            <div><RichText render={data.text_one} /></div>
            <div><RichText render={data.text_two} /></div>
          </ColLeftInnerRight>
      </ColLeft>

      <ColRight>
        <ColRightInnerLeft>
          <DesktopMenu>
            {data.menu_items !== null ? data.menu_items.map((item, index) => <LinkStyle key={item.index}><Link data={item.link}><span>{item.link_text}</span></Link></LinkStyle>) : null}
          </DesktopMenu>
        </ColRightInnerLeft>

        <ColRightInnerRight>
          <LinkStyle><LocaleLink href="/fr-fr"><span>Fr</span></LocaleLink></LinkStyle>
          <LinkStyle><LocaleLink href="/en-gb"><span>En</span></LocaleLink></LinkStyle>
        </ColRightInnerRight>
        
         <MobileBurger id="menu-open">
           <MobileBurgerOpen>
             <div></div>
             <div></div>
             <div></div>
           </MobileBurgerOpen>
         </MobileBurger>
      </ColRight>
    </Container>
    </Menu>
  )
  :
  null
}
