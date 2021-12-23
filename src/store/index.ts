import { atom, selector } from 'recoil';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { setRecoilExternalState } from './RecoilExternalStatePortal';

export const userInfoState = atom<any>({
  key: 'userInfoState',
  default: {},
});

export const isLoginState = selector({
  key: 'isLoginState',
  get: ({ get }) => {
    const userInfo = get(userInfoState) || {};
    return !isEmpty(userInfo);
  },
});

export const menuState = atom<any>({
  key: 'menuState',
  default: [
    {
      Icon: AppstoreOutlined,
      title: 'Navigation One',
      key: 'Navigation One',
      children: [
        {
          title: 'Option 1',
          key: 'Option 1',
          path: '/home/index',
        },
        {
          title: 'Option 2',
          key: 'Option 2',
          path: '/home/demo',
        },
      ],
    },
    {
      Icon: MailOutlined,
      title: 'Navigation Two',
      key: 'Navigation Two',
      children: [
        {
          title: 'Option 3',
          key: 'Option 3',
          path: '/home/demo',
        },
        {
          title: 'Option 4',
          key: 'Option 4',
          path: '/home/demo',
        },
      ],
    },
    {
      Icon: SettingOutlined,
      title: 'Navigation Three',
      key: 'Navigation Three',
      children: [
        {
          title: 'Option 5',
          key: 'Option 5',
          path: '/home/demo',
        },
      ],
    },
  ],
});

// export const userData = selector({
//   key: 'userData',
//   get: ({ get }) => {
//     const { data = {} } = get(userInfoState) || {};
//     return data;
//   },
//   set: ({ get, set }, newData: any) => {
//     const { data = {}, ...rest } = get(userInfoState) || {};
//     set(userInfoState, { data: { ...data, ...newData }, ...rest });
//   },
// });

export const externalSetUserInfo = (val: any) => {
  setRecoilExternalState(userInfoState, val);
};
