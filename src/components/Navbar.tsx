import { Link} from 'react-router-dom'
import React from 'react'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to={'/'}>Home</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
