import React, { memo } from 'react';
import { Menu, Layout } from 'antd';
import { useRecoilState } from 'recoil';
import { menuState } from 'store';
import { map } from 'lodash';
import './index.scss';

const { Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

function SideBar(props: any) {
  const { history, location } = props;
  const { selectedSideMenu, openSideMenu } = location?.state || {};

  const [menus, setMenus] = useRecoilState(menuState);

  const selectedKeys = selectedSideMenu ? [selectedSideMenu] : [];
  const openKeys = openSideMenu ? [openSideMenu] : [];
  return (
    <Sider className="sider" theme="light" collapsible>
      <div className="sider-line" />
      <Menu
        mode="inline"
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
      >
        {map(menus, (subMenu, index) => {
          const { key, Icon, title, children } = subMenu;
          return (
            <SubMenu key={key} title={title} icon={<Icon />}>
              {map(children, (item, i) => {
                const { key: itemKey, path, title: itemTitle } = item;
                return (
                  <MenuItem
                    key={itemKey}
                    onClick={() => {
                      if (path) {
                        history.push(path, {
                          selectedSideMenu: itemKey,
                          openSideMenu: key,
                        });
                      }
                    }}
                  >
                    {itemTitle}
                  </MenuItem>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default memo(SideBar);
