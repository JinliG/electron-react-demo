import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import './index.scss';
import { Form, Input, Button, FormInstance } from 'antd';
import { isLoginState, userInfoState } from 'store';
import Icon from 'common/Icon';

const { Item: FormItem } = Form;
const { Password } = Input;

function LoginPage(props: any) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const isLogin = useRecoilValue(isLoginState);

  const { history } = props;

  const formRef = React.createRef<FormInstance>();

  useEffect(() => {
    if (isLogin) {
      history.push('/home');
    }
  }, [isLogin, history]);

  return (
    <div className="login-page">
      <div className="login-page-main">
        <Icon name="regret_bfyy" className="login-page-logo" />
        <Form
          name="login"
          ref={formRef}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <FormItem
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Password placeholder="请输入密码" />
          </FormItem>
        </Form>
        <Button
          type="primary"
          className="login-page-btn"
          onClick={() => {
            formRef.current
              ?.validateFields()
              .then((values) => {
                setUserInfo(values);
              })
              .catch((err) => {});
          }}
        >
          立即登录
        </Button>
        {/* <Link to="/home">to home</Link>
        <Link to="/home/demo">to demo</Link> */}
      </div>
    </div>
  );
}

export default LoginPage;
