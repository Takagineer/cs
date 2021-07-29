import React from 'react'
import Link from 'next/link'

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
  </header>
)

export default Header
