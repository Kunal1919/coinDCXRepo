import { useState, useEffect, useRef } from "react";

const calculateData = (param) => {
  const {
    pair_inr_buy,
    pair_inr_sell,
    pair_usdt_buy,
    pair_usdt_sell,
    usdt_inr_buy,
    usdt_inr_sell,
    inr_pair,
    usdt_pair,
    tradefee,
    dANDwfee,
    quantity_buy = 0,
    quantity_sell = 0,
  } = param;
  console.log("******************************************");
  console.log("inr_pair", inr_pair);
  console.log("usdt_pair", usdt_pair);
  console.log("pair_inr_buy", pair_inr_buy);
  console.log("pair_inr_sell", pair_inr_sell);
  console.log("pair_usdt_buy", pair_usdt_buy);
  console.log("pair_usdt_sell", pair_usdt_sell);
  console.log("usdt_inr_buy", usdt_inr_buy);
  console.log("usdt_inr_sell", usdt_inr_sell);
  console.log("quantity_buy", quantity_buy);
  console.log("quantity_sell", quantity_sell);

  // (((((D2/C3)/(C4)-1)*D2)-C2*C5%)*C6)-C7
  const OP_1 =
    ((pair_inr_sell / usdt_inr_buy / pair_usdt_buy - 1) * pair_inr_sell -
      (pair_inr_buy * tradefee) / 100) *
      quantity_sell -
    dANDwfee;
  console.log("OP_1", OP_1);
  // (((D4*D3/C2-1)*D2-C2*C5%)-C7)*C6
  const OP_2 =
    (((pair_usdt_sell * usdt_inr_sell) / pair_inr_buy - 1) * pair_inr_sell -
      (pair_inr_buy * tradefee) / 100 -
      dANDwfee) *
    quantity_buy;
  console.log("OP_2", OP_2);
  console.log("******************************************");
  // <div>
  //       <div>inr_pair, {inr_pair}</div>
  //       <div>"usdt_pair", {usdt_pair}</div>
  //       <div>"pair_inr_buy", {pair_inr_buy}</div>
  //       <div>"pair_inr_sell", {pair_inr_sell}</div>
  //       <div>"pair_usdt_buy", {pair_usdt_buy}</div>
  //       <div>"pair_usdt_sell", {pair_usdt_sell}</div>
  //       <div>"usdt_inr_buy", {usdt_inr_buy}</div>
  //       <div>"usdt_inr_sell", {usdt_inr_sell}</div>
  //       <div>"OP_1", {OP_1}</div>
  //       <div>"OP_2", {OP_2}</div>
  //       {" "}
  //     </div>
  const buyClass =
    OP_1 > 0
      ? "bgColorGreen borderAll W60 alignContentCenter"
      : "bgColorRed borderAll W60 alignContentCenter";
  const sellClass =
    OP_2 > 0
      ? "bgColorGreen borderAll W60 alignContentCenter"
      : "bgColorRed borderAll W60 alignContentCenter";

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  return (
    <div>
      <div>
        <div className="displayFlex bgHeaderColor">
          <div className="W40 borderAll">PAIR</div>
          <div className="W30 borderAll">BUY</div>
          <div className="W30 borderAll">SELL</div>
        </div>
        <div className="displayFlex">
          <div className="W40 borderAll">{inr_pair}</div>
          <div className="W30 borderAll">{pair_inr_buy}</div>
          <div className="W30 borderAll">{pair_inr_sell}</div>
        </div>
        <div className="displayFlex">
          <div className="W40 borderAll">{usdt_pair}</div>
          <div className="W30 borderAll">{pair_usdt_buy}</div>
          <div className="W30 borderAll">{pair_usdt_sell}</div>
        </div>
        <div className="displayFlex">
          <div className="W40 borderAll"> USDT/INR</div>
          <div className="W30 borderAll"> {usdt_inr_buy}</div>
          <div className="W30 borderAll"> {usdt_inr_sell}</div>
        </div>
        <div className="displayFlex">
          <div className="W40 borderAll"> QUANTITY</div>
          <div className="W30 borderAll"> {quantity_buy}</div>
          <div className="W30 borderAll"> {quantity_sell}</div>
        </div>
        <div className="displayFlex">
          <div className="borderAll W60">
            Sell {inr_pair} - Buy {usdt_pair}
          </div>
          <div className={buyClass}>{roundToTwo(OP_1)}</div>
        </div>
        <div className="displayFlex">
          <div className="borderAll W60">
            Sell {usdt_pair} - Buy {inr_pair}
          </div>
          <div className={sellClass}> {roundToTwo(OP_2)}</div>
        </div>
      </div>
    </div>
  );

  // return (
  //     <div>
  //     <p>{OP_1}</p>
  //     <p>{OP_1}</p></div>

  // )
};

const PairView = (props) => {
  const {
    data,
    pairInrData,
    pairUsdtData,
    tradefee,
    dANDwfee,
    quantityDataBuy,
    quantityDataSell,
  } = props;
  console.log("data", data);
  console.log("quantityDataBuy", quantityDataBuy);

  console.log("quantityDataSell", quantityDataSell);

  if (
    data &&
    data.length &&
    quantityDataSell &&
    Object.keys(quantityDataSell).length &&
    quantityDataBuy &&
    Object.keys(quantityDataBuy).length
  ) {
    const abs = [];
    // console.log("abs_1", abs);
    Object.keys(pairInrData).map((key) => {
      let pair_inr_buy = "";
      let pair_inr_sell = "";
      let pair_usdt_buy = "";
      let pair_usdt_sell = "";
      let usdt_inr_buy = "";
      let usdt_inr_sell = "";
      data.map((item) => {
        if (item.market === pairInrData[key]) {
          pair_inr_buy = item.bid;
          pair_inr_sell = item.ask;
        }
        if (item.market === pairUsdtData[key]) {
          pair_usdt_buy = item.bid;
          pair_usdt_sell = item.ask;
        }
        if (item.market === "USDTINR") {
          usdt_inr_buy = item.bid;
          usdt_inr_sell = item.ask;
        }
        if (
          pair_inr_buy !== "" &&
          pair_inr_sell !== "" &&
          pair_usdt_buy !== "" &&
          pair_usdt_sell !== "" &&
          usdt_inr_buy !== "" &&
          usdt_inr_sell !== "" &&
          (pairUsdtData[key] === item.market ||
            pairInrData[key] === item.market ||
            item.market === "USDTINR")
        ) {
          abs.push(
            <div className="grid-item">
              {calculateData({
                pair_inr_buy,
                pair_inr_sell,
                pair_usdt_buy,
                pair_usdt_sell,
                usdt_inr_buy,
                usdt_inr_sell,
                inr_pair: pairInrData[key],
                usdt_pair: pairUsdtData[key],
                quantity_buy: quantityDataBuy[key],
                quantity_sell: quantityDataSell[key],
                tradefee,
                dANDwfee,
              })}
            </div>
          );
          pair_inr_buy = "";
          pair_inr_sell = "";
          pair_usdt_buy = "";
          pair_usdt_sell = "";
          usdt_inr_buy = "";
          usdt_inr_sell = "";
        }
      });
    });
    // console.log("abs", abs);
    return <div className="grid-container"> {abs}</div>;
  }
};

const Fetch = () => {
  const [data, setData] = useState([]);
  const [quantityDataBuy, setQuantityDataBuy] = useState({});
  const [quantityDataSell, setQuantityDataSell] = useState({});

  const pairInrData = {
    BTC: "BTCINR",
    ETH: "ETHINR",
    TRX: "TRXINR",
    XRP: "XRPINR",
    // LINK:"LINKINR",
    // BAT:"BATINR",
    // LTC:"LTCINR",
    // ZRX:"ZRXINR",
    // 	OMG:"OMGINR",
    // EOS:"EOSINR",
    // 	KNC:"KNCINR",
    // 	DAI:"DAIINR",
    // MATIC:"MATICINR",
    // UNI:"UNIINR",
    // 	BCH:"BCHINR",
    // ATOM:"ATOMINR",
    // PAXG:"PAXGINR",
    // MKR:"MKRINR",
    // COMP:"COMPINR",
    BNB: "BNBINR",
    SOL: "SOLINR",
    ADA: "ADAINR",
    DOGE: "DOGEINR",
  };

  const pairUsdtData = {
    BTC: "BTCUSDT",
    ETH: "ETHUSDT",
    TRX: "TRXUSDT",
    XRP: "XRPUSDT",
    // LINK:	"LINKUSDT",
    // BAT	:"BATUSDT",
    // LTC	:"LTCUSDT",
    // ZRX	:"ZRXUSDT",
    // OMG:	"OMGUSDT",
    // EOS	:"EOSUSDT",
    // KNC:	"KNCUSDT",
    // DAI:	"DAIUSDT",
    // MATIC	:"MATICUSDT",
    // UNI	:"UNIUSDT",
    // BCH:	"BCHUSDT",
    // ATOM	:"ATOMUSDT",
    // PAXG	:"PAXGUSDT",
    // MKR	:"MKRUSDT",
    // COMP	:"COMPUSDT"
    BNB: "BNBUSDT",
    SOL: "SOLUSDT",
    ADA: "ADAUSDT",
    DOGE: "DOGEUSDT",
  };

  const pairQuantity = [
    { BTC: "B-BTC_INR" },
    { ETH: "B-ETH_INR" },
    { TRX: "B-TRX_INR" },
    { XRP: "B-XRP_INR" },
    { BNB: "B-BNB_INR" },
    { SOL: "B-SOL_INR" },
    { ADA: "B-ADA_INR" },
    { DOGE: "B-DOGE_INR" },
  ];

  const [tradefee, setTradefee] = useState(0.64);
  const [dANDwfee, setdANDwfee] = useState(0);
  const ref = useRef();

  async function getServerData() {
    let qb = {};
    let qs = {};
    let pricePromise = new Promise((resolve, reject) => {
      fetch("https://api.coindcx.com/exchange/ticker").then((res) => {
        resolve(res.json());
      });
    });
    console.log("PROMISE_CALLED");
    const allPromise = [];
    Object.keys(pairQuantity).forEach((i, index) => {
      console.log("PPPP_QUANTITY", Object.keys(pairQuantity[i])[0]);
      allPromise.push(
        new Promise((resolve, reject) => {
          fetch(
            `https://public.coindcx.com/market_data/orderbook?pair=${
              Object.values(pairQuantity[i])[0]
            }`
          )
            .then(async (res) => {
              return res.json();
            })
            .then((data) => {
              // const data = await res.json();
              if (data && Object.keys(data).length) {
                const quantity_buy = Object.values(data.asks)[0];
                const quantity_sell = Object.values(data.bids)[0];
                qb[Object.keys(pairQuantity[i])[0]] = quantity_buy;
                qs[Object.keys(pairQuantity[i])[0]] = quantity_sell;
                console.log("qb", qb);
                console.log("qs", qs);
              }
              resolve(data);
            });
        })
      );

      // if (index === pairQuantity.length - 1) {
      //   resolve({ qb, qs });
      // }
    });
    // Object.keys(pairQuantity).forEach((i, index) => {
    //   console.log("PPPP_QUANTITY", Object.keys(pairQuantity[i])[0]);
    //   fetch(
    //     `https://public.coindcx.com/market_data/orderbook?pair=${
    //       Object.values(pairQuantity[i])[0]
    //     }`
    //   )
    //     .then(async (res) => {
    //       return res.json();
    //       // if (data && Object.keys(data).length) {
    //       //   const quantity_buy = Object.values(data.asks)[0];
    //       //   const quantity_sell = Object.values(data.bids)[0];
    //       //   qb[Object.keys(pairQuantity[i])[0]] = quantity_buy;
    //       //   qs[Object.keys(pairQuantity[i])[0]] = quantity_sell;
    //       //   console.log("qb", qb);
    //       //   console.log("qs", qs);
    //       // }
    //     })
    //     .then((data) => {
    //       // const data = await res.json();
    //       if (data && Object.keys(data).length) {
    //         const quantity_buy = Object.values(data.asks)[0];
    //         const quantity_sell = Object.values(data.bids)[0];
    //         qb[Object.keys(pairQuantity[i])[0]] = quantity_buy;
    //         qs[Object.keys(pairQuantity[i])[0]] = quantity_sell;
    //         console.log("qb", qb);
    //         console.log("qs", qs);
    //       }
    //     });
    //   if (index === pairQuantity.length - 1) {
    //     resolve({ qb, qs });
    //   }
    // });

    console.log("DDDD1");
    let priceP = await pricePromise;
    let quantityP = await Promise.allSettled(allPromise);
    console.log("DDDD2", quantityP, { qb, qs });

    return [priceP, { qb, qs }];
  }

  const prepareComponent = (value) => {
    const data = value[0];
    const quantityDataBuy = value[1].qb;
    const quantityDataSell = value[1].qs;

    if (
      data.length &&
      quantityDataSell &&
      Object.keys(quantityDataSell).length &&
      quantityDataBuy &&
      Object.keys(quantityDataBuy).length
    ) {
      const abs = [];
      console.log("abs_1", abs);
      Object.keys(pairInrData).map((key) => {
        let pair_inr_buy = "";
        let pair_inr_sell = "";
        let pair_usdt_buy = "";
        let pair_usdt_sell = "";
        let usdt_inr_buy = "";
        let usdt_inr_sell = "";
        data.map((item) => {
          if (item.market === pairInrData[key]) {
            pair_inr_buy = item.bid;
            pair_inr_sell = item.ask;
          }
          if (item.market === pairUsdtData[key]) {
            pair_usdt_buy = item.bid;
            pair_usdt_sell = item.ask;
          }
          if (item.market === "USDTINR") {
            usdt_inr_buy = item.bid;
            usdt_inr_sell = item.ask;
          }
          if (
            pair_inr_buy !== "" &&
            pair_inr_sell !== "" &&
            pair_usdt_buy !== "" &&
            pair_usdt_sell !== "" &&
            usdt_inr_buy !== "" &&
            usdt_inr_sell !== "" &&
            (pairUsdtData[key] === item.market ||
              pairInrData[key] === item.market ||
              item.market === "USDTINR")
          ) {
            console.log("FUNCTION_CALLED  =>", key);
            console.log("BUY =>", quantityDataBuy);
            console.log("SELL  =>", quantityDataSell);
            console.log("1", quantityDataBuy[key]);
            console.log("2", quantityDataSell[key]);
            console.log("*!*!*!*!*!*!*!**!");
            abs.push(
              <div className="grid-item">
                {calculateData({
                  pair_inr_buy,
                  pair_inr_sell,
                  pair_usdt_buy,
                  pair_usdt_sell,
                  usdt_inr_buy,
                  usdt_inr_sell,
                  inr_pair: pairInrData[key],
                  usdt_pair: pairUsdtData[key],
                  quantity_buy: quantityDataBuy[key],
                  quantity_sell: quantityDataSell[key],
                  tradefee,
                  dANDwfee,
                })}
              </div>
            );
            pair_inr_buy = "";
            pair_inr_sell = "";
            pair_usdt_buy = "";
            pair_usdt_sell = "";
            usdt_inr_buy = "";
            usdt_inr_sell = "";
          }
        });
      });
      console.log("abs", abs);
      return abs;
    }
    return [];
  };

  //   <PairView
  //   data={data}
  //   pairInrData={pairInrData}
  //   pairUsdtData={pairUsdtData}
  //   pairQuantity={pairQuantity}
  //   tradefee={tradefee}
  //   dANDwfee={dANDwfee}
  //   quantityDataBuy={quantityDataBuy}
  //   quantityDataSell={quantityDataSell}
  // />

  let aaa;
  // useEffect(() => {
  //   if (ref.current === undefined) {
  //     getServerData().then((value) => {
  //       // console.log("DONE_VALUE", value);
  //       aaa = prepareComponent(value);
  //       setData(aaa);
  //       // console.log("DONE_VALUE_aaa", aaa);
  //     });
  //     ref.current = "called";
  //   }
  // }, []);

  useEffect(() => {
    let tempData;
    setInterval(() => {
      getServerData().then((value) => {
        // console.log("DONE_VALUE_ITERATION", value);
        aaa = prepareComponent(value);
        setData(aaa);
        // console.log("DONE_VALUE_ITERATION_aaa", aaa);
      });
    }, 4000);
  }, []);

  const onChangeListner = (e) => {
    // console.log("E", e);
    if (e.target.id === "tfee") {
      setTradefee(e.target.value);
    } else {
      setdANDwfee(e.target.value);
    }
  };
  // console.log("RETURN_AAA", data);
  return (
    <div>
      <div className="displayFlex headerBorder">
        <div className="W50">CoinDCX IntraLoop</div>
        <div className="displayFlex W50">
          <div className="W50">
            Trade Fee:{" "}
            <input
              id="tfee"
              value={tradefee}
              onChange={onChangeListner}
            ></input>
          </div>
          <div className="W50">
            D & W Fee:{" "}
            <input
              id="dwfee"
              value={dANDwfee}
              onChange={onChangeListner}
            ></input>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {" "}
        {data && data.map((component) => <div>{component}</div>)}
      </div>
    </div>
  );
};
export default Fetch;
