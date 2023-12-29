import React, { useContext } from 'react'
import '../Order.css'
import { CardButton } from '../../ui/button/CardButton'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { TranslateContext } from '../../..'

const RecommendCost = observer(({ recommended, setCalculate }) => {
    const { Translate } = useContext(TranslateContext)


    return (
        <>
            {!recommended ?
            <div className='recommend_cost_container_anchor'>
                <div className='recommend_cost_container'>
                    <CardButton onClick={(e) => {
                        e.preventDefault()
                        setCalculate(true)
                    }}>{
                            SetNativeTranslate(Translate.language, {
                                russian: [`Рекомендовать`],
                                english: [`Recommend`],
                                spanish: [`Recomendar`],
                                turkish: [`Tavsiye etmek`],
                                сhinese: [`推荐`],
                                hindi: [`अनुशंसा करना`],
                            })
                        }</CardButton>
                </div>
                </div> : <></>
            }
        </>
    )
})

export default RecommendCost