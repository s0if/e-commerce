import React, { useContext } from 'react'
import { TokenContext } from '../../context/components/Token';
function Cart() {
  const token=useContext(TokenContext);
  return (
    <div>
      <h1>cart</h1>
    </div>
  )
}

export default Cart
