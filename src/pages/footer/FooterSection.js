import React from 'react'
import FooterItem from './FooterItem'

const FooterSection = ({ section, items }) => {
    return (
        <div className={section.class}>
            {items.map(item => <FooterItem item={item} key={item.id} />)}
        </div>
    )
}

export default FooterSection