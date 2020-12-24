import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ConvertForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConvertForm = ({ unitsList, onClick }) => {
  const [value, setValue] = useState(0);
  const [unitIn, setUnitIn] = useState('');
  const [unitOut, setUnitOut] = useState('');

  const handleChanges = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'unitIn':
        setUnitIn(value);
        break;
      case 'unitOut':
        setUnitOut(value);
        break;
      case 'value':
        setValue(value);
        break;
      default:
        break;
    }
  };

  const createRequest = evt => {
    evt.preventDefault();

    if (checkData()) {
      const request = {
        distance: {
          unit: unitIn,
          value: value,
        },
        convert_to: unitOut,
      };

      onClick({ request: request, type: 'getResult' });
    } else {
      toast.error('Пожалуйста, проверьте введенные данные', {
        autoClose: 2000,
      });
    }
  };

  const checkData = () => {
    if (
      !Number.isNaN(value) &&
      value !== 0 &&
      value !== '' &&
      unitIn !== '' &&
      unitOut !== ''
    ) {
      return true;
    }
    return false;
  };

  return (
    <form onSubmit={createRequest}>
      <ToastContainer />
      <table className={s.table}>
        <thead>
          <tr>
            <th>Введите значение:</th>
            <th>Выберите единицу измерения:</th>
            <th>Выберите единицу для конвертации:</th>
            <th>Отправить запрос:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input
                  className={s.inputField}
                  type="number"
                  name="value"
                  value={value}
                  onChange={handleChanges}
                />
              </label>
            </td>
            <td>
              <select
                className={s.inputField}
                name="unitIn"
                onChange={handleChanges}
              >
                <option value="">--Выберите единицу измерения--</option>
                {unitsList.map(el => (
                  <option
                    value={el.unit}
                    key={`in-${el.unit}`}
                  >{`${el.name} (${el.unit})`}</option>
                ))}
              </select>
            </td>
            <td>
              <select
                className={s.inputField}
                name="unitOut"
                onChange={handleChanges}
              >
                <option value="">--Выберите единицу измерения--</option>
                {unitsList.map(el => (
                  <option
                    value={el.unit}
                    key={`out-${el.unit}`}
                  >{`${el.name} (${el.unit})`}</option>
                ))}
              </select>
            </td>
            <td>
              <button className={s.button} type="submit">
                Рассчитать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

ConvertForm.propTypes = {
  unitsList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConvertForm;
