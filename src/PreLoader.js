import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdressContext, EquipmentTypeContext, SettingContext, StateContext, SubscriptionContext, TranslateContext, TransportTypeContext, UserContext, UserInfoContext } from '.'
import { useFetching } from './hooks/useFetching'
import { fetchDefaultData } from './http/defaultDataApi'
import { fetchUserState } from './http/stateApi'
import { check } from './http/userAPI'
import { fetchUserInfo } from './http/userInfoApi'
import { CARRIER_ROUTE, CUSTOMER_ROUTE } from './utils/consts'
import axios from "axios";

const PreLoader = observer(({ children, ...props }) => {
    const { TransportType } = useContext(TransportTypeContext)
    const { EquipmentType } = useContext(EquipmentTypeContext)
    const { Adress } = useContext(AdressContext)
    const { Subscription } = useContext(SubscriptionContext)
    const { Translate } = useContext(TranslateContext)
    const { State } = useContext(StateContext)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [dataLoaded, setDataLoaded] = useState(false)
    const { Setting } = useContext(SettingContext)

    //attach google and lets go to design!

    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                //check if we dont have cuntry state in localstorage
                let countries = [...Adress.countries]
                let country = countries.find(el => el.country_code_iso3 === data.country_code_iso3)
                if (country) {
                    Adress.setCountry(country);
                    Translate.setLanguage(country.default_language)
                    setDataLoaded(true)
                } else {
                    country = countries.find(el => el.country_code_iso3 === 'KGZ')
                    Adress.setCountry(country);
                    //select deafault country, say that we dont have service in this country
                    Translate.setLanguage(country.default_language)
                    setDataLoaded(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        async function fetchData() {
            await fetchDefaultData().then(data => {
                Subscription.setPlans(data.subscripton_plans)
                Subscription.setOptions(data.subscripton_options)
                Subscription.setOptionsByPlans(data.subscripton_options_by_plans)
                TransportType.setTypes(data.transport_types)
                TransportType.setSideTypes(data.transport_side_types)
                TransportType.setLoadCapacities(data.transport_load_capacities)
                EquipmentType.setTypes(data.equipment_types)
                Adress.setCountries(data.countries)
            })
        }
        fetchData().then(UserInfo.setUserInfo({}));
    }, [])

    useEffect(() => {
        if (localStorage.getItem('country') && localStorage.getItem('country') !== undefined) {
            let country = JSON.parse(localStorage.getItem('country'))
            Adress.setCountry(country)
            Translate.setLanguage(country.default_language)
            setDataLoaded(true)
        } else {
            getGeoInfo();
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('1');
            try {
                async function fetchData() {
                    let data = await check()
                    user.setUser(data)
                    // await fetching()
                    user.setIsAuth(true)
                    data = await fetchUserInfo(user.user.id).then(data => {
                        let country
                        if (data) {
                            UserInfo.setUserInfo(data)
                            country = Adress.countries.find(el => el.value === data.country)
                            if (country !== Adress.country.value) {
                                Adress.setCountry(country)
                            }
                        }
                        data && fetchUserState(data.id).then(stateData => {
                            let state = JSON.parse(stateData.state)
                            State.setUserState(state)
                            if (state.app_theme) {
                                Setting.setAppTheme(state.app_theme)
                            }
                            if (state.language) {
                                if (state.language !== 'english' && state.language !== country.default_language) {
                                    Translate.setLanguage(country.default_language)
                                } else {
                                    Translate.setLanguage(state.language)
                                }
                            } else {
                                State.setUserStateField(Translate.language, 'language', data.id)
                            }
                        })
                    })
                    if (user.user.role === "carrier") {
                        navigate(CARRIER_ROUTE)
                    }
                    if (user.user.role === "customer") {
                        navigate(CUSTOMER_ROUTE)
                    }
                }
                fetchData();
            } catch (e) {
                console.log(e.data.message);
            }
        }
    }, [])


    if (!dataLoaded) {
        <></>
    }
    else {
        return (
            <div{...props}>{children}</div>
        )
    }
})

export default PreLoader