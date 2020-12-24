import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './AddForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddForm = ({ unitsList, onSubmit }) => {
  const [unit, setUnit] = useState('');
  const [name, setName] = useState('');
  const [ratio, setRatio] = useState('');
  const [oldUnit, setOldUnit] = useState('');

  const handleChanges = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'unit':
        setUnit(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'ratio':
        setRatio(value);
        break;
      case 'oldUnit':
        setOldUnit(value);
        break;

      default:
        break;
    }
  };

  const createRequest = evt => {
    evt.preventDefault();

    if (checkData()) {
      if (!checkList(unit)) {
        const request = {
          [unit]: {
            name,
            ratios: {
              [oldUnit]: ratio,
            },
          },
        };

        onSubmit({ request: request, type: 'updateList' });
      } else {
        toast.error('Эта единица измерения уже есть в перечне', {
          autoClose: 2000,
        });
      }
    } else {
      toast.error('Пожалуйста, проверьте введенные данные', {
        autoClose: 2000,
      });
    }
  };

  const checkData = () => {
    if (
      unit !== '' &&
      name !== '' &&
      oldUnit !== '' &&
      !Number.isNaN(ratio) &&
      ratio !== 0 &&
      ratio !== ''
    ) {
      return true;
    }
    return false;
  };

  const checkList = target => {
    return unitsList.map(el => el.unit).includes(target);
  };

  return (
    <form className={s.form} onSubmit={createRequest}>
      <ToastContainer />
      <table className={s.table}>
        <thead>
          <tr>
            <th>
              Введите новую единицу измерения{' '}
              <p className={s.note}>(mm,yd,...)</p>
            </th>
            <th>Введите наименование новой единицы измерения </th>
            <th>Выберите единицу для формирования соотношения</th>
            <th>
              Введите значение соотношения{' '}
              <p className={s.note}>
                (1 новая единица = ... выбранной единицы)
              </p>
            </th>
            <th>Добавить новую единицу</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input
                  className={s.inputField}
                  type="text"
                  name="unit"
                  value={unit}
                  onChange={handleChanges}
                />
              </label>
            </td>
            <td>
              <label>
                <input
                  className={s.inputField}
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChanges}
                />
              </label>
            </td>
            <td>
              <select
                className={s.inputField}
                name="oldUnit"
                onChange={handleChanges}
              >
                <option value="">--Выберите единицу измерения--</option>
                {unitsList.map(el => (
                  <option
                    value={el.unit}
                    key={`old-${el.unit}`}
                  >{`${el.name} (${el.unit})`}</option>
                ))}
              </select>
            </td>
            <td>
              <label>
                <input
                  className={s.inputField}
                  type="number"
                  name="ratio"
                  value={ratio}
                  onChange={handleChanges}
                />
              </label>
            </td>
            <td>
              <button className={s.button} type="submit">
                Добавить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

AddForm.propTypes = {
  unitsList: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddForm;
