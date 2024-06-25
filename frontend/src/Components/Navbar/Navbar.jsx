import React, { useState , useContext } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/Cart.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { doSignOut } from '../../firebase/auth'
import { ShopContext } from '../../Context/ShopContext';


export const Navbar = () => {
    const { userLoggedIn, currentUser } = useAuth()
    const [menu, setMenu] = useState("Shop");

    const { getTotalCartItems } = useContext(ShopContext);
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link to='/catalogue'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link to='/catalogue/men'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link to='/catalogue/women'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link to='/catalogue/kid'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {userLoggedIn ?
                    (<> {currentUser.email}<button onClick={doSignOut}>Logout</button></>) :
                    (<Link to='/login'><button onClick={doSignOut}>Login</button></Link>)
                }

                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>

            </div >

        </div >
    )
}

export default Navbar