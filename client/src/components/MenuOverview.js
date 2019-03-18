import React from 'react';
import Menu from './Menu';

const MenuOverview = ({ menus, destroyMenu, updateMenu, }) => (
  <div>
    { menus.map( menu =>
        <Menu
          key={menu.id}
          destroyMenu={destroyMenu}
          updateMenu={updateMenu}
          menu={{...menu}}
        />
      )
    }
  </div>
)

export default MenuOverview;