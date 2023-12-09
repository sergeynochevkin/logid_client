import React, { startTransition, useContext, useEffect, useState } from "react";
import {
  AdressContext,
  LinkContext,
  OrderContext,
  SettingContext,
  StateContext,
  TranslateContext,
  UserContext,
  UserInfoContext,
} from "../..";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MAIN_ROUTE,
  USER_ROUTE,
  ADMIN_ROUTE,
  MANAGER_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import NotificationComponent from "../../components/notification/NotificationComponent";
import { logout } from "../../http/userAPI";
import "./NavBar.css";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";
import Modal from "../../components/ui/modal/Modal";
import CountrySelector from "./CountrySelector";
import NotificationIcon from "../../components/notification/NotificationIcon";
import ServerNotificationList from "../../components/notification/ServerNotificationList";
import dark_mode from "../../assets/icons/dark_mode.png";
import light_mode from "../../assets/icons/light_mode.png";
import board from "../../assets/icons/board.png";
import board_dark from "../../assets/icons/board_dark.png";
import logo_light from "../../assets/logo_light.webp";
import logo_dark from "../../assets/logo_dark.webp";
import Auth from "../../components/auth/Auth";
import ShareComponent from "../../components/share/ShareComponent";
import InternedSpeed from "./InternedSpeed";
import LocationStatus from "./LocationStatus";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import LanguageSwitcher from "./LanguageSwitcher";
import NavBarCaptureElement from "./NavBarCaptureElement";

const NavBar = observer(() => {
  const { user } = useContext(UserContext);
  const { order } = useContext(OrderContext);
  const { State } = useContext(StateContext);
  const navigate = useNavigate();
  let location = useLocation();
  const { UserInfo } = useContext(UserInfoContext);
  const { Setting } = useContext(SettingContext);
  const { link } = useContext(LinkContext);
  const { Translate } = useContext(TranslateContext);
  const { Adress } = useContext(AdressContext);
  const [modalActive, setModalActive] = useState(false);
  const [modalActive1, setModalActive1] = useState(false);
  const [modalActive2, setModalActive2] = useState(false);
  const [name, setName] = useState("");
  const { width } = useWindowDimensions();

  useEffect(() => {
    !Adress.country_detected && setModalActive(true);
  }, []);

  useEffect(() => {
    if (
      (link.order.id ||
        link.refer.id ||
        link.after_actions.driver_activation) &&
      !user.isAuth
    ) {
      setModalActive1(true);
    }
  }, []);

  let office = SetNativeTranslate(Translate.language, {
    russian: ["Кабинет"],
    english: ["Office"],
    spanish: ["Oficina"],
    turkish: ["Ofis"],
    сhinese: ["办公室"],
    hindi: ["कार्यालय"],
  });

  return (
    <>
      <InternedSpeed />
      <LocationStatus />
      <div
        className={
          Setting.app_theme === "light"
            ? "nav_bar_container"
            : "nav_bar_container nav_bar_container_dark"
        }
      >
        <NotificationComponent />

        <NotificationIcon
          modalActive={modalActive2}
          setModalActive={setModalActive2}
        />
        <Modal
          parent={"serverNotifications"}
          modalActive={modalActive2}
          setModalActive={setModalActive2}
        >
          <ServerNotificationList setModalActive={setModalActive2} />
        </Modal>

        <Modal setModalActive={setModalActive1} modalActive={modalActive1}>
          <Auth
            enterPoint={"isLogin"}
            setModalActive={setModalActive1}
            modalActive={modalActive1}
            parent={"navBar"}
          />
        </Modal>

        <div
          className="nav_bar_logo_container"
          onClick={() => {
            startTransition(() => {
              navigate(MAIN_ROUTE);
            });
          }}
        >
          <img
            src={
              Setting.app_theme === "light" && Translate.language === "russian"
                ? logo_light
                : Setting.app_theme === "light" &&
                  Translate.language !== "russian"
                ? logo_light
                : Setting.app_theme === "dark" &&
                  Translate.language === "russian"
                ? logo_dark
                : Setting.app_theme === "dark"
                ? logo_dark
                : logo_light
            }
            className="nav_bar_logo"
          />
        </div>

        {width > 500 ? (
          <>
            {user.user.role === "customer" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "customers_office")}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "carrier" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "carriers_office")}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "driver" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {
                  russian: ["Кабинет водителя"],
                  english: ["Drivers office"],
                  spanish: ["Oficina del conductor"],
                  turkish: ["Sürücü ofisi"],
                  сhinese: ["司机室"],
                  hindi: ["ड्राइवर का कार्यालय"],
                })}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "manager" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(MANAGER_ROUTE)}
              >
                {SetNativeTranslate(Translate.language, {}, "managers_office")}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "admin" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                {SetNativeTranslate(
                  Translate.language,
                  {},
                  "administrators_office"
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {user.user.role === "customer" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "carrier" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
            {user.user.role === "driver" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(USER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "manager" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(MANAGER_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}

            {user.user.role === "admin" && user.isAuth ? (
              <div
                className="nav_bar_item"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                {office}
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        {user.isAuth ? (
          <div
            className="nav_bar_item"
            onClick={async () => {
              await logout();
              order.setOrders([]);
              user.setIsAuth(false);
              user.setUser({});
              UserInfo.setUserInfo({});
              localStorage.clear();
              localStorage.setItem(
                "cookies_accepted",
                JSON.stringify({ total: false, auth: false, main: true })
              );
            }}
          >
            {SetNativeTranslate(Translate.language, {}, "sign_out")}
          </div>
        ) : (
          <div className="nav_bar_item" onClick={() => setModalActive1(true)}>
            {SetNativeTranslate(Translate.language, {}, "sign_in")}
          </div>
        )}

        <div
          className="nav_bar_theme_icon"
          onClick={() => {
            if (Setting.app_theme === "dark") {
              Setting.setAppTheme("light");
              if (user && user.isAuth) {
                State.setUserStateField(
                  "light",
                  "app_theme",
                  UserInfo.userInfo.id
                );
              }
            } else {
              Setting.setAppTheme("dark");
              if (user && user.isAuth) {
                State.setUserStateField(
                  "dark",
                  "app_theme",
                  UserInfo.userInfo.id
                );
              }
            }
          }}
        >
          {Setting.app_theme === "light" ? (
            <img src={dark_mode} className="nav_bar_theme_icon" />
          ) : (
            <img src={light_mode} className="nav_bar_theme_icon" />
          )}
        </div>

        {location.pathname !== "/board" && (
          <Link to={`/board`}>
            <div className="nav_bar_theme_icon">
              <img
                className="nav_bar_theme_icon"
                src={Setting.app_theme === "light" ? board : board_dark}
              ></img>
            </div>
          </Link>
        )}

        {!user.isAuth && (
          <ShareComponent
            parent={location.pathname === "/board" ? "nav_board" : ""}
          />
        )}

        <LanguageSwitcher />

        <div
          className={!user.isAuth ? "nav_bar_item" : "nav_bar_item disabled"}
          disabled={user.isAuth}
          onClick={() => {
            if (!modalActive && !user.isAuth) {
              setModalActive(true);
              setName(
                SetNativeTranslate(Translate.language, {
                  russian: ["Выберите страну из списка"],
                  english: ["Select your country"],
                  spanish: ["Selecciona tu pais"],
                  turkish: ["Ülkeni seç"],
                  сhinese: ["从列表中选择一个国家"],
                  hindi: ["सूची से एक देश चुनें"],
                })
              );
            } else if (modalActive) {
              setModalActive(false);
            }
          }}
        >
          {Translate.language &&
            SetNativeTranslate(Translate.language, {}, Adress.country.value)}
        </div>

        <NavBarCaptureElement />
      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <CountrySelector name={name} setModalActive={setModalActive} />
      </Modal>
    </>
  );
});

export default NavBar;
