import React, { useState } from 'react';
import yaml from 'yaml';



function DynamicField() {
  const [fields, setFields] = useState([{ name: '', value: '' }]);
  


  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { name: '', value: '' }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const yamlData = yaml.stringify(fields.reduce((acc, field) => {
      if (field.name.trim() !== '') {
        acc[field.name] = field.value;
      }
      return acc;
    }, {}));

    // You can perform further actions with the YAML data, such as sending it to an API
    console.log(yamlData);
  };

  return (
    <div className=" text-center mt-20">
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Key Name"
              value={field.name}
              onChange={(e) => handleChange(index, e)}
              className=' border-solid border-2 border-black  my-4 rounded-md p-2'
            />
            <input
              type="text"
              name="value"
              placeholder="Key Value"
              value={field.value}
              onChange={(e) => handleChange(index, e)}
              className=' border-solid border-2 border-black mx-10 my-4 rounded-md p-2'
            />
            <button type="button" onClick={() => removeField(index)} className=' bg-red-500 text-white p-2 rounded-md hover:bg-red-300 duration-300'>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addField} className=' m-4 border-solid border-2 p-2 rounded-md border-blue-300 bg-blue-200 hover:bg-blue-400 duration-300'>
          Add Field
        </button>
        <button type="submit" className=' m-4 border-solid border-2 p-2 rounded-md border-green-300 bg-green-200 hover:bg-green-400 duration-300'>Submit</button>
      </form>
    </div>
  );
}

export default DynamicField;
