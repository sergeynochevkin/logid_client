import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ComponentFunctionContext, EquipmentTypeContext, TranslateContext, TransportTypeContext, UserContext } from '../..'
import { FormSection } from '../ui/form/FormSection'
import { Select } from '../ui/form/Select'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { FieldName } from '../ui/page/FieldName'
import { CardButton } from '../ui/button/CardButton'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { useInput } from '../../hooks/useInput'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const Container = styled.div`
display:flex;
gap:5px;
align-items:center;
flex-direction:column;`


const TransportFormSection = ({ setFormData, formData, click, parent, setModalActive, formReset, setCalculate, files, formFunction }) => {
  const { TransportType } = useContext(TransportTypeContext)
  const { EquipmentType } = useContext(EquipmentTypeContext)
  const { user } = useContext(UserContext)
  const { Translate } = useContext(TranslateContext)
  const [valid, setValid] = useState({ ad_text: false, tag: false })

  useEffect(() => {
    localStorage.setItem('orderFormData', JSON.stringify(formData))
  },
    [
      formData.side_type,
      formData.load_capacity,
      formData.type,
      formData.thermo_bag,
      formData.hydraulic_platform,
      formData.side_loading,
      formData.glass_stand,
      formData.refrigerator_minus,
      formData.refrigerator_plus,
      formData.thermo_van
    ])

  //make the restriction not recalculate if car changes to car
  useEffect(() => {
    if (user.user.role === 'customer') {
      if (formData.type.value !== '') {
        setCalculate(true)
      }
    }
  }, [formData.type.value])

  const typeReset = () => {
    formData.load_capacity.setValue('')
    formData.side_type.setValue('')
    formData.load_capacity.setDirty(false)
    formData.side_type.setDirty(false)
    formData.hydraulic_platform = false
    formData.side_loading = false
    formData.glass_stand = false
    formData.refrigerator_minus = false
    formData.refrigerator_plus = false
    formData.thermo_van = false
  }
  const sideTypeReset = () => {
    formData.hydraulic_platform = false
    formData.side_loading = false
    formData.glass_stand = false
    formData.refrigerator_minus = false
    formData.refrigerator_plus = false
    formData.thermo_van = false
  }

  return (
    <Container>

      <FormSection>
        <VerticalContainer
          style={{ gap: '0px' }}
        >
          <Select value={formData.type.value}
            onChange={(e) => {
              formData.type.onChange(e)
              typeReset()

            }}
            onBlur={e => formData.type.onBlur(e)}
            style={{ borderLeft: (formData.type.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
            name="type" id="type"
          >
            <option defaultValue hidden>{SetNativeTranslate(Translate.language, {
              russian: ['Способ доставки'],
              english: ['Shipping method'],
              spanish: ['Método de entrega'],
              turkish: ['Teslimat yöntemi'],
            },)}</option>
            {TransportType.types.map(type =>
              <option value={type.type} key={type.id}>{SetNativeTranslate(Translate.language, {}, type.type)}</option>
            )}
          </Select>
          <FieldName
            style={{
              fontWeight: 'normal',
              color: 'rgb(254, 111, 103,0.8)'
            }}
          >
            {(formData.type.isEmpty && formData.type.isDirty) ?
              SetNativeTranslate(Translate.language, {}, 'select_transport_type') :
              ''
            }
          </FieldName>
        </VerticalContainer>

        {formData.type.value === 'walk' || formData.type.value === 'scooter' || formData.type.value === 'bike' || formData.type.value === 'electric_scooter' || formData.type.value === 'car' ?
          <div>
            {EquipmentType.types.slice(0, 1).map(equipment =>
              <CheckBoxContainer key={equipment.id}>
                <CheckBoxSection key={equipment.id}>

                  <input type='checkbox' checked={formData.thermo_bag && 'checked'} value={formData.thermo_bag} key={equipment.id} onChange={() => {
                    formData.thermo_bag === false ? setFormData({ ...formData, thermo_bag: true }) :
                      setFormData({ ...formData, thermo_bag: false })
                  }}></input>

                  <>
                    <label key={equipment.id}>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label>
                  </>
                </CheckBoxSection>
              </CheckBoxContainer>
            )}
          </div> :
          <></>
        }

        {formData.type.value === 'minibus' ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Select
              value={formData.load_capacity.value}
              onChange={(e) => formData.load_capacity.onChange(e)}
              onBlur={e => formData.load_capacity.onBlur(e)}
              style={{ borderLeft: (formData.load_capacity.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
              name="load_capacity" id="load_capacity"
            >
              <option defaultValue hidden>{SetNativeTranslate(Translate.language, {}, 'load_capacity')}</option>
              {TransportType.load_capacities.slice(0, 2).map(load_capacity =>
                <option value={load_capacity.capacity} key={load_capacity.id}>{SetNativeTranslate(Translate.language, {}, load_capacity.capacity)}</option>
              )}
            </Select>
            <FieldName
              style={{
                fontWeight: 'normal',
                color: 'rgb(254, 111, 103,0.8)'
              }}>
              {(formData.load_capacity.isEmpty && formData.load_capacity.isDirty) ?
                SetNativeTranslate(Translate.language, {}, 'select_load_capacity') :
                ''
              }
            </FieldName>
          </VerticalContainer>

          : <></>
        }

        {formData.type.value === 'combi' || formData.type.value === 'minibus' ?
          <div>
            {EquipmentType.types.slice(1, 4).map(equipment =>
              <CheckBoxContainer key={equipment.id}>
                <CheckBoxSection key={equipment.id}>
                  {equipment.type === 'thermo_van' ?
                    <>
                      <input type='checkbox' checked={formData.thermo_van && 'checked'} value={formData.thermo_van} onChange={() => {
                        formData.thermo_van === false ? setFormData({ ...formData, thermo_van: true }) :
                          setFormData({ ...formData, thermo_van: false })
                      }}></input>
                      <label key={equipment.id}>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label>
                    </> :
                    equipment.type === 'refrigerator_minus' ?
                      <>
                        <input type='checkbox' checked={formData.refrigerator_minus && 'checked'} value={formData.refrigerator_minus} onChange={() => {
                          formData.refrigerator_minus === false ? setFormData({ ...formData, refrigerator_minus: true }) :
                            setFormData({ ...formData, refrigerator_minus: false })
                        }}></input>
                        <label key={equipment.id}>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label>
                      </> :
                      equipment.type === 'refrigerator_plus' ?
                        <>
                          <input type='checkbox' checked={formData.refrigerator_plus && 'checked'} value={formData.refrigerator_plus} onChange={() => {
                            formData.refrigerator_plus === false ? setFormData({ ...formData, refrigerator_plus: true }) :
                              setFormData({ ...formData, refrigerator_plus: false })
                          }}></input>
                          <label key={equipment.id}>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label>
                        </> : <></>
                  }

                </CheckBoxSection>
              </CheckBoxContainer>
            )}
          </div> :
          <></>
        }

        {formData.type.value === 'truck' ?
          <>
            <VerticalContainer
              style={{ gap: '0px' }}
            >
              <Select
                value={formData.side_type.value}
                onChange={(e) => {
                  formData.side_type.onChange(e)
                  sideTypeReset()
                }}
                onBlur={e => formData.side_type.onBlur(e)}
                style={{ borderLeft: (formData.side_type.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                name="side_type" id="side_type"
              >
                <option defaultValue hidden>{SetNativeTranslate(Translate.language, {}, 'side_type')}</option>
                {TransportType.side_types.map(side_type =>
                  <option value={side_type.type} key={side_type.id}>{SetNativeTranslate(Translate.language, {}, side_type.type)}</option>
                )}
              </Select>
              <FieldName
                style={{
                  fontWeight: 'normal',
                  color: 'rgb(254, 111, 103,0.8)'
                }}
              >
                {(formData.side_type.isEmpty && formData.side_type.isDirty) ?
                  SetNativeTranslate(Translate.language, {}, 'select_side_type') :
                  ''
                }
              </FieldName>
            </VerticalContainer>

            <VerticalContainer
              style={{ gap: '0px' }}
            >
              <Select
                value={formData.load_capacity.value}
                onChange={(e) => formData.load_capacity.onChange(e)}
                onBlur={e => formData.load_capacity.onBlur(e)}
                style={{ borderLeft: (formData.load_capacity.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                name="load_capacity" id="load_capacity"
              >
                <option defaultValue hidden>{SetNativeTranslate(Translate.language, {}, 'load_capacity')}</option>
                {TransportType.load_capacities.map(load_capacity =>
                  <option value={load_capacity.capacity} key={load_capacity.id}>{SetNativeTranslate(Translate.language, {}, load_capacity.capacity)}</option>
                )}
              </Select>
              <FieldName
                style={{
                  fontWeight: 'normal',
                  color: 'rgb(254, 111, 103,0.8)'
                }}>
                {(formData.load_capacity.isEmpty && formData.load_capacity.isDirty) ?
                  SetNativeTranslate(Translate.language, {}, 'select_load_capacity') :
                  ''
                }
              </FieldName>
            </VerticalContainer>

            <div>
              {EquipmentType.types.slice(1, 7).map(equipment =>
                <CheckBoxSection key={equipment.id}>
                  <CheckBoxContainer key={equipment.id}>
                    {formData.side_type.value === 'hard_top' ?
                      <>
                        {equipment.type === 'thermo_van' ?
                          <><input type='checkbox' checked={formData.thermo_van && 'checked'} value={formData.thermo_van} key={equipment.id} onChange={() => {
                            formData.thermo_van === false ? setFormData({ ...formData, thermo_van: true }) :
                              setFormData({ ...formData, thermo_van: false })
                          }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></>
                          :
                          equipment.type === 'refrigerator_minus' & formData.side_type.value !== 'open_side' ?
                            <> <input type='checkbox' checked={formData.refrigerator_minus && 'checked'} value={formData.refrigerator_minus} key={equipment.id} onChange={() => {
                              formData.refrigerator_minus === false ? setFormData({ ...formData, refrigerator_minus: true }) :
                                setFormData({ ...formData, refrigerator_minus: false })
                            }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></>
                            :
                            equipment.type === 'refrigerator_plus' & formData.side_type.value !== 'open_side' ?
                              <><input type='checkbox' checked={formData.refrigerator_plus && 'checked'} value={formData.refrigerator_plus} key={equipment.id} onChange={() => {
                                formData.refrigerator_plus === false ? setFormData({ ...formData, refrigerator_plus: true }) :
                                  setFormData({ ...formData, refrigerator_plus: false })
                              }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></> : <></>
                        }
                      </>
                      : <></>

                    }
                    {
                      equipment.type === 'hydraulic_platform' ?
                        <><input type='checkbox' checked={formData.hydraulic_platform && 'checked'} value={formData.hydraulic_platform} key={equipment.id} onChange={() => {
                          formData.hydraulic_platform === false ? setFormData({ ...formData, hydraulic_platform: true }) :
                            setFormData({ ...formData, hydraulic_platform: false })
                        }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></>
                        :
                        equipment.type === 'glass_stand' ?
                          <><input type='checkbox' checked={formData.glass_stand && 'checked'} value={formData.glass_stand} key={equipment.id} onChange={() => {
                            formData.glass_stand === false ? setFormData({ ...formData, glass_stand: true }) :
                              setFormData({ ...formData, glass_stand: false })
                          }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></>
                          :
                          equipment.type === 'side_loading' ?
                            <><input type='checkbox' checked={formData.side_loading && 'checked'} value={formData.side_loading} key={equipment.id} onChange={() => {
                              formData.side_loading === false ? setFormData({ ...formData, side_loading: true }) :
                                setFormData({ ...formData, side_loading: false })
                            }}></input><label>{SetNativeTranslate(Translate.language, {}, equipment.type)}</label></> :
                            <></>
                    }
                  </CheckBoxContainer>
                </CheckBoxSection>
              )}
            </div>

          </>
          : <></>
        }

        {parent !== 'orderForm' && parent !== 'fast_sign_up' ?
          <HorizontalContainer>
            <CardButton
              disabled={
                formData.type.notValid ||
                formData.tag.notValid ||
                files.length < 1 ||
                (formData.ad_text.notValid && !formData.ad_text.isEmpty ) ||
                (formData.ad_name.notValid && !formData.ad_name.isEmpty) ||
                (formData.side_type.notValid && formData.type.value === 'truck') ||
                (formData.load_capacity.notValid && (formData.type.value === 'truck' ||
                  formData.type.value === 'minibus'))
              }

              onClick={click}>{SetNativeTranslate(Translate.language, {
                russian: [`${formFunction === 'update' || formFunction === 'update_from_fast' ? 'Сохранить' : 'Добавить'}`],
                english: [`${formFunction === 'update' ? 'Save' : 'Add'}`],
                spanish: [`${formFunction === 'update' ? 'Ahorrar' : 'Agregar'}`],
                turkish: [`${formFunction === 'update' ? 'Kaydetmek' : 'Eklemek'}`],
              })}</CardButton>


            <CardButton
              onClick={(event) => {
                event.preventDefault()
                setModalActive(false)
                formReset()
              }}
            >{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
          </HorizontalContainer>
          : <></>}

      </FormSection>
    </Container>
  )
}

export default TransportFormSection