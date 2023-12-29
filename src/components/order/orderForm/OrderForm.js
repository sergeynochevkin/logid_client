import React from "react";
import { Button } from "../../ui/button/Button";
import { observer } from "mobx-react-lite";
import OrderComment from "./OrderComment";
import OrderType from "./OrderType";
import Cost from "./Cost";
import { v4 } from "uuid";
import DragDropUpload from "../../dragDropUpload/DragDropUpload";
import OrderForWho from "./OrderForWho";
import TransportFormSection from "../../transport/TransportFormSection";
import MapComponent from "../../map/MapComponent";
import OrderFormPointItem from "./components/orderFormPointItem/OrderFormPointItem";
import { SetNativeTranslate } from "../../../modules/SetNativeTranslate";
import { useOrderForm } from "./hooks/useOrderForm";
import { useOrderFormTranslate } from "./hooks/useOrderFormTranslate";
import classes from "./OrderForm.module.sass";
import { useOrderFormFormData } from "./hooks/useOrderFormFormData";
import { MAIN_ORDER_ROUTE } from "../../../utils/consts";
import ReCAPTCHA from "react-google-recaptcha";

const OrderForm = observer(({ setModalActive }) => {
  const {
    pointInitialValue,
    orderPattern,
    formData,
    setFormData,
    pointFormData,
    setPointFormData,
    timeNotValid,
    commentsNotValid,
    pointsNotValid,
    send,
    postpone,
    pattern,
    files,
    setFiles,
    pairs,
    setPairs,
    move_down,
    move_up,
    removeField,
    addField,
    handleFormBlur,
    handleFormChange,
    dragStartHandler,
    dragLeaveHandler,
    dragOverHandler,
    sortPoints,
    dropHandler,
    setCurrentPoint,
    dragEndHandler,
    calculate,
    setCalculate,
    Translate,
  } = useOrderFormFormData();

  const { order_editing_canceled, auction_editing_canceled } =
    useOrderFormTranslate();

  const {
    ComponentFunction,
    Partner,
    recommended,
    setRecommended,
    parent,
    location,
    onRecaptchaChange,
    reCapchaChecked
  } = useOrderForm(setModalActive);

  return (
    <div className={classes.Container}>
      <div className={classes.FormBlock}>
        {" "}
        <div className={classes.FormBlock}>
          {pointFormData.sort(sortPoints).map((pointItem, index) => (
            <OrderFormPointItem
              formData={formData}
              addField={addField}
              setCurrentPoint={setCurrentPoint}
              move_up={move_up}
              move_down={move_down}
              pointFormData={pointFormData}
              setPointFormData={setPointFormData}
              pointItem={pointItem}
              index={index}
              dragStartHandler={dragStartHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragEndHandler={dragEndHandler}
              dragOverHandler={dragOverHandler}
              dropHandler={dropHandler}
              handleFormChange={handleFormChange}
              handleFormBlur={handleFormBlur}
              removeField={removeField}
              key={pointItem.id}
              setCalculate={setCalculate}
            />
          ))}
        </div>
        <OrderComment formData={formData} setFormData={setFormData} />
        <TransportFormSection
          formData={formData}
          setFormData={setFormData}
          parent={parent}
          orderPattern={orderPattern}
          setCalculate={setCalculate}
        />
        <Cost
          formData={formData}
          setFormData={setFormData}
          setCalculate={setCalculate}
          recommended={recommended}
          setRecommended={setRecommended}
        />
        <OrderType formData={formData} setFormData={setFormData} />
        {Partner.partners.length > 0 && (
          <OrderForWho formData={formData} setFormData={setFormData} />
        )}
        <DragDropUpload
          formData={formData}
          setFormData={setFormData}
          length={5}
          extensions={["jpeg", "png", "jpg"]}
          files={files}
          pairs={pairs}
          setFiles={setFiles}
          setPairs={setPairs}
          min_length={0}
          parent={"orderForm"}
        ></DragDropUpload>
        <ReCAPTCHA
          sitekey="6LclICciAAAAALsvyUMJwZq8Rk2GJOL3YQqN4syk"
          onChange={onRecaptchaChange}
        />
        <div className={classes.ButtonsBlock}>
          <Button
            onClick={send}
            disabled={
              pointsNotValid ||
              commentsNotValid ||
              timeNotValid ||
              formData.order_type.isEmpty ||
              (formData.cost.notValid && !formData.cost.isEmpty) ||
              (formData.order_comment.notValid &&
                !formData.order_comment.isEmpty) ||
              (formData.for_who.value === "partner" &&
                formData.for_partner.isEmpty) ||
              (formData.for_who.value === "group" &&
                formData.for_group.isEmpty) ||
              formData.type.isEmpty ||
              (formData.load_capacity.isEmpty && formData.type === "truck") ||
              (formData.load_capacity.isEmpty && formData.type === "minibus") ||
              (formData.side_type.isEmpty && formData.type === "truck") ||
              (formData.cost.notValid && formData.order_type.value === "order") ||
              !reCapchaChecked && location.pathname === MAIN_ORDER_ROUTE 
            }
          >
            {ComponentFunction.orderFormFunction === "edit"
              ? SetNativeTranslate(Translate.language, {}, "save")
              : SetNativeTranslate(Translate.language, {}, "send")}
          </Button>
          {ComponentFunction.orderFormFunction === "edit" ? (
            <Button
              onClick={() => {
                ComponentFunction.setOrdersComponentFunction("orderList");
                ComponentFunction.setPageFunction("orderList");
                ComponentFunction.setOrderFormFunction("newOrder");
                Notification.addNotification([
                  {
                    id: v4(),
                    type: "error",
                    message:
                      formData.order_type.value === "order"
                        ? order_editing_canceled
                        : auction_editing_canceled,
                  },
                ]);
              }}
            >
              {SetNativeTranslate(Translate.language, {}, "close")}
            </Button>
          ) : (
            <></>
          )}

          {ComponentFunction.orderFormFunction !== "edit" &&
          location.pathname !== MAIN_ORDER_ROUTE ? (
            <Button
              onClick={postpone}
              disabled={
                pointsNotValid ||
                commentsNotValid ||
                timeNotValid ||
                formData.order_type.isEmpty ||
                (formData.cost.notValid && !formData.cost.isEmpty) ||
                (formData.order_comment.notValid &&
                  !formData.order_comment.isEmpty) ||
                (formData.for_who.value === "partner" &&
                  formData.for_partner.isEmpty) ||
                (formData.for_who.value === "group" &&
                  formData.for_group.isEmpty) ||
                formData.type.isEmpty ||
                (formData.load_capacity.isEmpty && formData.type === "truck") ||
                (formData.load_capacity.isEmpty &&
                  formData.type === "minibus") ||
                (formData.side_type.isEmpty && formData.type === "truck") ||
                (formData.cost.notValid &&
                  formData.order_type.value === "order")
              }
            >
              {SetNativeTranslate(Translate.language, {}, "postpone")}
            </Button>
          ) : (
            <></>
          )}
          {ComponentFunction.orderFormFunction !== "pattern" &&
          ComponentFunction.orderFormFunction !== "edit" &&
          location.pathname !== MAIN_ORDER_ROUTE ? (
            <Button
              onClick={pattern}
              disabled={
                pointsNotValid ||
                commentsNotValid ||
                timeNotValid ||
                formData.order_type.isEmpty ||
                (formData.cost.notValid && !formData.cost.isEmpty) ||
                (formData.order_comment.notValid &&
                  !formData.order_comment.isEmpty) ||
                (formData.for_who.value === "partner" &&
                  formData.for_partner.isEmpty) ||
                (formData.for_who.value === "group" &&
                  formData.for_group.isEmpty) ||
                formData.type.isEmpty ||
                (formData.load_capacity.isEmpty && formData.type === "truck") ||
                (formData.load_capacity.isEmpty &&
                  formData.type === "minibus") ||
                (formData.side_type.isEmpty && formData.type === "truck") ||
                (formData.cost.notValid &&
                  formData.order_type.value === "order")
              }
            >
              {SetNativeTranslate(Translate.language, {}, "create_template")}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <MapComponent
        setRecommended={setRecommended}
        calculate={calculate}
        setCalculate={setCalculate}
        pointsNotValid={pointsNotValid}
        pointFormData={pointFormData}
        formData={formData}
        setFormData={setFormData}
        setPointFormData={setPointFormData}
        pointInitialValue={pointInitialValue}
      />
    </div>
  );
});

export default OrderForm;
