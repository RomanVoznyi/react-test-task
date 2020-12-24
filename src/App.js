import { useState } from 'react';
import Header from './Components/Header';
import Task1 from './Components/Task1';
import Task2 from './Components/Task2';
import Task3 from './Components/Task3';
import Task4 from './Components/Task4';
import s from './App.module.css';

const App = () => {
  const [showTask, setShowTask] = useState([false, false, false, false]);

  const onClick = targetIndex => {
    setShowTask(prevState =>
      prevState.map((el, index) => (el = index === targetIndex ? true : false)),
    );
  };

  return (
    <div className={s.App}>
      <Header onClick={onClick} />
      {showTask[0] && <Task1 />}
      {showTask[1] && <Task2 />}
      {showTask[2] && <Task3 />}
      {showTask[3] && <Task4 />}
    </div>
  );
};

export default App;
