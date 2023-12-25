//@ts-nocheck
import { SetNativeTranslate } from '../../../../modules/SetNativeTranslate';
import {TranslateContext} from "../../../..";
import { useContext } from 'react';

export const useOrderFormTranslate = () => {
  const { Translate } = useContext(TranslateContext);

  const Edited = SetNativeTranslate(
    Translate.language,
    {},
    "edited"
  ).toLowerCase();
  const Order = SetNativeTranslate(Translate.language, {}, "order");
  const Auction = SetNativeTranslate(Translate.language, {}, "auction");
  const order_editing_canceled = SetNativeTranslate(
    Translate.language,
    {},
    "order_editing_canceled"
  );
  const auction_editing_canceled = SetNativeTranslate(
    Translate.language,
    {},
    "auction_editing_canceled"
  );
  const you_can_change_subscription = SetNativeTranslate(
    Translate.language,
    {},
    "you_can_change_subscription"
  );
  const point_limit = SetNativeTranslate(Translate.language, {}, "point_limit");
  const created_and_postponed = SetNativeTranslate(
    Translate.language,
    {},
    "created_and_postponed"
  );
  const created_and_send = SetNativeTranslate(
    Translate.language,
    {},
    "created_and_send"
  );
  const Template = SetNativeTranslate(Translate.language, {}, "template");
  const Created = SetNativeTranslate(
    Translate.language,
    {},
    "created"
  ).toLowerCase();
  const comment_cant_be_empty = SetNativeTranslate(
    Translate.language,
    {},
    "comment_cant_be_empty"
  );
  const comment_cannot_be_shorter = SetNativeTranslate(
    Translate.language,
    {},
    "comment_cannot_be_shorter"
  );
  const comment_cannot_be_longer = SetNativeTranslate(
    Translate.language,
    {},
    "comment_cannot_be_longer"
  );
  const arrival_time = SetNativeTranslate(
    Translate.language,
    {},
    "arrival_time"
  );
  const finish_time = SetNativeTranslate(Translate.language, {}, "finish_time");
  const symbols = SetNativeTranslate(Translate.language, {}, "symbols");
  const select_adress = SetNativeTranslate(
    Translate.language,
    {},
    "select_adress"
  ); 

  return {
    Edited,
    Order,
    Auction,
    order_editing_canceled,
    auction_editing_canceled,
    you_can_change_subscription,
    point_limit,
    created_and_postponed,
    created_and_send,
    Template,
    Created,  
    comment_cant_be_empty,
    comment_cannot_be_shorter,
    comment_cannot_be_longer,
    arrival_time,
    finish_time,
    symbols,
    select_adress
  };
};
