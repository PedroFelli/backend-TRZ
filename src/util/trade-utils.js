function itemsValue(itemId, quantity) {
  let sum = 0;

  if (itemId === 1) {
    sum = quantity * 14;
  }
  if (itemId === 2) {
    sum = quantity * 12;
  }
  if (itemId === 3) {
    sum = quantity * 10;
  }
  if (itemId === 4) {
    sum = quantity * 8;
  }

  return sum;
}

function calItemsPoints(items) {
  const sumItems = items.map((item) => {
    item.sum = itemsValue(item.item_id, item.quantity);

    return item;
  });

  const totalItemPoints = sumItems.reduce((cumulative, item) => {
    return cumulative + item.sum;
  }, 0);

  return totalItemPoints;
}

function AttItemsValue(items) {
  const sumItems = items.map((item) => {
    item.sum = itemsValue(item.item_id, item.quantity);

    return item;
  });

  const totalItemPoints = sumItems.reduce((cumulative, item) => {
    return cumulative + item.sum;
  }, 0);

  return totalItemPoints;
}

export { calItemsPoints, AttItemsValue };
