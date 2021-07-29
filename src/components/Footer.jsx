import React from 'react'
import Link from 'next/link'

const Header = ({ pathname }) => (
  <footer>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>{' '}
  </footer>
)

export default Header
