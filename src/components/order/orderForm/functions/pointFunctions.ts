//@ts-nocheck
import { setTime } from '../../../../modules/setTime';

export const calculateTime = (
  results,
  timeGap,
  pointSequence,
  action,
  pointFormData,
  setPointFormData
) => {
  if (
    action === "calculate" &&
    !pointFormData.find((el) => el.time.isDirty && el.sequence !== 1)
  ) {
    let data = [...pointFormData];
    let initialTime = data.find((el) => el.sequence === 1).time.value;
    for (const point of data) {
      if (point.sequence !== 1) {
        let legIndex;
        if (data.length === 2) {
          legIndex = 0;
        } else if (point.sequence === 50) {
          let sequenceArray = data
            .filter((el) => el.sequence !== 50)
            .map((el) => el.sequence);
          let maxSequence = Math.max(...sequenceArray);
          legIndex = maxSequence - 1;
        } else {
          legIndex = point.sequence - 1;
        }
        point.time.value = new Date(initialTime);
        point.time.value.setSeconds(
          point.time.value.getSeconds() +
            results.routes[0].legs[legIndex].duration.value
        );
        initialTime = new Date(initialTime);
        initialTime.setSeconds(
          point.time.value.getSeconds() +
            results.routes[0].legs[legIndex].duration.value
        );
        point.time.value = setTime(new Date(point.time.value), 0, "form");
      }
      point.point.isDirty = false;
    }
    setPointFormData(data);
  }
  if (action === "increase" || action === "decrease") {
    let data = [...pointFormData];
    let pointForEdit = data.find((el) => el.sequence === pointSequence);
    let cleanData = data.filter((el) => el.sequence !== pointSequence);

    let time = new Date(pointForEdit.time.value);
    time.setSeconds(
      action === "increase"
        ? time.getSeconds() + timeGap
        : time.getSeconds() - timeGap
    );
    pointForEdit.time.value = setTime(new Date(time), 0, "form");
    pointForEdit.time.isDirty = true;
    setPointFormData([...cleanData, pointForEdit]);
  }

  if (action === "now") {
    let data = [...pointFormData];
    let cleanData = data.filter((el) => el.sequence !== 1);
    let pointForEdit = data.find((el) => el.sequence === 1);
    pointForEdit.time.isDirty = false;

    if (!pointFormData.find((el) => el.point.isEmptyError)) {
      for (const point of cleanData) {
        point.time.isDirty = false;
      }
      setPointFormData([...cleanData, pointForEdit]);
      setCalculate(true);
    } else {
      cleanData = [...cleanData.sort(sortPoints)];
      let initialTime = new Date(pointForEdit.time.value);
      for (const point of cleanData) {
        let time = initialTime.setSeconds(initialTime.getSeconds() + 1800);
        point.time.value = setTime(new Date(time), 0, "form");
        point.time.isDirty = false;
        initialTime = new Date(point.time.value);
      }
      setPointFormData([...cleanData, pointForEdit]);
    }
  }
  if (action === "add") {
  }
};
