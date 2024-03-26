import React, { useContext } from 'react'
import { TokenContext } from '../../context/components/Token';
import { cartsContext } from '../../context/components/Carts';
function Cart() {
  const {auth} = useContext(TokenContext);
  const {productId}=useContext(cartsContext)
  console.log(productId);
  return (
    <div>
      {
        // token ?
        //   <div>
        //     <h1>cart</h1>
        //   </div>

        //   :
        //   <div>
        //     <h1>cart</h1>
        //   </div>
      }
    </div>
  )
}

export default Cart
