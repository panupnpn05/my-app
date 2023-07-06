import React, { useState } from 'react';

function BoxWithForm() {
  const [boxColor, setBoxColor] = useState('gray');
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setBoxColor('blue');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setBoxColor('gray');
    setShowForm(false);
  };

  return (
    <div className="box" style={{ backgroundColor: boxColor }}>
      <button onClick={handleShowForm}>Show Form</button>
      {showForm && (
        <form>
          {/* Form content here */}
          <button type="button" onClick={handleCloseForm}>
            Close Form
          </button>
        </form>
      )}
    </div>
  );
}

export default BoxWithForm;
