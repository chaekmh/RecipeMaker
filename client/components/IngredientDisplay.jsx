import React from 'react';
import { useInventory, useSetInventory } from '../contexts/InventoryContexts';
import axios from 'axios';

/**
 * This is a IngredientDisplay component for each individual ingredients.
 *
 * @param {*} { itemName, use, _id } These parameters are specified from its parent component, InventoryBucket.
 * @return {*} DOM element for single ingredient
 */
function IngredientDisplay({ itemName, use, _id }) {
  const inventory = useInventory();
  const setInventory = useSetInventory();

  const color = use ? 'green' : 'red';

  /**
   * This function will delete this ingredient.
   * Delete request will be sent to the server to delete this ingredient from the database
   * and update its state in the DOM.
   */
  function deleteIng() {
    const deleteThis = { data: [_id] };

    // Update server
    axios
      .delete('/api/inventory', deleteThis)
      .then((res) => {
        console.log(`${itemName} with ID:${_id} has been deleted`);
      })
      .catch((e) => {
        console.log('err: delete request is not complete');
      });

    // Update state
    let newState = { ...inventory };
    delete newState[itemName];
    setInventory(newState);
  }

  /**
   * This function will update the ingredient's bucket number.
   * It will send PUT request to the server to update ther server as well as update its state in the DOM
   * @param {*} upOrDown This takes a parameter 'up' or 'down' depending on which way user clicks.
   */
  function moveUpOrDown(upOrDown) {
    let bucketNum = inventory[itemName].bucketNumber;

    if (upOrDown === 'up' && bucketNum === 0) window.alert('Already in the primary');
    if (upOrDown === 'down' && bucketNum === 2) window.alert('Already in the tertiary');

    if (upOrDown === 'down' && bucketNum < 2) bucketNum += 1;
    if (upOrDown === 'up' && bucketNum > 0) bucketNum -= 1;

    let updatedIng = { [itemName]: { itemName: itemName, bucketNumber: bucketNum, use: use, _id: _id } };

    // Update server
    axios
      .put('/api/inventory', updatedIng)
      .then((res) => console.log(`${itemName} has been moved to ${bucketNum}`))
      .catch((e) => {
        console.log('err: move update is not completed');
      });

    // Update state
    let newState = { ...inventory, ...updatedIng };
    setInventory(newState);
  }

  function checkMarked() {
    let boolean;

    if (inventory[itemName].use === true) boolean = false;
    if (inventory[itemName].use === false) boolean = true;

    let updatedIng = {
      [itemName]: { itemName: itemName, bucketNumber: inventory[itemName].bucketNumber, use: boolean, _id: _id },
    };

    // Update database
    axios
      .put('api/inventory', updatedIng)
      .then((res) => console.log(`${itemName} with ID:${_id} checkmark: ${boolean}`))
      .catch((e) => console.log(`ERR: ingredient checkmark update is not completed `));

    // Update state
    let newState = { ...inventory, ...updatedIng };
    setInventory(newState);
  }

  return (
    <div style={{ backgroundColor: color, width: '250px' }}>
      {itemName}
      <input type="checkbox" onChange={(e) => checkMarked(e)} />
      <div>
        <button onClick={(e) => moveUpOrDown('up')}>Move Up</button>
        <button onClick={(e) => moveUpOrDown('down')}>Move Down</button>
      </div>
      <button onClick={(e) => deleteIng(e)}>X</button>
    </div>
  );
}

export default IngredientDisplay;
