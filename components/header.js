import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link";

import MenuLink from "./menu-link";

import { store } from "../store";

import Tag from "./tags/tag"

import LinkTag from "./tags/link-tag"

import { motion } from 'framer-motion'

import ShowReelPopup from '../components/home/showreel-popup'


const Menu = styled.div`
  position: fixed;
  margin: 15px 10px 0 10px;
  z-index: 9999 !important;
  top: 0;
  left: 0;
  transition: top 1s;
  width: calc(100% - 20px);
  pointer-events: none;

  &#menu-open {
    pointer-events: all !important;
  }

  #img {
    position: fixed;
    right: 0;
    margin: 10px;
  }


  &.display-menu {
    top: 0px !important;
  }

  @media(max-width: 989px) {
    margin: 15px 10px 0 10px;
  }
`


const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > a > svg {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

const Nav = styled.div`
  display: flex;

  > div:first-child svg {
    position: relative;
    margin-left: 3px;
    top: 0.3px;
    transition: transform 0.3s;
  }


  > div:first-child {
    margin-right: 4px;
    pointer-events: all;
  }

  > div:first-child > div {
    margin-right: 0 !important;
    cursor: pointer;
  }

  .menu-open > div,
  .menu-open svg
   {
    background: black;
    color: white;
    fill: white;
  }

  media(min-width: 990px) {
    > div:first-child > div:hover
    {
        background: black;
        color: white;
        cursor: pointer;
    }

    > div:first-child:hover svg {
      fill: white;
    }
  }

  .open {
    transform: rotateZ(-180deg);
    transition: transform 0.3s;
  }

`

const Logo = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  cursor: pointer;
  pointer-events: all;

  svg {
    width: 100%;
  }

  img {
    width: 100%;
    user-drag: none;
  }

  @media(max-width: 989px) {
    width: 50px;
    top: -5px;
  }
`



const NavHidden = styled(motion.div)`
  display: flex;
`

const NavEl = styled(motion.div)`

`





export default function Header({ data }) {
  let [open, setOpen] = useState(false);

  let router = useRouter()

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;


  const toggleShowreel = () => {
    dispatch({type: "showreel open", value: true})
  }
  
  return data ? (
    <>
    <ShowReelPopup data={data.showreel} />
    <Menu onMouseLeave={() => setOpen(false)} data-scroll data-scroll-sticky data-scroll-target="body" id={open ? "menu-open" : ""} className="menu">
    <Container>
          <Nav>
            <div onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)} className={open ? "menu-open" : ""}>
              <Tag>
                <span>
                  Menu
                </span>
                <svg width="7px" height="7px" version="1.1" viewBox="0 0 700 500" className={open ? "open" : ""}>
                  <g>
                    <path d="m380.39 484.79 307.04-305.99c16.766-17.812 16.766-45.059 0-61.828-16.766-16.766-45.059-16.766-61.828 0l-275.6 275.6-275.6-275.6c-17.812-16.766-45.059-16.766-61.828 0-16.766 16.766-16.766 44.012 0 61.828l305.99 305.99c17.812 16.766 45.059 16.766 61.828 0z" fill-rule="evenodd"/>
                  </g>
                </svg>
              </Tag>
            </div>
            <NavHidden 
              animate={open ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                },
              }}
              >
              <NavEl
              variants= {{
                visible: { 
                  opacity: 1,
                  y: 0,
                  pointerEvents: 'all'
                },
                hidden: { 
                  opacity: 0,
                  y: 5,
                  transition: {
                    y: {
                      delay: 0.3
                    }
                  },
                  transitionEnd: {
                    pointerEvents: 'none'
                  }
                }
              }}
              >
                <LinkTag data={"/"}>
                  <MenuLink href=""><span onClick={() => setOpen(!open)}>Home</span></MenuLink>
                </LinkTag>
              </NavEl>
              {
                data.menu_items.map(item => 
                <NavEl
                onClick={() => setOpen(!open)}
                variants= {{
                  visible: { 
                    opacity: 1,
                    y: 0
                  },
                  hidden: { 
                    opacity: 0,
                    y: 5,
                    transition: {
                      y: {
                        delay: 0.3
                      }
                    }
                  }
                }}
                >
                  <LinkTag data={item.link}><Link data={item.link}>{item.link_text}</Link></LinkTag>
                </NavEl>)
              }
            </NavHidden>
          </Nav>
    </Container>
    <Logo onClick={() => toggleShowreel()}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.5 },
      }}
    >
      <img src="/images/etoile.png" />
    </Logo>
    </Menu>
    </>
  )
  :
  null
}
