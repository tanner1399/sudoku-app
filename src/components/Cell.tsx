import React from 'react';
import './Cell.css'; 

interface CellProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Cell: React.FC<CellProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="cell"
      value={value === -1 ? '' : value}
      onChange={onChange}
      min="1"
      max="9"
    />
  );
};

export default Cell;
