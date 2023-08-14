import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/UserStore';
import App from './App';
import OrderStore from './store/OrderStore';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import LoadingStore from './store/LoadingStore';
import ComponentFunctionStore from './store/ComponentFunctionStore';
import TransportTypeStore from './store/TransportTypeStore';
import AdressStore from './store/AdressStore';
import TransportStore from './store/TransportStore';
import EquipmentTypeStore from './store/EquipmentTypeStore';
import UserInfoStore from './store/UserInfoStore';
import OfferStore from './store/OfferStore';
import PointStore from './store/PointStore';
import PartnerStore from './store/PartnerStore';
import RatingStore from './store/RatingStore';
import FilterAndSortStore from './store/FilterAndSortStore';
import NotificationStore from './store/NotificationStore';
import TranslateStore from './store/TranslateStore';
import SubscriptionStore from './store/SubscriptionStore';
import SettingStore from './store/SettingStore';
import LimitStore from './store/LimitStore';
import StateStore from './store/StateStore';
import FetcherStore from './store/FetcherStore';
import ManagementStore from './store/ManagementStore';
import AdStore from './store/AdStore';
import LinkStore from './store/LinkStore';

export const UserContext = createContext(null)
export const UserInfoContext = createContext(null)
export const OrderContext = createContext(null)
export const LoadingContext = createContext(null)
export const ComponentFunctionContext = createContext(null)
export const TransportTypeContext = createContext(null)
export const TransportContext = createContext(null)
export const AdressContext = createContext(null)
export const EquipmentTypeContext = createContext(null)
export const OfferContext = createContext(null)
export const PartnerContext = createContext(null)
export const PointContext = createContext(null)
export const RatingContext = createContext(null)
export const FilterAndSortContext = createContext(null)
export const NotificationContext = createContext(null)
export const TranslateContext = createContext(null)
export const SubscriptionContext = createContext(null)
export const SettingContext = createContext(null)
export const StateContext = createContext(null)
export const LimitContext = createContext(null)
export const FetcherContext = createContext(null)
export const ManagementContext = createContext(null)
export const AdContext = createContext(null)
export const LinkContext = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));

const Global = createGlobalStyle`
*{
  margin:0;
  padding:0;
  font-family: 'Jost', sans-serif;      
     }
 a{
  color:lightgrey;
  text-decoration:none;
     }
  a:hover{
  color:grey;
     }
  img{
  border: none
  }
`
const theme = {
  media: {
    phone: "(max-width:425px)",
    tablet: "(max-width:768px) and (min-width:425px)"
  }
}

root.render(
  <FetcherContext.Provider value={{
    fetcher: new FetcherStore(),
  }}>
    <TranslateContext.Provider value={{
      Translate: new TranslateStore(),
    }}>
      <LinkContext.Provider value={{
        link: new LinkStore(),
      }}>

        <AdContext.Provider value={{
          Ad: new AdStore(),
        }}>
          <SettingContext.Provider value={{
            Setting: new SettingStore(),
          }}>
            <SubscriptionContext.Provider value={{
              Subscription: new SubscriptionStore(),
            }}>
              <NotificationContext.Provider value={{
                Notification: new NotificationStore(),
              }}>
                <UserContext.Provider value={{
                  user: new UserStore(),
                }}>
                  <UserInfoContext.Provider value={{
                    UserInfo: new UserInfoStore(),
                  }}>

                    <LimitContext.Provider value={{
                      Limit: new LimitStore(),
                    }}>
                      <StateContext.Provider value={{
                        State: new StateStore(),
                      }}>
                        <PartnerContext.Provider value={{
                          Partner: new PartnerStore(),
                        }}>
                          <LoadingContext.Provider value={{
                            loading: new LoadingStore(),
                          }}>
                            <OrderContext.Provider value={{
                              order: new OrderStore(),
                            }}>
                              <FilterAndSortContext.Provider value={{
                                FilterAndSort: new FilterAndSortStore(),
                              }}>
                                <RatingContext.Provider value={{
                                  Rating: new RatingStore(),
                                }}>
                                  <PointContext.Provider value={{
                                    Point: new PointStore(),
                                  }}>
                                    <OfferContext.Provider value={{
                                      Offer: new OfferStore(),
                                    }}>
                                      <ComponentFunctionContext.Provider value={{
                                        ComponentFunction: new ComponentFunctionStore(),
                                      }}>
                                        <TransportTypeContext.Provider value={{
                                          TransportType: new TransportTypeStore(),
                                        }}>
                                          <EquipmentTypeContext.Provider value={{
                                            EquipmentType: new EquipmentTypeStore(),
                                          }}>
                                            <TransportContext.Provider value={{
                                              Transport: new TransportStore(),
                                            }}>
                                              <AdressContext.Provider value={{
                                                Adress: new AdressStore(),
                                              }}>
                                                <ManagementContext.Provider value={{
                                                  Management: new ManagementStore(),
                                                }}>
                                                  {/* <React.StrictMode> */}
                                                  <ThemeProvider theme={theme}>
                                                    <Global />

                                                    <App />

                                                  </ThemeProvider>
                                                  {/* </React.StrictMode> */}
                                                </ManagementContext.Provider>
                                              </AdressContext.Provider>
                                            </TransportContext.Provider>
                                          </EquipmentTypeContext.Provider>
                                        </TransportTypeContext.Provider>
                                      </ComponentFunctionContext.Provider>
                                    </OfferContext.Provider>
                                  </PointContext.Provider>
                                </RatingContext.Provider>
                              </FilterAndSortContext.Provider>
                            </OrderContext.Provider>
                          </LoadingContext.Provider>
                        </PartnerContext.Provider>
                      </StateContext.Provider>
                    </LimitContext.Provider>
                  </UserInfoContext.Provider>
                </UserContext.Provider>
              </NotificationContext.Provider>
            </SubscriptionContext.Provider>
          </SettingContext.Provider>
        </AdContext.Provider>
      </LinkContext.Provider>
    </TranslateContext.Provider>
  </FetcherContext.Provider>
);

