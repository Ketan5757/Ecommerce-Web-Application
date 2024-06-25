import React  from 'react'
import './CSS/ShopCategory.css'

export const ShopCategory = (props) => {
  return (
    <div className='Shop-category'>
      
      <div className="shopcategory-indexSort">
      <p>
      <span>Showing 1-7</span> out of 7 all_products
      </p>
      <div className="shopcategory-sort">
        Sort by 
      </div>
      </div>
      <div className="shopcategory-products">
      {/* {all_product.map((item,i)=>{ 
        if(props.category===item.category) {
          return <Item key ={i} id={item.id} brand={item.brand} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
        else{
          return null;
        }
      })} */}
         </div>
        <div className="shopcategory-loadmore">
          Explore More
      </div>
    </div>
  )
}

export default ShopCategory