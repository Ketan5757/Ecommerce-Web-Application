import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img src={`data:image/png;base64,${props.image}`}  alt="" /></Link>
        <div className="brand-name">
        {props.brand}
        </div>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
            €{props.new_price}
                
            </div>
            <div className="item-price-old">
            €{props.old_price}

            </div>
        </div>

    </div>
  )
}

export default Item