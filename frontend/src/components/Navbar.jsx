import React from 'react'

const Navbar = () => {
  return (
    <nav class="nav">
    <a href="/" class="nav_logo">Logo</a>

    <ul class="nav_items">
        <li class="nav_item">
            <a href="/" class="nav_link">Home</a>
            <a href="/" class="nav_link">Products</a>
            <a href="/" class="nav_link">Services</a>
            <a href="/" class="nav_link">Contact</a>
        </li>
    </ul>
  </nav>
  )
}

export default Navbar