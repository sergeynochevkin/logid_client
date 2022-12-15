import React from 'react'

const FooterItem = ({item}) => {
  return (
    <div className={item.class}>{item.name}</div>
  )
}

export default FooterItem