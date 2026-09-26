import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, price) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

  const handleOpenBuyWindow = (uid, price) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price || 0);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  const handleOpenSellWindow = (uid, price) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price || 0);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} />
      )}
      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} price={selectedStockPrice} onClose={handleCloseSellWindow} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
