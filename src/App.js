import logo from './logo.svg';
import './App.css';
import Home from './component/home';
import Log from './component/log';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Edit from './component/edit';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


function App() {
  return (
    <Router>
      <AlertProvider template={AlertTemplate}>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Log}></Route>
        <Route path="/edit" component={Edit}></Route>

      </AlertProvider>
    </Router>

  );
}

export default App;
