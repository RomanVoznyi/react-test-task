import { useState } from 'react';
import * as server from '../BackEnd/backend';
import ConvertForm from './ConvertForm';
import AddForm from './AddForm';
import s from './FrontEnd.module.css';
import { MdAdd } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// request - { “distance”: { “unit”: “m”, “value”: 0.5 }, “convert_to”: “ft” }
// result - { “unit”: “ft”, “value”: 1.64 }

const FrontEnd = () => {
  const [unitsList, setUnitsList] = useState(() =>
    JSON.parse(server.getUnitsList()),
  );
  const [request, setRequest] = useState({ getResult: '', updateList: '' });
  const [response, setResponse] = useState({ result: '', newList: '' });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const sendRequestGetResponse = ({ request, type }) => {
    if (type === 'getResult') {
      const result = JSON.parse(server.getResult(JSON.stringify(request)));

      setRequest(prevState => ({ ...prevState, getResult: request }));
      setResponse(prevState => ({ ...prevState, result: result }));

      setMessage(
        `${request.distance.value} ${request.distance.unit} = ${result.value} ${result.unit}`,
      );
    }
    if (type === 'updateList') {
      const newList = JSON.parse(server.updateList(JSON.stringify(request)));

      setRequest(prevState => ({ ...prevState, updateList: request }));
      setResponse(prevState => ({ ...prevState, newList: newList }));
      setUnitsList(newList);
      toast.success(
        'Ваша новая единица измерения была успешно добавлена в реестр',
        { autoClose: 2000 },
      );
      toggleAddForm();
    }
  };

  const toggleAddForm = () => {
    setShowForm(prevState => !prevState);
  };

  return (
    <div className={s.container}>
      <ToastContainer />
      <div className={s.container}>
        <h2 className={s.blueTitle}>Реализация: </h2>
        {unitsList.length > 0 && (
          <ConvertForm unitsList={unitsList} onClick={sendRequestGetResponse} />
        )}
        <h3 className={s.blueTitle}>Результат: </h3>
        <p>{message}</p>
      </div>

      <div className={s.container}>
        <button
          className={s.addContainer}
          type="button"
          onClick={toggleAddForm}
        >
          <span className={s.addButton}>
            <MdAdd className={s.addIcon} />
          </span>
          Добавить новую единицу измерения
        </button>
        {showForm && (
          <AddForm unitsList={unitsList} onSubmit={sendRequestGetResponse} />
        )}
      </div>

      <div className={s.container}>
        <h3 className={s.blueTitle}>Взаимодействие с "сервером"</h3>
        <p>
          Запрос на сервер: <span>{JSON.stringify(request)}</span>{' '}
        </p>
        <p>
          Ответ сервера: <span>{JSON.stringify(response)}</span>{' '}
        </p>
      </div>
    </div>
  );
};

export default FrontEnd;
