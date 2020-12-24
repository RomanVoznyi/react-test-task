import React from 'react';
import PropTypes from 'prop-types';
import s from './Header.module.css';

const Header = ({ onClick }) => {
  const handleClick = evt => {
    onClick(evt.target.id - 1);
  };

  return (
    <ul className={s.Header} onClick={handleClick}>
      <li className={s.item}>
        <button type="button" id="1">
          Task1
        </button>
      </li>
      <li className={s.item}>
        <button type="button" id="2">
          Task2
        </button>
      </li>
      <li className={s.item}>
        <button type="button" id="3">
          Task3
        </button>
      </li>
      <li className={s.item}>
        <button type="button" id="4">
          Task4
        </button>
      </li>
    </ul>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
