import React, { useEffect } from 'react';

const Notify = ({ text, type, id }) => {
  //create a function to show toast
  const notifyWithOptions = (text) => {
    toast.success(text, {
      theme: 'colored',
      position: 'top-right',
      rtl: true,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type
    });
  };

  //call the function
  useEffect(() => {
    notifyWithOptions(text);
  }, [text, id]);


  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Notify;