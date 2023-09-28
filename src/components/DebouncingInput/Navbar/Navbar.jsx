import './Navbar.css'
import { useState } from 'react'
const Navbar = () => {

  const[activeId,setActiveId]= useState(0)
  const navData=[
    'Open','Close','Boost'
  ]
  


  return (
    <>
<div className='navbar_container'>
<ul className="sub_container">
  
      {navData.map((item,idx)=>{
      return <li 
              key={idx} 
              className={`nav_links ${activeId === idx ? 'active_link' :''}`}
              onClick={()=>setActiveId(idx)}
              >
              {item}
              </li>
    })}
</ul>
 
<label className='nav_value-dispay'></label>

</div>
    </>
  )
}

export default Navbar