import React from 'react';
import TableWithActions from './TableWithActions';
import Contract from './Contract';

const HandleContract = () => {
  const tableData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  const handleEdit = (item) => {
    // Edit logic here
    console.log('Editing item:', item);
  };

  const handleDelete = (itemId) => {
    // Delete logic here
    console.log('Deleting item with ID:', itemId);
  };

  return (
    <div>
      <Contract data={tableData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default HandleContract;
