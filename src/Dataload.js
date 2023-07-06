import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.115:8000/read_cofig/v1/");
      const jsonData = await response.json();
      setData(jsonData);
      setEditedData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...editedData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setEditedData(updatedData);
  };

  const handleRemove = (index) => {
    const updatedData = [...editedData];
    updatedData.splice(index, 1);
    setEditedData(updatedData);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://192.168.1.115:8000/read_cofig/v1/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        console.log("Data updated successfully");
        fetchData();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" text-center">
      <h1 className=" text-xl">Data</h1>
      {data.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={editedData[index]?.name || "" || item}
            onChange={(event) => handleInputChange(index, event)}
            className=' border-solid border-2 border-black mx-10 my-4 rounded-md p-2'
          />
          <input
            type="text"
            name="description"
            value={editedData[index]?.description || "" || item.description}
            onChange={(event) => handleInputChange(index, event)}
            className=' border-solid border-2 border-black mx-10 my-4 rounded-md p-2'
          />
          <button onClick={() => handleRemove(index)} className=' bg-red-500 text-white p-2 rounded-md hover:bg-red-300 duration-300'>Remove</button>
        </div>
      ))}
      <button onClick={handleUpdate}className=' m-4 border-solid border-2 p-2 rounded-md border-green-300 bg-green-200 hover:bg-green-400 duration-300'>Update</button>
    </div>
  );
};

export default App;
