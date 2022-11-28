import React, { useState, useContext } from 'react'
import { Name } from '../ui/text/Name'
import styled from 'styled-components'
import { AdressContext, ComponentFunctionContext, UserContext, UserInfoContext } from '../..'
import { createUserInfo, fetchUserInfo } from '../../http/userInfoApi'
import { observer } from 'mobx-react-lite'
import { useFetching } from '../../hooks/useFetching'
import NameSurNameFathersName from './userInfoForm/NameSurNameFathersName'
import City from './userInfoForm/City'
import AdressComponent from './userInfoForm/AdressComponent'
import TypeOfCustomer from './userInfoForm/TypeOfCustomer'
import Legal from './userInfoForm/Legal'
import Phone from './userInfoForm/Phone'
import Country from './userInfoForm/Country'
import { useInput } from '../../hooks/useInput'
import { Button } from '../ui/button/Button'
import { Form } from '../ui/form/Form'

const Container = styled.div`
display:flex;
gap:5px;
`

const UserInfoForm = observer(() => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)

    const [fetching, error] = useFetching(async () => {
        await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data))
    })

    const [formData, setFormData] = useState({
        userId: user.user.id,
        country: '',
        legal: '',
        city: { value: '',  isDirty: false, notValid:true },

        city_place_id: '',
        city_latitude: '',
        city_longitude: '',

        phone: '',
        website: '',
        company_name: '',
        company_inn: '',
        company_adress: { value: '', isDirty: false,  notValid:true },

        company_adress_latitude: '',
        company_adress_longitude: '',

        type_of_customer: '',
        name_surname_fathersname: '',
        passport_number: '',
        passport_date_of_issue: '',
        passport_issued_by: '',
        email: ''
    })

    formData.id = UserInfo.userInfo.id
    formData.name_surname_fathersname = useInput('', { isEmpty: true, minLength: 10, maxLength: 50 }, 'фамилия, имя, отчество')
    const validInn = /^[1-9]+[0-9]*$/
    formData.company_inn = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validInn }, 'ИНН')
    formData.company_name = useInput('', { isEmpty: true, minLength: 6, maxLength: 30 }, 'название компании')
    const validWebSite = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
    formData.website = useInput('', { isEmpty: true, minLength: 6, maxLength: 30, validFormat: validWebSite }, 'веб сайт')
    formData.country = useInput('', { isEmpty: true })
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    formData.legal = useInput('', { isEmpty: true })
    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, 'email')
    formData.passport_date_of_issue = useInput('', { isEmpty: true }, 'дата выдачи паспорта')
    formData.passport_issued_by = useInput('', { isEmpty: true, minLength: 10, maxLength: 40 }, 'кем выдан паспорт')
    const validPassportNumber = /^[а-яА-ЯёЁa-zA-Z0-9]+$/
    formData.passport_number = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPassportNumber }, 'номер паспорта')
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/
    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, 'телефон')
    formData.type_of_customer = useInput('', { isEmpty: true })

    formData.email.value = user.user.email

    const click = async (event) => {
        try {
            let data;
            event.preventDefault();
            data = await createUserInfo(
                formData
            )
            fetching()
            ComponentFunction.setPageFunction('orderList')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Form>
            <Name></Name>
            <NameSurNameFathersName setFormData={setFormData} formData={formData} />
            <Country setFormData={setFormData} formData={formData} />
            {formData.country.value !== '' && <City setFormData={setFormData} formData={formData} />}
            {/* проверить не гугл */}

            <Phone setFormData={setFormData} formData={formData} />
            <Legal setFormData={setFormData} formData={formData} />

            {user.user.role === 'customer' ?
                <TypeOfCustomer setFormData={setFormData} formData={formData} /> : <></>
            }
            {formData.city.value !== '' && <AdressComponent setFormData={setFormData} formData={formData} />}
            {/* проверить не гугл */}

            <Container>
                <Button disabled={
                    formData.legal.notValid ||
                    formData.city.notValid ||
                    formData.phone.notValid ||
                    formData.company_adress.notValid |
                    (formData.website.notValid && !formData.website.isEmpty && (formData.legal.value === 'sole_trader' || formData.legal.value === 'entity')) ||
                    (formData.company_name.notValid && (formData.legal.value === 'sole_trader' || formData.legal.value === 'entity')) ||
                    (formData.company_inn.notValid && (formData.legal.value === 'sole_trader' || formData.legal.value === 'entity')) ||
                    (formData.company_adress.notValid && (formData.legal.value === 'sole_trader' || formData.legal.value === 'entity')) ||
                    (formData.type_of_customer.notValid && user.user.role === 'customer') ||
                    formData.name_surname_fathersname.notValid ||
                    (formData.passport_number.notValid && formData.legal.value === 'person') ||
                    (formData.passport_date_of_issue.notValid && formData.legal.value === 'person') ||
                    (formData.passport_issued_by.notValid && formData.legal.value === 'person')
                } onClick={click}>Сохранить</Button>
            </Container>
        </Form>
    )
})

export default UserInfoForm