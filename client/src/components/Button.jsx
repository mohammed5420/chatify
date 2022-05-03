import React from 'react';

const Button = ({ text, primary, secondary }) => {
  return (
    <div
      className={`btn btn-primary`}
    >
      {text}
    </div>
  );
};

export default Button;
//  ${
//   primary ? 'primary' : secondary ? 'secondary btn-outline' : 'link'
// }