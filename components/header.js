import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link";

import MenuLink from "./menu-link";

import { store } from "../store";

import RichText from './rich-text';


const Menu = styled.div`
  .mobile-menu--open {
    display: block !important;
  }

  padding: 20px 20px;

  position: fixed;
  z-index: 999 !important;
  width: 100%;
  top: 0;
  left: 0;
  // background-color: white;


  a, span {
    color: black;
  }

  @media(max-width: 989px) {
    a, span {
      color: black;
    }
  }
`


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  // a:hover {
  //   background-color: rgb(255, 148, 67);
  // }
`;



const ColLeft = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 989px) {
  }
`;

const ColLeftInnerLeft = styled.div`
  flex-grow: 1;

  a {
    background-color: transparent !important;
    display: block;
  }

  @media(max-width: 989px) {
    a {
    }
  }
`;

const ColLeftInnerRight = styled.div`
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

const ColRight = styled.div``;

const ColRightInnerLeft = styled.div`
  @media(max-width: 989px) {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  > div {
    margin-left: 30px;
  }
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
  text-transform: uppercase;

  > a {
    display: block;
    cursor: pointer;
  }

  @media(max-width: 989px) {
    height: auto;
    
    > a {
      display: block;
    }
  }
`

const MobileColLeft = styled.div`
  a {
  }
`

const MobileColRight = styled.div``

const MobileLocaleSwitch = styled.div`
  display: flex;

  > div {
    flex-basis: 50%;
  }

  > div:nth-child(2) {
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
          <svg width="50" height="50" viewBox="0 0 35 35" fill="none">
          <path d="M18.4542 18.4183L21.0743 20.3172L18.5057 18.2108L24.2617 20.8257L18.743 18.024L21.8273 18.9164L19.2897 17.9618L35 17.4948L19.2897 17.0382L21.8273 16.0836L18.743 16.976L24.2617 14.1743L18.5057 16.7892L21.0743 14.6828L18.4542 16.5817L26.1701 7.689L18.0519 16.5609L19.8777 13.2923L17.8146 16.426L20.0015 9.74355L18.0312 15.2016L18.4129 12.6282L17.763 15.2224L17.5052 0.155648V0L17.4948 0.0726356V0V0.155648L17.237 15.2224L16.5871 12.6282L16.9688 15.2016L14.9985 9.74355L17.1854 16.426L15.1223 13.2923L16.9481 16.5609L8.82994 7.689L16.5458 16.5817L13.9154 14.6828L16.4943 16.7892L10.728 14.1743L16.257 16.976L13.1727 16.0836L15.7103 17.0382L0 17.4948L15.7103 17.9618L13.1727 18.9164L16.257 18.024L10.728 20.8257L16.4943 18.2108L13.9154 20.3172L16.5458 18.4183L8.82994 27.311L16.9481 18.4391L15.1223 21.7077L17.1854 18.574L14.9985 25.2564L16.9688 19.788L16.5871 22.3718L17.237 19.788L17.4948 34.8444V35V34.9274L17.5052 35V34.8444L17.763 19.788L18.4129 22.3718L18.0312 19.788L20.0015 25.2564L17.8146 18.574L19.8777 21.7077L18.0519 18.4391L26.1701 27.311L18.4542 18.4183Z" fill="black"/>
          </svg>
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
        {/* {data.mobile_menu_items !== null ? 
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
        null} */}
      </MobileMenuInner>
    </MobileMenu>

    <Container>
      <ColLeft>
        <ColLeftInnerLeft>
          <MenuLink href="">
            <svg width="50" height="50" viewBox="0 0 35 35" fill="none">
            <path d="M18.4542 18.4183L21.0743 20.3172L18.5057 18.2108L24.2617 20.8257L18.743 18.024L21.8273 18.9164L19.2897 17.9618L35 17.4948L19.2897 17.0382L21.8273 16.0836L18.743 16.976L24.2617 14.1743L18.5057 16.7892L21.0743 14.6828L18.4542 16.5817L26.1701 7.689L18.0519 16.5609L19.8777 13.2923L17.8146 16.426L20.0015 9.74355L18.0312 15.2016L18.4129 12.6282L17.763 15.2224L17.5052 0.155648V0L17.4948 0.0726356V0V0.155648L17.237 15.2224L16.5871 12.6282L16.9688 15.2016L14.9985 9.74355L17.1854 16.426L15.1223 13.2923L16.9481 16.5609L8.82994 7.689L16.5458 16.5817L13.9154 14.6828L16.4943 16.7892L10.728 14.1743L16.257 16.976L13.1727 16.0836L15.7103 17.0382L0 17.4948L15.7103 17.9618L13.1727 18.9164L16.257 18.024L10.728 20.8257L16.4943 18.2108L13.9154 20.3172L16.5458 18.4183L8.82994 27.311L16.9481 18.4391L15.1223 21.7077L17.1854 18.574L14.9985 25.2564L16.9688 19.788L16.5871 22.3718L17.237 19.788L17.4948 34.8444V35V34.9274L17.5052 35V34.8444L17.763 19.788L18.4129 22.3718L18.0312 19.788L20.0015 25.2564L17.8146 18.574L19.8777 21.7077L18.0519 18.4391L26.1701 27.311L18.4542 18.4183Z" fill="black"/>
            </svg>
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
