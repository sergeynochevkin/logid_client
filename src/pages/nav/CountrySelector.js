import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, SettingContext, TranslateContext } from '../..'
import { CardButton } from '../../components/ui/button/CardButton';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import CountrySelectorItem from '../nav/CountrySelectorItem';

const CountrySelector = observer(({ name, setModalActive }) => {
  const { Adress } = useContext(AdressContext)
  const { Translate } = useContext(TranslateContext)
  const { Setting } = useContext(SettingContext)


  return (
    <div className={Setting.app_theme === 'light' ? 'country_selector_container' : 'country_selector_container dark'}>
      <div className='country_selector_name'>{!name ? SetNativeTranslate(Translate.language, {
        russian: ['Мы не смогли определить вашу страну, пожалуйста выберите ее из списка'],
        english: ['We could not determine your country, please select it from the list']
      }) : name}</div>
      <div className='country_selector_countries_container'>
        {Adress.countries.filter(el => el.value !== Adress.country.value && el.sector === Adress.country.sector).map(country => <CountrySelectorItem country={country} setModalActive={setModalActive} />)}
      </div>
      <CardButton
        onClick={
          () => {
            setModalActive(false)
          }
        }
      >{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
    </div>
  )
})

export default CountrySelector