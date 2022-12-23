import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdressContext, EquipmentTypeContext, StateContext, SubscriptionContext, TranslateContext, TransportTypeContext, UserContext, UserInfoContext } from '.'
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
    const [data2Loaded, setData2Loaded] = useState(false)

    //attach google and lets go to design!

    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                //check if we dont have cuntry state in localstorage
                let country = Adress.countries.find(el => el.country_code_iso3 === data.country_code_iso3)
                if (country) {
                    Adress.setCountry(country);
                    Translate.setLanguage(country.default_language)
                } else {
                    Adress.setCountry(Adress.countries.find(el => el.country_code_iso3 === 'CAN'));
                    //select deafault country, say that we dont have service in this country
                    Translate.setLanguage(Adress.countries.find(el => el.country_code_iso3 === 'CAN').default_language)
                }
                setData2Loaded(true)
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
                Translate.setTranslation(data.translation)
                TransportType.setTypes(data.transport_types)
                TransportType.setSideTypes(data.transport_side_types)
                TransportType.setLoadCapacities(data.transport_load_capacities)
                EquipmentType.setTypes(data.equipment_types)
                Adress.setCountries(data.countries)
                setDataLoaded(true)
            })
        }
        fetchData();
        UserInfo.setUserInfo({})
    }, [])

    useEffect(() => {
        if (dataLoaded) {
            if (localStorage.getItem('country') && localStorage.getItem('country') !== undefined) {
                Adress.setCountry(JSON.parse(localStorage.getItem('country')))
                Translate.setLanguage(JSON.parse(localStorage.getItem('country')).default_language)
                setData2Loaded(true)
            } else {
                getGeoInfo();
            }
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            try {
                async function fetchData() {
                    let data = await check()
                    user.setUser(data)
                    // await fetching()
                    user.setIsAuth(true)
                    data = await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data))
                    data && UserInfo.setUserInfo(data)
                    data && await fetchUserState(data.id).then(data => State.setUserState(JSON.parse(data.state)))
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
    //check and set country language from state

    if (!data2Loaded) {
        <></>
    }
    else {

        return (
            <div{...props}>{children}</div>
        )
    }
})

export default PreLoader