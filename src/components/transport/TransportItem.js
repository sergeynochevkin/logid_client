import React from 'react'
import { deleteTransport } from '../../http/transportApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardContainer } from '../ui/card/CardContainer'
import { CardEquipment } from '../ui/card/CardEquipment'
import { CardRow } from '../ui/card/CardRow'
import { EquipmentRow } from '../ui/card/EquipmentRow'

const TransportItem = ({ oneTransport, setFetchStart, files }) => {
  const deleteClick = async () => {
    await deleteTransport(oneTransport.id);
    setFetchStart(true)
  }

  return (
    <CardContainer
      style={{
        borderColor: oneTransport.type === 'walk' ? 'rgb(129, 199, 132,0.8)' :
          oneTransport.type === 'bike' ? 'rgb(254, 111, 103,0.8)' :
            oneTransport.type === 'electric_scooter' ? 'rgb(210,219,236, 0.8)' :
              oneTransport.type === 'car' ? 'rgb(214,232,255,0.8)' :
                oneTransport.type === 'combi' ? 'rgb(254, 145, 40,0.8)' :
                  oneTransport.type === 'minibus' ? 'rgb(254, 145, 40,0.8)' :
                    oneTransport.type === 'truck' ? 'rgb(224, 224, 224, 0.8)' :
                      oneTransport.type === 'scooter' ? 'rgb(224, 100, 224, 0.8)' :
                        '',
      }}>
      <CardRow>
        <CardColName>ID</CardColName>
        <CardColValue>{oneTransport.id}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>Название</CardColName>
        <CardColValue>{oneTransport.tag}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>Способ доставки</CardColName>
        <CardColValue>
          {oneTransport.type === 'walk' ? 'Пешком' :
            oneTransport.type === 'bike' ? 'Велосипед' :
              oneTransport.type === 'electric_scooter' ? 'Электросамокат' :
                oneTransport.type === 'scooter' ? 'Мопед' :
                  oneTransport.type === 'car' ? 'Легковой автомобиль' :
                    oneTransport.type === 'combi' ? 'Автомобиль комби' :
                      oneTransport.type === 'minibus' ? 'Микроавтобус' :
                        oneTransport.type === 'truck' ? 'Грузовой автомобиль' :
                          ''}
        </CardColValue>
      </CardRow>
      {oneTransport.type === 'minibus' || oneTransport.type === 'truck' ?

        <CardRow>
          <CardColName>Грузоподъемность</CardColName>
          <CardColValue>
            {oneTransport.load_capacity === '1.5' ? '1.5 тонны' :
              oneTransport.load_capacity === '3' ? '3 тонны' :
                oneTransport.load_capacity === '5' ? '5 тонн' :
                  oneTransport.load_capacity === '10' ? '10 тонн' :
                    oneTransport.load_capacity === '15' ? '15 тонн' :
                      oneTransport.load_capacity === '20' ? '20 тонн' : ''}
          </CardColValue>
        </CardRow>
        :
        <></>
      }

      {oneTransport.type === 'truck' ?
        <CardRow>
          <CardColName>Тип кузова</CardColName>
          <CardColValue>
            {oneTransport.side_type === 'open_side' ? 'Открытый борт' :
              oneTransport.side_type === 'awing' ? 'Тент' :
                oneTransport.side_type === 'hard_top' ? 'Фургон' : ''}
          </CardColValue>
        </CardRow>
        :
        <></>
      }
      <EquipmentRow>
        {oneTransport.thermo_bag === true ? <CardEquipment>Термосумка</CardEquipment> : <></>}
        {oneTransport.thermo_van === true ? <CardEquipment>Изотермический фургон</CardEquipment> : <></>}
        {oneTransport.refrigerator_minus === true ? <CardEquipment>Рефрежиратор -7</CardEquipment> : <></>}
        {oneTransport.refrigerator_plus === true ? <CardEquipment>Рефрежиратор +7</CardEquipment> : <></>}
        {oneTransport.hydraulic_platform === true ? <CardEquipment>Гидавлическая платформа</CardEquipment> : <></>}
        {oneTransport.side_loading === true ? <CardEquipment>Боковая загрузка</CardEquipment> : <></>}
        {oneTransport.glass_stand === true ? <CardEquipment>Стойка для стекол</CardEquipment> : <></>}
      </EquipmentRow>

      {/* вывод картинок из массива url надо сформировать такой массив для этого получить из multer имена*/}
      <img src={oneTransport.image}></img>

      <CardRow>
        <CardButton onClick={deleteClick}>Удалить</CardButton>
      </CardRow>
    </CardContainer>
  )
}

export default TransportItem

