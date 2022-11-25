import styles from './App.module.css';
import Home from './components/Home/index';
import CreatePokemon from './components/CreatePokemon/index';
import DetailCard from './components/DetailCard';
import Landing from './components/Landing';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';


function App(props) {
  
  const data = useSelector(state => {
  });

  return (
    <Router>
      <div className={styles.App}>
        <Route exact path='/pokemonadventure' component={Landing}/>
        <Route exact path='/pokemonadventure/home' component={Home}/>
        <Route exact path='/pokemonadventure/create' component={CreatePokemon}/>
        <Route exact path='/pokemonadventure/detail/:id' component={DetailCard }/>
      </div>
    </Router>
  );
}

export default App;
