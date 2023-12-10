import { observer } from "mobx-react-lite";
import React from "react";

const TransportSelectorItem = observer(
  ({ thisTransport, setModalActive, transport, setTransport, inWork }) => {
    const setTransportAndTakeOrder = () => {
      inWork("", "selector", thisTransport.id);
      setModalActive(false);
    };

    return (
      <div
        className="transport_selector_item"
        onClick={(event) => {
          setTransportAndTakeOrder();
        }}
      >
        {thisTransport.tag}
      </div>
    );
  }
);

export default TransportSelectorItem;
