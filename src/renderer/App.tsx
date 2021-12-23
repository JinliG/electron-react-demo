import { MemoryRouter as Router, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { renderRoutes, RoutesConfig } from './routes';
import './App.scss';
import { RecoilExternalStatePortal } from '../store/RecoilExternalStatePortal';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>{renderRoutes(RoutesConfig)}</Switch>
      </Router>
      <RecoilExternalStatePortal />
    </RecoilRoot>
  );
}
