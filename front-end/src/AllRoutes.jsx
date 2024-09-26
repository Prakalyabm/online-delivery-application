import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import Vendor from './Pages/Vendor/Vendor'
import Profile from './Pages/Profile/Profile'
import History from './Pages/Profile/History'
import Cart from './Pages/Cart/Cart'
import ProductList from './Pages/Product/ProductList'
import ProductSub from './Pages/Product/ProductSub'
import ProductDetails from './Pages/Product/ProductDetails'
import UserDetail from './Pages/Order/UserDetail'
import UserOrders from './Pages/Order/UserOrders'
import Delivery from './Pages/Delivery/Delivery'
import Admin from './Pages/Admin/Admin'

const AllRoutes = ({slideIn, handleSlidein}) => {
  return (
    <Routes>
      <Route path='/' element={<Home slideIn={slideIn} handleSlidein={handleSlidein}/>}/>
      <Route path='/Auth' element={<Auth/>}/>
      <Route path='/Vendor' element={<Vendor/>}/>
      <Route path='/Profile' element={<Profile slideIn={slideIn} handleSlidein={handleSlidein}/>}/>
      <Route path='/History' element={<History slideIn={slideIn} handleSlidein={handleSlidein}/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/subcategory/:subcategory" element={<ProductSub />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/userDetail" element={<UserDetail/>} />
      <Route path="/userOrders" element={<UserOrders/>}/>
      <Route path="/deliver" element={<Delivery/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  )
}

export default AllRoutes