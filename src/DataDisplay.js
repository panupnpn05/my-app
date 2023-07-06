import React, { useState } from "react";
import DataDisplay from "./Dataload";

export default function Display(){

    const [data, SetData] = useState([]);
    function pull_data(data){
        SetData(data)
    }
    return(
    <div>
    {data}
    <ul className="text-center ">
    <DataDisplay func={pull_data}/>
    {data.map((item) => (
      <li key={item.id} className="mb-5">
        {Object.keys(item).map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(item[key])}
          </div>
        ))}
      </li>
    ))}
  </ul>
  </div>
  )
}