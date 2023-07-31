import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdContext, AdressContext, EquipmentTypeContext, FetcherContext, OrderContext, SettingContext, StateContext, SubscriptionContext, TranslateContext, TransportContext, TransportTypeContext, UserContext, UserInfoContext } from '.'
import { fetchDefaultData } from './http/defaultDataApi'
import { fetchUserState } from './http/stateApi'
import { check } from './http/userAPI'
import { fetchUserInfo } from './http/userInfoApi'
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MANAGER_ROUTE, USER_ROUTE, } from './utils/consts'
import axios from "axios";
import { fetchTransport } from './http/transportApi'
import PageLoader from './components/ui/loader/PageLoader '
import { addVisit } from './http/adApi'

const PreLoader = observer(({ children, ...props }) => {
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { Ad } = useContext(AdContext)
    const { TransportType } = useContext(TransportTypeContext)
    const { EquipmentType } = useContext(EquipmentTypeContext)
    const { Adress } = useContext(AdressContext)
    const { Subscription } = useContext(SubscriptionContext)
    const { Translate } = useContext(TranslateContext)
    const { State } = useContext(StateContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [dataLoaded, setDataLoaded] = useState(false)
    const { Setting } = useContext(SettingContext)
    const { Transport } = useContext(TransportContext)
    const { fetcher } = useContext(FetcherContext)
    const { order } = useContext(OrderContext)
    const order_id = queryParams.get("o_i")
    const order_status = queryParams.get("o_s")

    const getIp = async (data) => {
        if (data) {
            Ad.setIp(data.ip)
            await addVisit(data.ip)
        } else {
            axios
                .get("https://ipapi.co/json/")
                .then((response) => {
                    let data = response.data;
                    Ad.setIp(data.ip)
                    addVisit(data.ip)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const getGeoInfo = (countries) => {
        Adress.setCountry(countries.find(el => el.country_code_iso3 === 'RUS'));
        Translate.setLanguage(Adress.countries.find(el => el.country_code_iso3 === 'RUS').default_language)
        setDataLoaded(true)
        getIp()


        // axios
        //     .get("https://ipapi.co/json/")
        //     .then((response) => {
        //         let data = response.data;
        //         getIp(data)
        //         //check if we dont have cuntry state in localstorage
        //         let country = countries.find(el => el.country_code_iso3 === data.country_code_iso3)
        //         if (country) {
        //             Adress.setCountry(country);
        //             if (localStorage.getItem('language')) {
        //                 let language = localStorage.getItem('language')
        //                 if (language === 'english' || language === country.default_language) {
        //                     Translate.setLanguage(language)
        //                 } else {
        //                     Translate.setLanguage(country.default_language)
        //                 }
        //             } else {
        //                 Translate.setLanguage(country.default_language)
        //             }
        //             setDataLoaded(true)
        //         } else {
        //             Adress.setCountry(countries.find(el => el.country_code_iso3 === 'RUS'));
        //             //select deafault country, say that we dont have service in this country
        //             Translate.setLanguage(Adress.countries.find(el => el.country_code_iso3 === 'RUS').default_language)
        //             setDataLoaded(true)
        //             Adress.setCountryDetected(false)
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    useEffect(() => {
        localStorage.getItem('app_theme') && Setting.setAppTheme(localStorage.getItem('app_theme'))
        if (!localStorage.getItem('cookies_accepted')) {
            localStorage.setItem('cookies_accepted', JSON.stringify({ total: false, auth: false, main: false }))
        } else if (!JSON.parse(localStorage.getItem('cookies_accepted')).total) {
            localStorage.setItem('cookies_accepted', JSON.stringify({ total: false, auth: false, main: false }))
        }
        fetchData().then(UserInfo.setUserInfo({}))
    }, [])

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

            if (localStorage.getItem('country') && localStorage.getItem('country') !== 'undefined') {
                let country = JSON.parse(localStorage.getItem('country'))
                Adress.setCountry(country)
                if (localStorage.getItem('language')) {
                    let language = localStorage.getItem('language')
                    if (language === 'english' || language === country.default_language) {
                        Translate.setLanguage(language)
                    } else {
                        Translate.setLanguage(country.default_language)
                    }
                } else {
                    Translate.setLanguage(country.default_language)
                }
                getIp()
                setDataLoaded(true)
            } else {
                getGeoInfo(data.countries);
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            try {
                async function fetchData() {
                    let country
                    let data = await check()
                    user.setUser(data)

                    if (data.role === 'admin') {
                        fetcher.setManagementVisits(true)
                        fetcher.setManagementUsers(true)
                        fetcher.setManagementOrders(true)
                        fetcher.setManagementTransports(true)
                    }

                    // await fetching()
                    user.setIsAuth(true)

                    data = await fetchUserInfo(user.user.id).then(data => {
                        if (data) {
                            if (data.role === 'carrier') {
                                fetchTransport(UserInfo.userInfo.id).then(data => Transport.setTransports(data))
                            }
                        }
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
                            if (state.adress_history) {
                                Setting.setAdressHistory(state.adress_history)
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

                        data && fetcher.setUserAppSetting(true)

                    })

                    if (user.user.role === 'carrier' || user.user.role === 'customer') {
                        fetcher.setOrdersAll(true)
                        navigate(USER_ROUTE)
                    }
                    user.user.role === 'admin' && navigate(MAIN_ROUTE)
                    user.user.role === 'manager' && navigate(MAIN_ROUTE)
                }
                fetchData();
            } catch (e) {
                console.log(e.data.message);
            }
        }
    }, [])


    useEffect(() => {
        if (order_id) {
            order.setLinkOrder(order_id, 'id')
            order.setLinkOrder(order_status, 'status')
            if (!user.isAuth) {
                navigate(LOGIN_ROUTE)
            }
        }
    }, [])

    return (
        <div{...props}>{!dataLoaded ? <PageLoader /> : children}</div>
    )

})

export default PreLoader