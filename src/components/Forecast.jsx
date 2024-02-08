import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  console.log(items);
  return (
    <div>
      <div className="sm:flex items-center justify-start mt-6">
  <p className="text-white font-medium uppercase">{title}</p>
</div>
<hr className="my-2" />

<div className="sm:flex sm:flex-row items-center justify-between text-white">
  {items.map((item, index) => (
    <div
      key={index}
      className="sm:flex sm:flex-col items-center justify-center sm:w-1/5"
    >
      <p className="font-light text-sm">{item.title}</p>
      <img
        src={iconUrlFromCode(item.icon)}
        className="w-12 my-1"
        alt=""
      />
      <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
    </div>
  ))}
</div>
    </div>
  );
}

export default Forecast;