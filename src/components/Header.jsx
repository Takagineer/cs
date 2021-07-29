import React from 'react'
import Link from 'next/link'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components'

const Header = ({ pathname }) => (
  <header>

    <APpBar position="static">
      <Toolbar>
        <div>
          <Link href="/">
            <Typography variant="h6" >
              C×S
            </Typography>
          </Link>
        </div>

        <HEaderRight>
          <Link href="/individual-pages/Company">
            <BUtton color="inherit">企業用ページ</BUtton>
          </Link>{''}

          <Link href="/individual-pages/Student">
            <BUtton color="inherit">学生用ページ</BUtton>
          </Link>{''}
        </HEaderRight>
        {/* <Button color="inherit">ログイン</Button> */}
      </Toolbar>
    </APpBar>
  </header>
)

export default Header


const APpBar = styled(AppBar)`
border-radius:10px;
`

const HEaderRight = styled.div`
margin:0 0 0 auto ;
`


const BUtton = styled(Button)`
background:(0.00,0.00%,61.96%);
font-size:18px;
justify-content:right;
`