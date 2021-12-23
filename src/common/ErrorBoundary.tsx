import React from 'react';

// 错误边界定义
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // 你同样可以将错误日志上报给服务器
    console.error(error);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state as any;

    if (hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>页面崩溃！</h1>;
    }
    return children;
  }
}

export default ErrorBoundary;
