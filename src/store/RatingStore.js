import { makeAutoObservable } from "mobx";

export default class RatingStore {
  constructor() {
    this._order_ratings = [];
    this._order_rating = {};

    this._other_ratings = [];
    this._other_rating = {};

    this._user_info_ratings = [];
    this._user_info_rating = {};

    makeAutoObservable(this);
  }

  setOrderRatings(order_ratings) {
    this._order_ratings = order_ratings;
  }

  setOrderRating(order_rating) {
    this._order_rating = order_rating;
  }

  setOtherRatings(other_ratings) {
    this._other_ratings = other_ratings;
  }

  setOtherRating(other_rating) {
    this._other_rating = other_rating;
  }

  setUserInfoRatings(user_info_ratings) {
    this._user_info_ratings = user_info_ratings;
  }

  setUserInfoRating(user_info_rating) {
    this._user_info_rating = user_info_rating;
  }

  get orderRatings() {
    return this._order_ratings;
  }

  get orderRating() {
    return this._order_rating;
  }

  get otherRatings() {
    return this._other_ratings;
  }

  get otherRating() {
    return this._other_rating;
  }

  get userInfoRatings() {
    return this._user_info_ratings;
  }

  get userInfoRating() {
    return this._user_info_rating;
  }
}
