import { useContext, useEffect } from "react";
import { fetchTransport } from "../http/transportApi";
import { FetcherContext, TransportContext, UserInfoContext } from "..";

export const useFetcherTransport = (fetchImages) => {
  const { Transport } = useContext(TransportContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { fetcher } = useContext(FetcherContext);

  useEffect(() => {
    async function fetch() {
      await fetchTransport(UserInfo.userInfo.id).then((data) =>
        Transport.setTransports(data)
      );

      let transportsImagesArray = [];

      for (const transport of Transport.transports) {
        let transportImageObject = {
          id: transport.id,
          urlsArray: [],
        };
        let fileNames = JSON.parse(transport.files);

        if (fileNames) {
          for (const file of fileNames) {
            let url = await fetchImages("transport", transport, file);
            transportImageObject.urlsArray.push(url);
          }
          transportsImagesArray.push(transportImageObject);
        }
      }
      Transport.setTransportImages(transportsImagesArray);
    }

    fetcher.transports && fetch();
    fetcher.setTransports(false);
  }, [fetcher.transports]);

  return [];
};
