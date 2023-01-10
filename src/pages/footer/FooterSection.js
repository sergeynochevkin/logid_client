import React from 'react'
import FooterItem from './FooterItem'

const FooterSection = ({ section, items, setModalActive, setAgreement}) => {
    return (
        <div className={section.class}>
            {items.map(item => <FooterItem item={item} key={item.id}  setModalActive = {setModalActive} setAgreement={setAgreement}/>)}
        </div>
    )
}

export default FooterSection