import React, { useState } from 'react'

const Mobile = () => {
    const regex=/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    const [mobile, setMobile] = useState()
  return (
    <div style={{padding:"50px",textAlign:"center"}}>
        <input type="number" value={mobile}  onChange={(e:any)=>setMobile(e.target.value)} />
    </div>
  )
}

export default Mobile