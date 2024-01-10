import { observer } from "mobx-react-lite";
import React from "react";
import { Input } from "../../../../ui/form/Input";
import { FieldName } from "../../../../ui/page/FieldName";
import "../../../../ui/form/Form.css";
import "../../../Order.css";
import { SetNativeTranslate } from "../../../../../modules/SetNativeTranslate";
import AdressHistory from "../../../../history/AdressHistory";

import repeat from "../../../../../assets/icons/repeat.png";
import repeat_dark from "../../../../../assets/icons/repeat_dark.png";
import close from "../../../../../assets/icons/close.png";
import close_dark from "../../../../../assets/icons/close_dark.png";
import arrow_up from "../../../../../assets/icons/arrow_up.png";
import arrow_up_dark from "../../../../../assets/icons/arrow_up_dark.png";
import arrow_down from "../../../../../assets/icons/arrow_down.png";
import arrow_down_dark from "../../../../../assets/icons/arrow_down_dark.png";
import add from "../../../../../assets/icons/add.png";
import add_dark from "../../../../../assets/icons/add_dark.png";
import { calculateTime } from "../../functions/pointFunctions";
import { useOrderFormPointItem } from "./hooks/useOrderFormPointItem";

const OrderFormPointItem = observer(
  ({
    pointFormData,
    formData,
    addField,
    setPointFormData,
    pointItem,
    index,
    dragStartHandler,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    handleFormChange,
    handleFormBlur,
    removeField,
    setCalculate,
    move_up,
    move_down,
    setCurrentPoint,
  }) => {
    const {
      UserInfo,
      Setting,
      Translate,
      Adress,
      showHistory,
      setShowHistory,
      State,
      setCustomInput,
      selectFromHistoryAction,
      dataReset,
    } = useOrderFormPointItem(
      setPointFormData,
      pointFormData,
      setCalculate,
      pointItem,
      index
    );

    return (
      <div
        className={
          Setting.app_theme === "light"
            ? "point_container"
            : "point_container point_container_dark"
        }
        onDragStart={(e) => dragStartHandler(e, pointItem)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, pointItem)}
        draggable={true}
        key={index}
      >
        <div className="point_fields_container">
          <div className="point_field_container" style={{ gap: "0px" }}>
            <div className="input_row">
              <Input
                id={pointItem.id}
                name="point"
                defaultValue={pointItem.point.value}
                placeholder={SetNativeTranslate(Translate.language, {
                  russian: ["Введите улицу и номер дома"],
                  english: ["Enter street and house number"],
                  spanish: [
                    "Introduzca la calle y el número de casa",
                  ],
                  turkish: ["Sokak ve ev numarasını girin"],
                  сhinese: ["输入街道和门牌号"],
                  hindi: ["सड़क और मकान नंबर दर्ज करें"],
                })}
                onChange={(e) => {
                  if (pointFormData[index].value !== "") {
                    dataReset(e);
                  }
                }}
                onBlur={(event) => {
                  handleFormBlur(index, event);
                }}
                onClick={() => {
                  setShowHistory(false);
                }}
                style={{
                  borderLeft: pointItem.point.isEmptyError
                    ? " solid 1px rgb(254, 111, 103,0.8)"
                    : "",
                }}
              ></Input>
            </div>

            <AdressHistory
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              selectFromHistoryAction={selectFromHistoryAction}
              setCustomInput={setCustomInput}
            />
            <FieldName
              style={{
                fontWeight: "normal",
                color: "rgb(254, 111, 103,0.8)",
              }}
            >
              {pointItem.point.isDirty && pointItem.point.isEmptyError
                ? pointItem.point.errorMessage
                : ""}
            </FieldName>
          </div>
          <div className="point_field_container" style={{ gap: "0px" }}>
            <div className="input_row">
              <Input
                name="customer_comment"
                placeholder={SetNativeTranslate(
                  Translate.language,
                  {},
                  "comment"
                )}
                defaultValue={pointItem.customer_comment.value}
                onChange={(event) => handleFormChange(index, event)}
                onBlur={(event) => handleFormBlur(index, event)}
              ></Input>
            </div>
            <FieldName
              style={{
                fontWeight: "normal",
                color: "rgb(254, 111, 103,0.8)",
              }}
            >
              {!pointItem.customer_comment.isEmptyError &&
              (pointItem.customer_comment.minLengthError ||
                pointItem.customer_comment.maxLengthError)
                ? pointItem.customer_comment.errorMessage
                : ""}
            </FieldName>
          </div>

          <div className="point_field_container" style={{ gap: "0px" }}>
            <div className="input_row">
              <Input
                name="time"
                placeholder={SetNativeTranslate(Translate.language, {}, "time")}
                type="datetime-local"
                value={pointItem.time.value}
                onChange={(event) => handleFormChange(index, event)}
                onBlur={(event) => handleFormBlur(index, event)}
                style={{
                  borderLeft: pointItem.time.isEmptyError
                    ? " solid 1px rgb(254, 111, 103,0.8)"
                    : "",
                  minWidth: "100px",
                }}
              ></Input>

              <div className="now_container">
                {pointItem.sequence === 1 &&
                pointFormData.find((el) => el.time.isDirty) ? (
                  <img
                    className={"order_action_icon"}
                    src={Setting.app_theme === "light" ? repeat : repeat_dark}
                    alt="now"
                    onClick={() => {
                      calculateTime(
                        false,
                        false,
                        false,
                        "now",
                        pointFormData,
                        setPointFormData
                      );
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className="change_time_buttons_container">
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      600,
                      pointItem.sequence,
                      "increase",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  +10m
                </div>
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      3600,
                      pointItem.sequence,
                      "increase",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  +1h
                </div>
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      86400,
                      pointItem.sequence,
                      "increase",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  +1d
                </div>
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      600,
                      pointItem.sequence,
                      "decrease",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  -10m
                </div>
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      3600,
                      pointItem.sequence,
                      "decrease",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  -1h
                </div>
                <div
                  className="change_time_button"
                  onClick={() => {
                    calculateTime(
                      JSON.parse(
                        formData.direction_responce
                          ? formData.direction_responce
                          : false
                      ),
                      86400,
                      pointItem.sequence,
                      "decrease",
                      pointFormData,
                      setPointFormData
                    );
                  }}
                >
                  -1d
                </div>
              </div>
            </div>
            <FieldName
              style={{
                fontWeight: "normal",
                color: "rgb(254, 111, 103,0.8)",
              }}
            >
              {pointItem.time.isEmptyError ? pointItem.time.errorMessage : ""}
            </FieldName>
          </div>
        </div>

        <div className="point_action_buttons_container">
          {pointFormData.length > 2 ? (
            <img
              className={"order_action_icon"}
              src={Setting.app_theme === "light" ? close : close_dark}
              onClick={() => {
                removeField(pointItem);
              }}
            />
          ) : (
            <></>
          )}

          {pointItem.sequence !== 1 ? (
            <img
              className={"order_action_icon"}
              src={Setting.app_theme === "light" ? arrow_up : arrow_up_dark}
              onClick={() => {
                setCurrentPoint(pointItem);
                move_up(pointItem);
              }}
            />
          ) : (
            <></>
          )}

          {pointItem.sequence !== 50 ? (
            <img
              className={"order_action_icon"}
              src={Setting.app_theme === "light" ? arrow_down : arrow_down_dark}
              onClick={() => {
                setCurrentPoint(pointItem);
                move_down(pointItem);
              }}
            />
          ) : (
            <></>
          )}
          {pointFormData.length !== 50 ? (
            <img
              className={"order_action_icon"}
              src={Setting.app_theme === "light" ? add : add_dark}
              onClick={() => {
                addField(pointItem);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);

export default OrderFormPointItem;
