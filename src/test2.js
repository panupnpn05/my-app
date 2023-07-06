import React, { useState, useEffect } from "react";
import './test2.css';
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';



const Test2 = () => {
  const [data, setData] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [Dockey, setDockey] = useState([]);
  const [docindex, setDocindex] = useState([]);
  const [renin, setRenin] = useState(false);
  const [newkey, setNewkey] = useState([]);
  const [newvalue, setNewvalue] = useState([]);
  const [renEdit , setRenEdit] = useState(false);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/read_config/v1/");
      const jsonData = await response.json();
      setData(jsonData);
      const initialIndices = jsonData.map((_, index) => index);
      setClickedIndices(initialIndices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (key, index) => {
    setDockey(key);
    console.log(key)
    console.log(Dockey)
    setDocindex(index);
    setRenin(true);
    setRenEdit(false);
  }

  const handleEditKey = async (key, index) => {
    setDockey(key);
    console.log(key)
    console.log(Dockey)
    setDocindex(index);
    setRenEdit(true);
    setRenin(false);
  }

  const renderEdit = () => {

    if (renEdit === true){
      return(
        <div className="renderInput fixed bottom-0 right-0 ml-9 bg-slate-200 p-2 rounded-md w-2/5">
          <p className=" text-left pl-3"> Doc :{docindex} Key:{Dockey} </p>
          <div className=" text-center">
          <input 
          className="bg-amber-300 rounded-md p-1 m-1" placeholder="Value"
          onChange={e => setNewvalue(e.target.value)}></input>
          </div>
          <div className=" text-center">
          <button className=" bg-green-400 p-1 ml-2 rounded-md" onClick={() => handleEdit()}>Save</button>
          <button className=" bg-red-300 p-1 ml-2 rounded-md" onClick={() => setRenEdit(false)}>Close</button>
          </div>
        </div>
      );
    }
    return((<></>)
    );
  }

  const handleInsert = async () => {
    let updatedDockey = undefined
    if( Dockey === undefined){
      updatedDockey = newkey
    }else{
      updatedDockey = Dockey + "." + newkey;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/insert/v1/', {
        document_index: docindex,
        key: updatedDockey,
        value: newvalue

      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setRenin(false);
    setNewvalue([]);
    fetchData();

  }

  const jumpToBottom = () => {
    handleAddDoc();

    setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, 100); 

    
  } 

  const handleAddDoc = async (index) =>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/insert_document/v1/',{

      });
      console.log(response.data);
    }catch (error) {
      console.log(error);
    }

    fetchData();
  }
  
  const handleRemove = async (key, index) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/del/v1/', {
          key: key,
          document_index: index
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
  
      fetchData();
    
    
  }
  
  const handleDocRemove = async (index , item) =>{
    if(!Object.keys(item).length){
      try{
        const response = await axios.post('http://127.0.0.1:8000/del_document/v1/', {
          document_index: index
        });
        console.log(response.data);
      } catch (error){
        console.log(error);
      }
  
      fetchData();
     }else{
      let DelDocConfirm = window.confirm("Confirm to delete?")
      
      if(DelDocConfirm){
        try{
          const response = await axios.post('http://127.0.0.1:8000/del_document/v1/', {
            document_index: index
          });
          console.log(response.data);
        } catch (error){
          console.log(error);
        }
    
        fetchData();
      }
  
         
     }
     
    
  }

  const handleEdit = async () =>{

    try {
      const response = await axios.post('http://127.0.0.1:8000/insert/v1/', {
        document_index: docindex,
        key: Dockey,
        value: newvalue

      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    fetchData();

  }
  

  const renderInput = () => {
    console.log(renin)

    if (renin === true){
      return(
        <div className=" renderInput fixed bottom-0 right-0 ml-9 bg-slate-200 p-2 rounded-md w-2/5">
          <p className=" text-left pl-3">{docindex} : {Dockey} : {newvalue}</p>
          <div className=" text-center">
          <div>
          <input 
          className=" rounded-md p-1 m-1"
          onChange={e => setNewkey(e.target.value)} placeholder="New Key"></input>
          </div>
          <div>
          <input 
          className=" rounded-md p-1 m-1" 
          onChange={e => setNewvalue(e.target.value)} placeholder="New Value"></input>

          </div>
          </div>
          <div className=" text-center">
          <button className=" bg-green-400 p-1 ml-2 rounded-md" onClick={() => handleInsert()}>Save</button>
          <button className=" bg-red-300 p-1 ml-2 rounded-md" onClick={() => setRenin(false)}>Close</button>
          </div>
        </div>
      );
    }
    return(
      <></>
    );
  }

  const expand = (index) => {
    if (clickedIndices.includes(index)) {
      setClickedIndices(clickedIndices.filter((item) => item !== index));
    } else {
      setClickedIndices([...clickedIndices, index]);
    }
  };

  
  const renderData = (index) => {
    return (
      <div>
        {data.map((item, index) => (
          <div key={index} className={`ml-10 mb-10 index-data ${clickedIndices.includes(index) ? "border-2 border-grey duration-500 rounded-md" : "border-none"}`}>
            <span onClick={() => expand(index)} className=" text-blue-600 text-lg  inline-flex p-4 font-bold cursor-pointer hover:border-2 shadow-lg duration-200 rounded-md ">Doc: {index}</span>
            <button className=" ml-3 border-green-600 border-2 text-green-600 hover:opacity-50 duration-200 px-3  pb-1 rounded-l-lg" type='button' onClick={() => handleAdd(undefined, index)}><AddIcon fontSize="small" /> </button>

            <button className="  border-red-600 border-2 hover:opacity-50 duration-200 text-red-600  px-3  pb-1 rounded-r-lg  " type='button' onClick={() => handleDocRemove(index , item)}><DeleteForeverIcon fontSize="small"/></button>


            <div className={`transition duration-1000 ${clickedIndices.includes(index) ? "opacity-100" : "opacity-0"}`}>
            {clickedIndices.includes(index) && renderItem(item,index)}
            </div>    
          </div>
        ))}
      </div>
    );
  };
  
  const renderItem = (item , index , keys ="") => {
    if (!Object.keys(item).length) {
      return (<span>
      <span className=" pl-2 ml-4 text-red-500 font-bold  rounded-md py- ">Null</span>      
      </span>
      );
    }
    if (keys !== "") {
      keys = keys + "."
    }
    return (
      <div>
        {Object.keys(item).map((key) => (
          <div key={keys + key} className=" data-value pl-7 border-solid border-2 py-1 border-grey" >
            <span> - {key}:</span> 
            {renderValue(item[key], index, keys + key)}
            {/* {console.log(key)} */}
            
          </div>
        ))}
      </div>
    );
  };
  
  const renderValue = (value ,index ,key) => {
    if (typeof value === 'object') {
      return (
          <span className="">
            <button className="  border-green-600 border-2 border-dot text-green-600 hover:bg-green-600 hover:text-white duration-200 ml-3 pb-1 rounded-full w-8 h-8" type='button' onClick={() => handleAdd(key, index)}><AddIcon /> </button>
            <button className=" border-blue-600 text-blue-600 border-2 w-8 h-8 ml-3 pb-1 hover:bg-blue-600 hover:text-white duration-200 rounded-full" type='button' onClick={() => handleEditKey(key, index)}> <EditIcon fontSize="small"/> </button>
            <button className=" border-red-600 border-2 hover:bg-red-600 hover:text-white mb-1 duration-200 text-red-600 w-8 h-8 ml-3 rounded-full  " type='button' onClick={() => handleRemove(key, index)}><DeleteForeverIcon/></button>
            {renderItem(value, index, key)}
          </span>

      );
    }
  
    return (
      <>
      <span className=" text-emerald-600 font-bold text-lg"> {value}</span>
      <button className="  border-green-600 border-2 border-dot text-green-600 hover:bg-green-600 hover:text-white duration-200 ml-3 pb-1 rounded-full w-8 h-8" type='button' onClick={() => handleAdd(key, index)}><AddIcon /> </button>
            <button className=" border-blue-600 text-blue-600 border-2 w-8 h-8 ml-3 pb-1 hover:bg-blue-600 hover:text-white duration-200 rounded-full" type='button' onClick={() => handleEditKey(key, index)}> <EditIcon fontSize="small"/> </button>
            <button className=" border-red-600 border-2 hover:bg-red-600 hover:text-white mb-1 duration-200 text-red-600 w-8 h-8 ml-3 rounded-full  " type='button' onClick={() => handleRemove(key, index)}><DeleteForeverIcon/></button>
      </>
    );
  };
  
  return (
      <div>
        {renderData(data)}
        <div className=" fixed AddDoc~ top-10 right-20 left-100"> 
          <button onClick={jumpToBottom} className="text-xl font-bold p-3 text-emerald-500 border-2 border-emerald-500 rounded-full bg-white hover:bg-emerald-500 hover:text-white justify-center duration-200"> <AddIcon fontSize="small"/> Add New Doc </button>
        </div>
        {renderInput(Dockey, docindex, renin, newkey, newvalue)}
        {renderEdit()}
      </div>
    );
  };
  
export default Test2;
