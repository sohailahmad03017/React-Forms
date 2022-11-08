import React, { useState } from 'react'
import './SideNavBarStyling.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

export default function SideNavBar() {

  let [status, setStatus] = useState(false);
  
    return (
    <div className='sideNavBar'>
      
      {status? < CloseIcon className='controlIcon' onClick={() => setStatus(!status)} /> : <MenuIcon className='controlIcon' onClick={() => setStatus(!status)} /> }
      

      
      <NavLink to='account' className='linkItem link' >
           <AccountCircleIcon/>
           {status? 'Account' : ''}
      </NavLink>
      
      <NavLink to='analytics' className='linkItem link' >
           <BarChartIcon/>
           {status? 'Analytics' : null}
      </NavLink>

      <NavLink to='customer' className='linkItem link' >
           <PeopleAltIcon/>
           {status? 'Customer' : null}
      </NavLink>

      <NavLink to='finance' className='linkItem link' >
           <MonetizationOnIcon/>
           {status? 'Finance' : null}
      </NavLink>

      <NavLink to='orders' className='linkItem link' >
           <LocalGroceryStoreIcon/>
           {status? 'Orders' : null}
      </NavLink>

      <NavLink to='overview' className='linkItem link' >
           <RemoveRedEyeIcon/>
           {status? 'Overview' : ''}
      </NavLink>

      <NavLink to='product' className='linkItem link' >
           <LocalMallIcon/>
           {status? 'Product' : ''}
      </NavLink>
    
    </div>
    
  )
}
