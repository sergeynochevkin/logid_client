//@ts-nocheck
import {
  ComponentFunctionContext,
  OrderContext,
  TranslateContext,
  UserContext,
  UserInfoContext,
  PointContext,
  FetcherContext,
  NotificationContext,
  LimitContext,
} from "../../../..";
import { useContext, useEffect, useState } from "react";
import { setTime } from "../../../../modules/setTime";
import { useInput } from "../../../../hooks/useInput";
import { SetNativeTranslate } from "../../../../modules/SetNativeTranslate";
import { v4 } from "uuid";
import { createOrder } from "../../../../http/orderApi";
import { uploadFiles } from "../../../../http/fileApi";
import { editOrder } from "../../../../http/orderApi";
import { sendMail } from "../../../../http/mailApi";
import { useFiles } from "./useFiles";
import { useOrderFormTranslate } from "./useOrderFormTranslate";
import { fetchUserInfo } from "../../../../http/userInfoApi";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE, MAIN_ORDER_ROUTE } from '../../../../utils/consts';

export const useOrderFormFormData = () => {
  const { order } = useContext(OrderContext);
  const { ComponentFunction } = useContext(ComponentFunctionContext);
  const { Translate } = useContext(TranslateContext);
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { Point } = useContext(PointContext);
  const { fetcher } = useContext(FetcherContext);
  const { Notification } = useContext(NotificationContext);
  const [calculate, setCalculate] = useState<boolean>(false);
  const { Limit } = useContext(LimitContext);
  const [modalActive1, setModalActive1] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  const from_value = queryParams.get("from_value");
  const to_value = queryParams.get("to_value");
  const from_lat = queryParams.get("from_lat");
  const to_lat = queryParams.get("to_lat");
  const from_lng = queryParams.get("from_lng");
  const to_lng = queryParams.get("to_lng");
  const type = queryParams.get("type");
  const navigate = useNavigate();

  const [pointsNotValid, setPointsNotValid] = useState<boolean>(false);
  const [timeNotValid, setTimeNotValid] = useState<boolean>(false);
  const [commentsNotValid, setCommentsNotValid] = useState<boolean>(false);
  const { files, setFiles, pairs, setPairs, dataInit } = useFiles();
  const {
    created_and_postponed,
    created_and_send,
    Template,
    Created,
    Edited,
    Order,
    Auction,
    you_can_change_subscription,
    point_limit,
    comment_cant_be_empty,
    comment_cannot_be_shorter,
    comment_cannot_be_longer,
    arrival_time,
    finish_time,
    symbols,
    select_adress,
  } = useOrderFormTranslate();

  const initialValue = {
    order_comment: "",
    cost: undefined,
    mileage: undefined,
    carrierId: undefined,
    order_status: "",
    final_status: "",
    userId: undefined,
    country: "",
    city: "",
    type: "",
    load_capacity: "",
    side_type: "",
    thermo_bag: false,
    hydraulic_platform: false,
    side_loading: false,
    glass_stand: false,
    refrigerator_minus: false,
    refrigerator_plus: false,
    thermo_van: false,
    order_type: "",
    userInfoId: undefined,
    pointsIntegrationId: "",
    option: "new",
    files: "",
    for_partner: undefined,
    for_group: undefined,
    direction_response: JSON.stringify([]),
    for_who: undefined,
  };

  const initialTime = new Date();

  const pointInitialValue = [
    {
      id: 1,
      sequence: 1,
      point: {
        value: "",
        isDirty: false,
        isEmptyError: true,
        errorMessage: "",
      },
      latitude: undefined,
      longitude: undefined,
      time: {
        value: setTime(initialTime, 60, "form"),
        isDirty: false,
        isEmptyError: false,
        errorMessage: "",
      },
      status: "new",
      name: "",
      customer_comment: {
        value: "",
        isDirty: false,
        minLengthError: false,
        maxLengthError: false,
        isEmptyError: true,
        errorMessage: "",
      },
      carrier_comment: "",
      services: "",
      updated_by: undefined,
      orderIntegrationId: "",
      city: "",
    },
    {
      id: 2,
      sequence: 50,
      point: {
        value: "",
        isDirty: false,
        isEmptyError: true,
        errorMessage: "",
      },
      latitude: undefined,
      longitude: undefined,
      time: {
        value: setTime(initialTime, 90, "form"),
        isDirty: false,
        isEmptyError: false,
        errorMessage: "",
      },
      status: "new",
      name: "",
      customer_comment: {
        value: "",
        isDirty: false,
        minLengthError: false,
        maxLengthError: false,
        isEmptyError: true,
        errorMessage: "",
      },
      carrier_comment: "",
      services: "",
      updated_by: undefined,
      orderIntegrationId: "",
      city: "",
    },
  ];

  pointInitialValue[0].orderIntegrationId = order.integrationId;
  pointInitialValue[1].orderIntegrationId = order.integrationId;

  let orderPattern;
  let pointPatternInitialValue = [];
  let pointPattern;
  
  
  if (ComponentFunction.orderFormFunction !== "newOrder") {
    orderPattern = JSON.parse(order.pattern);
    orderPattern.for_who = {
      value: orderPattern.for_group
        ? "group"
        : orderPattern.for_partner
        ? "partner"
        : "all",
      notValid: false,
    };
    orderPattern.for_group = {
      value: orderPattern.for_group ? orderPattern.for_group : undefined,
      notValid: false,
    };
    orderPattern.for_partner = {
      value: orderPattern.for_partner ? orderPattern.for_partner : undefined,
      notValid: false,
    };
    orderPattern.order_comment = {
      value: orderPattern.order_comment,
      isDirty: false,
      notValid: false,
    };
    orderPattern.cost = {
      value: orderPattern.cost,
      isDirty: false,
      notValid: false,
    };
    orderPattern.final_status = undefined;
    orderPattern.order_status = "new";
    orderPattern.final_status = "";
    orderPattern.type = { value: orderPattern.type, isDirty: false };
    orderPattern.load_capacity = {
      value: orderPattern.load_capacity,
      isDirty: false,
    };
    orderPattern.side_type = { value: orderPattern.side_type, isDirty: false };
    orderPattern.order_type = {
      value: orderPattern.order_type,
      isDirty: false,
      notValid: false,
    };
    orderPattern.oldPointsId = orderPattern.pointsIntegrationId;
    orderPattern.pointsIntegrationId = "";
    orderPattern.customer_arc_status = "";
    orderPattern.carrier_arc_status = "";
    orderPattern.order_final_status = "";
    orderPattern.updated_by_role = "";

    pointPattern = JSON.parse(Point.pattern);
    for (const point of pointPattern) {      
      point.point = { value: point.point, isDirty: false, isEmptyError: false };
      point.time = {
        value:
          point.sequence === 1
            ? setTime(initialTime, 60, "form")
            : setTime(initialTime, 90, "form"),
        isDirty: false,
        isEmptyError: false,
        errorMessage: "",
      };
      point.status = "new";
      point.customer_comment = {
        value: point.customer_comment,
        isDirty: false,
        minLengthError: false,
        maxLengthError: false,
        isEmptyError: true,
        errorMessage: "",
      };
      point.carrier_comment = "";
      point.updated_by = undefined;
      point.orderIntegrationId = order.integrationId;
      pointPatternInitialValue.push(point);
    }
  }

  const [formData, setFormData] = useState(
    localStorage.getItem("orderFormData")
      ? JSON.parse(localStorage.getItem("orderFormData"))
      : ComponentFunction.orderFormFunction === "newOrder"
      ? initialValue
      : orderPattern
  );

  const validCost = /^\d+$/;
  formData.cost = useInput(
    ComponentFunction.orderFormFunction === "newOrder"
      ? ""
      : orderPattern.cost.value !== 0
      ? orderPattern.cost.value
      : "",
    { isEmpty: true, minLength: 2, maxLength: 6, validFormat: validCost },
    SetNativeTranslate(Translate.language, {}, "cost").toLowerCase()
  );
  formData.order_comment = useInput(
    ComponentFunction.orderFormFunction === "newOrder"
      ? ""
      : orderPattern.order_comment.value,
    { isEmpty: true, minLength: 6, maxLength: 200 },
    SetNativeTranslate(Translate.language, {}, "comment").toLowerCase()
  );
  formData.order_type = useInput(
    location.pathname === MAIN_ORDER_ROUTE
      ? "order"
      : ComponentFunction.orderFormFunction === "newOrder"
      ? ""
      : orderPattern.order_type.value,
    { isEmpty: true }
  );

  formData.load_capacity = useInput(
    ComponentFunction.orderFormFunction === "newOrder" ||
      parent === "fast_sign_up"
      ? ""
      : orderPattern.load_capacity.value,
    { isEmpty: true }
  );
  formData.side_type = useInput(
    ComponentFunction.orderFormFunction === "newOrder" ||
      parent === "fast_sign_up"
      ? ""
      : orderPattern.side_type.value,
    { isEmpty: true }
  );
  formData.type = useInput(
    type
      ? type
      : ComponentFunction.orderFormFunction === "newOrder" ||
        parent === "fast_sign_up"
      ? ""
      : orderPattern.type.value,
    { isEmpty: true }
  );

  formData.for_group = useInput(
    ComponentFunction.orderFormFunction === "newOrder"
      ? undefined
      : orderPattern.for_group.value,
    { isEmpty: true }
  );
  formData.for_partner = useInput(
    ComponentFunction.orderFormFunction === "newOrder"
      ? undefined
      : orderPattern.for_partner.value,
    { isEmpty: true }
  );
  formData.for_who = useInput(
    ComponentFunction.orderFormFunction === "newOrder"
      ? "all"
      : orderPattern.for_who.value,
    { isEmpty: true }
  );

  formData.userId = user.user.id;
  formData.country = UserInfo.userInfo.country;
  formData.city = UserInfo.userInfo.city;
  formData.userInfoId = UserInfo.userInfo.id;
  formData.pointsIntegrationId = order.integrationId;

  const [pointFormData, setPointFormData] = useState(
    from_lat
      ? pointInitialValue
      : localStorage.getItem("pointFormData")
      ? JSON.parse(localStorage.getItem("pointFormData"))
      : ComponentFunction.orderFormFunction === "newOrder"
      ? pointInitialValue
      : pointPatternInitialValue
  );  

  console.log(JSON.stringify(pointPatternInitialValue));
  

  useEffect(() => {
    if (from_value) {
      let data = [...pointFormData];
      data[0].point.value = from_value;
      data[0].longitude = from_lng;
      data[0].latitude = from_lat;
      data[1].point.value = to_value;
      data[1].longitude = to_lng;
      data[1].latitude = to_lat;
      setPointFormData(data);
    }
  }, []);

  useEffect(() => {
    if (
      pointFormData.filter((el) => el.point.isEmptyError === true).length > 0
    ) {
      setPointsNotValid(true);
    }
    if (
      pointFormData.filter((el) => el.time.isEmptyError === true).length > 0
    ) {
      setTimeNotValid(true);
    }
    if (
      pointFormData.filter((el) => el.customer_comment.minLengthError === true)
        .length > 0 ||
      pointFormData.filter((el) => el.customer_comment.maxLengthError === true)
        .length > 0
    ) {
      setCommentsNotValid(true);
    }
  }, []);

  useEffect(() => {
    let pointValidations = { minLength: 5, maxLength: 100, isEmpty: false };
    let customerCommentValidations = {
      minLength: 5,
      maxLength: 70,
      isEmpty: false,
    };
    let timeValidations = { isEmpty: false };
    let maxSequence = Math.max(...pointFormData.map((el) => el.sequence));

    for (const point of pointFormData) {
      if (!point.point.value && pointValidations.isEmpty === false) {
        point.point.isEmptyError = true;
        point.point.errorMessage = select_adress.toLowerCase();
      } else {
        point.point.isEmptyError = false;
      }
      if (
        !point.customer_comment.value &&
        customerCommentValidations.isEmpty === false
      ) {
        point.customer_comment.isEmptyError = true;
        point.customer_comment.errorMessage = comment_cant_be_empty;
      } else {
        point.customer_comment.isEmptyError = false;
        if (point.customer_comment.value.length < pointValidations.minLength) {
          point.customer_comment.minLengthError = true;
          point.customer_comment.errorMessage = `${comment_cannot_be_shorter} ${customerCommentValidations.minLength} ${symbols}`;
        } else {
          point.customer_comment.minLengthError = false;
          if (
            point.customer_comment.value.length > pointValidations.maxLength
          ) {
            point.customer_comment.maxLengthError = true;
            point.customer_comment.errorMessage = `${comment_cannot_be_longer} ${customerCommentValidations.maxLength} ${symbols}`;
          } else {
            point.point.maxLengthError = false;
          }
        }
      }
      if (!point.time.value && timeValidations.isEmpty === false) {
        point.time.isEmptyError = true;
        point.time.errorMessage = `${
          point.sequence === 1
            ? arrival_time
            : point.sequence === maxSequence
            ? finish_time
            : ""
        }`;
      } else {
        point.time.isEmptyError = false;
      }
    }
    if (
      pointFormData.filter((el) => el.point.isEmptyError === true).length > 0 ||
      pointFormData.filter((el) => el.point.minLengthError === true).length >
        0 ||
      pointFormData.filter((el) => el.point.maxLengthError === true).length > 0
    ) {
      setPointsNotValid(true);
    } else {
      setPointsNotValid(false);
    }

    if (
      pointFormData.filter((el) => el.time.isEmptyError === true).length > 0
    ) {
      setTimeNotValid(true);
    } else {
      setTimeNotValid(false);
    }

    if (
      pointFormData.filter((el) => el.customer_comment.minLengthError === true)
        .length > 0 ||
      pointFormData.filter((el) => el.customer_comment.maxLengthError === true)
        .length > 0
    ) {
      setCommentsNotValid(true);
    } else {
      setCommentsNotValid(false);
    }
  }, [pointFormData]);

  const boost = (id) => {
    order.setDividedOrders(
      [
        ...order.divided_orders[formData.order_status].filter(
          (el) => el.id !== id
        ),
      ],
      formData.order_status
    );
    order.setTotalCount(
      order.totalCount[formData.order_status] - 1,
      formData.order_status
    );
    order.setFilteredCount(
      order.filtered_count[formData.order_status] - 1,
      formData.order_status
    );
  };

  const afterAction = (option) => {
    if (option === "edit") {
      boost(formData.id);
      ComponentFunction.setOrderFormFunction("newOrder");
      ComponentFunction.setOrdersComponentFunction("orderList");
      ComponentFunction.setPageFunction("orderList");
    } else {
      ComponentFunction.setFunction(formData.order_status);
      ComponentFunction.setOrdersComponentFunction("orderList");
      ComponentFunction.setPageFunction("orderList");
    }
    fetcher.setCustomLoading(false);
    setFormData(initialValue);
    setPointFormData(pointInitialValue);
    order.setPairs([]);
    order.setFiles([]);
  };

  const registerAndSendOrder = async (registerAction) => {
    try {
      await registerAction().then((data) => {
        formData.userId = data.id;
      });
      const userInfo = await fetchUserInfo(formData.userId);
      formData.userInfoId = userInfo.id;
      formData.order_status = "new";
      click();
      navigate(USER_ROUTE);
    } catch (error) {
      console.log(error);
    }
  };

  const send = (event) => {
    event.preventDefault();
    if (location.pathname === MAIN_ORDER_ROUTE) {
      setModalActive1(true);
    } else if (ComponentFunction.orderFormFunction === "edit") {
      formData.order_status = "postponed";
      update();
    } else {
      formData.order_status = "new";
      click();
    }
  };

  const postpone = (event) => {
    event.preventDefault();
    formData.order_status = "postponed";
    click();
  };

  const pattern = (event) => {
    event.preventDefault();
    formData.order_status = "pattern";
    click();
  };

  const update = async () => {
    if (formData.cost.isEmpty) {
      formData.cost.value = 0;
    }
    try {
      fetcher.setCustomLoading(true);
      await editOrder(
        formData.id,
        formData.order_comment.value,
        formData.cost.value,
        formData.mileage,
        formData.estimated_time,
        formData.carrier,
        formData.order_status,
        formData.order_final_status,
        formData.country,
        formData.city,
        formData.type.value,
        formData.load_capacity.value,
        formData.side_type.value,
        formData.thermo_bag,
        formData.hydraulic_platform,
        formData.side_loading,
        formData.glass_stand,
        formData.refrigerator_minus,
        formData.refrigerator_plus,
        formData.thermo_van,
        formData.order_type.value,
        formData.pointsIntegrationId,
        formData.files,
        formData.for_partner.value ? formData.for_partner.value : undefined,
        formData.for_group.value ? formData.for_group.value : undefined,
        formData.oldPointsId,
        formData.direction_response,
        pointFormData
      ).then(
        uploadFiles(
          "order",
          formData.id,
          Translate.language,
          JSON.parse(orderPattern.files).length > 0 ? "update" : "create",
          dataInit(files)
        )
      );
      fetcher.setNewStatus("postponed");
      fetcher.setDividedOrders(true);
      Notification.addNotification([
        {
          id: v4(),
          type: "success",
          message:
            formData.order_type.value === "order"
              ? `${Order} ${formData.id} ${Edited}`
              : `${Auction} ${formData.id} ${Edited}`,
        },
      ]);
      afterAction("edit");
    } catch (e) {
      Notification.addNotification([
        { id: v4(), type: "error", message: e.response.data.message },
      ]);
      fetcher.setCustomLoading(false);
    }
  };

  const click = async () => {
    try {
      let orderId;
      order.setOrders([]);
      if (formData.cost.isEmpty) {
        formData.cost.value = 0;
      }

      fetcher.setCustomLoading(true);
      await createOrder(
        Translate.language,
        formData.order_comment.value,
        formData.cost.value,
        formData.mileage,
        formData.estimated_time,
        formData.carrier,
        formData.order_status,
        formData.order_final_status,
        formData.userId,
        formData.country,
        formData.city,
        formData.type.value,
        formData.load_capacity.value,
        formData.side_type.value,
        formData.thermo_bag,
        formData.hydraulic_platform,
        formData.side_loading,
        formData.glass_stand,
        formData.refrigerator_minus,
        formData.refrigerator_plus,
        formData.thermo_van,
        formData.order_type.value,
        formData.userInfoId,
        formData.pointsIntegrationId,
        formData.option,
        "",
        formData.files,
        formData.for_partner.value ? formData.for_partner.value : undefined,
        formData.for_group.value ? formData.for_group.value : undefined,
        formData.direction_response,
        pointFormData
      ).then((data) => {
        orderId = data.id;
        uploadFiles(
          "order",
          data.id,
          Translate.language,
          "create",
          dataInit(files)
        );
      });

      fetcher.setStatus(formData.order_status);
      fetcher.setCreate(true);
      if (formData.order_status === "new") {
        Notification.addNotification([
          {
            id: v4(),
            type: "success",
            message:
              formData.order_type.value === "order"
                ? `${Order} ${orderId} ${created_and_send}`
                : `${Auction} ${orderId} ${created_and_send}`,
          },
        ]);
        sendMail(Translate.language, user.user.role, orderId, "new_order", "");
      }
      if (formData.order_status === "postponed") {
        //fetch
        Notification.addNotification([
          {
            id: v4(),
            type: "success",
            message:
              formData.order_type.value === "order"
                ? `${Order} ${orderId} ${created_and_postponed}`
                : `${Auction} ${orderId} ${created_and_postponed}`,
          },
        ]);
      }
      if (formData.order_status === "pattern") {
        Notification.addNotification([
          {
            id: v4(),
            type: "success",
            message: `${Template} ${orderId} ${Created}`,
          },
        ]);
      }
      afterAction("");
    } catch (e) {
      Notification.addNotification([
        { id: v4(), type: "error", message: e.response.data.message },
      ]);
      fetcher.setCustomLoading(false);
    }
  };

  const [currentPoint, setCurrentPoint] = useState(undefined);

  function dragStartHandler(e, point) {
    setCurrentPoint(point);
  }
  function dragLeaveHandler(e) {
    e.target.style.background = "";
  }
  function dragEndHandler(e) {}
  function dragOverHandler(e) {
    e.preventDefault();
    if (!e.target.classList.contains("custom_input")) {
      e.target.style.background = "grey";
    }
  }
  function dropHandler(e, point) {
    e.preventDefault();
    setPointFormData(
      pointFormData.map((p) => {
        if (p.id === point.id) {
          return { ...p, sequence: currentPoint.sequence };
        }
        if (p.id === currentPoint.id) {
          return { ...p, sequence: point.sequence };
        }
        return p;
      })
    );
    setCalculate(true);
    e.target.style.background = "";
  }

  const sortPoints = (a, b) => {
    if (a.sequence > b.sequence) {
      return 1;
    } else {
      return -1;
    }
  };

  const handleFormChange = (index, event) => {
    let data = [...pointFormData];
    data[index][event.target.name].value = event.target.value;
    setPointFormData(data);
  };
  const handleFormBlur = (index, event) => {
    let data = [...pointFormData];
    data[index][event.target.name].isDirty = true;
    setPointFormData(data);
  };

  const addField = (pointItem) => {
    let newSequence = pointItem.sequence !== 50 ? pointItem.sequence + 1 : 50;
    let initialTime;
    if (
      pointFormData.length >= Limit.user_limits.customer_new_order_point_limit
    ) {
      Notification.addNotification([
        {
          id: v4(),
          type: "error",
          message: `${point_limit} ${Limit.user_limits.customer_new_order_point_limit}. ${you_can_change_subscription}`,
        },
      ]);
    } else {
      let idArray = pointFormData.map((el) => el.id);
      let maxId = Math.max(...idArray);
      let sequenceArray = pointFormData
        .filter((el) => el.sequence !== 50)
        .map((el) => el.sequence);
      let maxSequence = Math.max(...sequenceArray);
      let data = [...pointFormData];
      if (pointItem.sequence !== 50) {
        initialTime = new Date(pointItem.time.value);
        for (const point of data) {
          if (point.sequence > pointItem.sequence && point.sequence < 49) {
            point.sequence = point.sequence + 1;
          }
        }
        setPointFormData(data);
      } else {
        let pointForEdit = data.find((el) => el.sequence === 50);
        pointForEdit.sequence = maxSequence + 1;
        initialTime = new Date(pointForEdit.time.value);
        let cleanData = data.filter((el) => el.sequence !== pointItem.sequence);
        setPointFormData([...cleanData, pointForEdit]);
      }
      let newField = {
        id: maxId + 1,
        point: {
          value: "",
          isDirty: false,
          isEmptyError: true,
          errorMessage: "",
        },
        latitude: undefined,
        longitude: undefined,
        time: {
          value: setTime(initialTime, 0, "form"),
          isDirty: false,
          isEmptyError: false,
          errorMessage: "",
        },
        status: "new",
        sequence: newSequence,
        name: "",
        customer_comment: {
          value: "",
          isDirty: false,
          minLengthError: false,
          maxLengthError: false,
          isEmptyError: true,
          errorMessage: "",
        },
        carrier_comment: "",
        services: "",
        updated_by: undefined,
        orderIntegrationId: order.integrationId,
        city: "",
      };
      setPointFormData([...pointFormData, newField]);
    }
  };

  const removeField = (pointItem) => {
    if (pointItem.sequence !== 50) {
      let data = [
        ...pointFormData.filter((el) => el.sequence !== pointItem.sequence),
      ];
      for (const point of data) {
        if (point.sequence > pointItem.sequence && point.sequence !== 50) {
          point.sequence = point.sequence - 1;
        }
      }
      setPointFormData(data);
    } else {
      let sequenceArray = pointFormData
        .filter((el) => el.sequence !== 50)
        .map((el) => el.sequence);
      let maxSequence = Math.max(...sequenceArray);
      let pointForEdit = pointFormData.find(
        (el) => el.sequence === maxSequence
      );
      pointForEdit.sequence = 50;
      let data = [
        ...pointFormData.filter((el) => el.sequence !== pointItem.sequence),
      ];
      setPointFormData([...data, pointForEdit]);
    }
    setCalculate(true);
  };

  function move_up(pointItem) {
    let data = [...pointFormData];
    let pointForUp;
    let pointForDown;
    if (pointItem.sequence !== 50) {
      pointForUp = { ...pointItem };
      pointForDown = pointFormData.find(
        (el) => el.sequence === pointItem.sequence - 1
      );
      pointForUp.sequence = pointForUp.sequence - 1;
      pointForDown.sequence = pointForDown.sequence + 1;
    } else {
      let sequenceArray = pointFormData
        .filter((el) => el.sequence !== 50)
        .map((el) => el.sequence);
      let maxSequence = Math.max(...sequenceArray);
      pointForUp = { ...pointItem };
      pointForDown = pointFormData.find((el) => el.sequence === maxSequence);
      pointForUp.sequence = maxSequence;
      pointForDown.sequence = 50;
    }
    let cleanData = data.filter(
      (el) => el.id !== pointForUp.id && el.id !== pointForDown.id
    );
    setPointFormData([...cleanData, pointForUp, pointForDown]);
    setCalculate(true);
  }

  function move_down(pointItem) {
    let sequenceArray = pointFormData
      .filter((el) => el.sequence !== 50)
      .map((el) => el.sequence);
    let maxSequence = Math.max(...sequenceArray);
    let data = [...pointFormData];
    let pointForUp;
    let pointForDown;
    if (pointItem.sequence !== maxSequence) {
      pointForUp = pointFormData.find(
        (el) => el.sequence === pointItem.sequence + 1
      );
      pointForDown = { ...pointItem };
      pointForUp.sequence = pointForUp.sequence - 1;
      pointForDown.sequence = pointForDown.sequence + 1;
    } else {
      pointForUp = pointFormData.find((el) => el.sequence === 50);
      pointForDown = { ...pointItem };
      pointForUp.sequence = maxSequence;
      pointForDown.sequence = 50;
    }
    let cleanData = data.filter(
      (el) => el.id !== pointForUp.id && el.id !== pointForDown.id
    );
    setPointFormData([...cleanData, pointForUp, pointForDown]);
    setCalculate(true);
  }

  useEffect(() => {
    localStorage.setItem("orderFormData", JSON.stringify(formData));
  }, [
    formData.order_comment,
    formData.cost,
    formData.for_partner,
    formData.for_group,
    formData.order_type,
  ]);

  useEffect(() => {
    localStorage.setItem("pointFormData", JSON.stringify(pointFormData));
  }, [pointFormData]);

  return {
    initialValue,
    pointInitialValue,
    orderPattern,
    pointPatternInitialValue,
    formData,
    setFormData,
    pointFormData,
    setPointFormData,
    pointsNotValid,
    setPointsNotValid,
    timeNotValid,
    setTimeNotValid,
    commentsNotValid,
    setCommentsNotValid,
    boost,
    afterAction,
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
    Notification,
    modalActive1,
    setModalActive1,
    registerAndSendOrder,
  };
};
