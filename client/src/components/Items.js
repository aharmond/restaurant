import React from 'react';
import Item from './Item';

const Items = ({ items, destroyItem, updateItem }) => (
  <div>
    { items.map( item =>
        <Item 
          key={item.id}
          destroyItem={destroyItem}
          updateItem={updateItem}
          item={{...item}}
        />
      )
    }
  </div>
)     
export default Items;