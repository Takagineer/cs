import React from 'react'
import Link from 'next/link'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ pathname }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>{' '}

    <Link href="/individual-pages/Company">
      <a>企業用様ページへ</a>
    </Link>{' '}

    <Link href="/individual-pages/Student">
      <a>学生用様ページへ</a>
    </Link>{' '}

    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" >
          C×S
        </Typography>
        <Button color="inherit" textAlign="right">ログイン</Button>
      </Toolbar>
    </AppBar>
  </header>
)

export default Header
