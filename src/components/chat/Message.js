import React from 'react';

const Message = ({ username, text }) => {
  return (
    <div className="message-box">
      <span className="">{ username }: </span>
      <span className="">{ text }</span>
    </div>
  );
}

export default Message