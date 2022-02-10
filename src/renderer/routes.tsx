import { map } from 'lodash';
import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Layout from '../modules/layout/index';
import ErrorBoundary from '../common/ErrorBoundary';

interface ConfigRouteProps {
  redirect?: string;
  [key: string]: any;
}

const RoutesConfig = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../modules/login')),
    routes: [
      {
        path: '/home',
        exact: true,
        withLayout: true,
        redirect: '/home/index',
        routes: [
          {
            path: '/index',
            component: lazy(() => import('../modules/home')),
          },
          {
            path: '/demo',
            component: lazy(() => import('../modules/home/DemoComp')),
          },
        ],
      },
    ],
  },
] as ConfigRouteProps[];

function renderRoute(
  route: ConfigRouteProps,
  index: any,
  extraProps: any
): any {
  const {
    key,
    parentPath,
    withLayout,
    routes: children,
    redirect,
    ...rest
  } = route;
  const path =
    parentPath && parentPath !== '/'
      ? `${parentPath}${route.path}`
      : route.path;

  const isRedirect = !!redirect;

  return (
    <>
      <Route
        {...rest}
        key={key || index}
        path={path}
        render={
          isRedirect
            ? ({ location }) => <Redirect to={{ pathname: '/home/index' }} />
            : () => null
        }
        component={
          !isRedirect
            ? (props: any) => {
                if (withLayout) {
                  return (
                    <Layout {...props}>
                      <ErrorBoundary>
                        <route.component
                          {...props}
                          {...extraProps}
                          route={route}
                        />
                      </ErrorBoundary>
                    </Layout>
                  );
                }
                return (
                  <route.component {...props} {...extraProps} route={route} />
                );
              }
            : undefined
        }
      />
      {children &&
        map(children, (item, i) =>
          renderRoute({ withLayout, ...item, parentPath: path }, i, extraProps)
        )}
    </>
  );
}

function renderRoutes(
  routes: ConfigRouteProps[],
  extraProps?: any,
  switchProps?: any
) {
  return (
    !!routes && (
      <Suspense fallback={<div>页面加载中...</div>}>
        <Switch {...switchProps}>
          {map(routes, (route, i) => renderRoute(route, i, extraProps))}
        </Switch>
      </Suspense>
    )
  );
}

export { RoutesConfig, renderRoutes };
