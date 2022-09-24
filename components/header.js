import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link";

import MenuLink from "./menu-link";

import { store } from "../store";

import Tag from "./tags/tag"

import LinkTag from "./tags/link-tag"

import { motion } from 'framer-motion'


const Menu = styled.div`
  margin: 25px 10px 0 10px;
  position: fixed;
  z-index: 999 !important;
  top: 0;
  left: 0;

  @media(max-width: 989px) {
    margin: 15px 10px 0 10px;
  }
`


const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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


const NavHidden = styled(motion.div)`
  display: flex;
`

const NavEl = styled(motion.div)``





export default function Header({ data }) {
  let [open, setOpen] = useState(false);

  let router = useRouter()

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;


  
  return data ? (
    <Menu onMouseLeave={() => setOpen(false)} data-scroll data-scroll-sticky data-scroll-target="body">
    <Container>
          {/* <MenuLink href="/">
            <svg width="100" height="100" viewBox="0 0 35 35" fill="none">
            <path d="M18.4542 18.4183L21.0743 20.3172L18.5057 18.2108L24.2617 20.8257L18.743 18.024L21.8273 18.9164L19.2897 17.9618L35 17.4948L19.2897 17.0382L21.8273 16.0836L18.743 16.976L24.2617 14.1743L18.5057 16.7892L21.0743 14.6828L18.4542 16.5817L26.1701 7.689L18.0519 16.5609L19.8777 13.2923L17.8146 16.426L20.0015 9.74355L18.0312 15.2016L18.4129 12.6282L17.763 15.2224L17.5052 0.155648V0L17.4948 0.0726356V0V0.155648L17.237 15.2224L16.5871 12.6282L16.9688 15.2016L14.9985 9.74355L17.1854 16.426L15.1223 13.2923L16.9481 16.5609L8.82994 7.689L16.5458 16.5817L13.9154 14.6828L16.4943 16.7892L10.728 14.1743L16.257 16.976L13.1727 16.0836L15.7103 17.0382L0 17.4948L15.7103 17.9618L13.1727 18.9164L16.257 18.024L10.728 20.8257L16.4943 18.2108L13.9154 20.3172L16.5458 18.4183L8.82994 27.311L16.9481 18.4391L15.1223 21.7077L17.1854 18.574L14.9985 25.2564L16.9688 19.788L16.5871 22.3718L17.237 19.788L17.4948 34.8444V35V34.9274L17.5052 35V34.8444L17.763 19.788L18.4129 22.3718L18.0312 19.788L20.0015 25.2564L17.8146 18.574L19.8777 21.7077L18.0519 18.4391L26.1701 27.311L18.4542 18.4183Z" fill="black"/>
            </svg>
          </MenuLink> */}
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
                <LinkTag data={"/"}>
                  <MenuLink href="/">Home</MenuLink>
                </LinkTag>
              </NavEl>
              {
                data.menu_items.map(item => 
                <NavEl
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
    </Menu>
  )
  :
  null
}
