import React, { useState, useEffect } from "react";

const Test2 = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [renderedData, setRenderData] = useState([]);
  const [isVisible , setIsVisible] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);


  useEffect(() => {
    fetchData();
  }, []);

  const expand = (index) => {
    setClickedIndex(index);
    setIsVisible(!isVisible);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/data");
      const jsonData = await response.json();
      setData(jsonData);
      setEditedData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  const renderData = () => {
    return (
      <div>
        {data.map((item, index) => (
          <div key={index} className=" pl-7 mb-10">
            <div onClick={() => expand(index)} className=" text-blue-600 text-lg font-bold">Doc: {index}</div>
            {clickedIndex === index && renderItem(item)}
            {/* {renderItem(item)}  */}
            
            {/* {console.log(item)} */}
          </div>
        ))}
      </div>
    );
  };
  
  const renderItem = (item) => {
    if (!Object.keys(item).length) {
      return <div className=" pl-7 border-solid border-2 rounded-md border-black w-auto">Empty item</div>;
    }
    return (
      <div>
        {Object.keys(item).map((key) => (
          <div key={key} className=" p-2 pl-5 border-solid border-2 rounded-md border-black bg-red-200 ">
            {key}: 
            {renderValue(item[key])}
            {console.log(item)}
            
            {/* {console.log({key})} */}
            {/* {console.log(item[key])} */}
          </div>
        ))}
      </div>
    );
  };
  
  const renderValue = (value) => {
    if (typeof value === 'object') {

      return (<div className=" bg-red-300">
        {renderItem(value)}
        </div>
        )
    }
  
    return <span className=" text-emerald-600 font-bold text-lg "> {value}</span>;
  };
  
  
  
    return (
      <div className="relative">
        {renderData(data)}
      </div>
    );
  };
  
export default Test2;
