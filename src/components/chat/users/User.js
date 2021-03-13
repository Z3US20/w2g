import React from 'react';

const User = ({ username }) => {
  return (
    <div>
      <div className="users">{ username }</div>
    </div>
  );
}

export default User