import db from './dbUnits.json';

const refs = {
  actualDB: null,
};

const getActualDB = () => {
  const localDB = localStorage.getItem('db');
  if (localDB) {
    refs.actualDB = JSON.parse(localDB);
  } else {
    refs.actualDB = db;
    localStorage.setItem('db', JSON.stringify(db));
  }
};

const getUnitsList = () => {
  getActualDB();
  const keys = Object.keys(refs.actualDB);

  return JSON.stringify(
    keys.map(el => ({ unit: el, name: refs.actualDB[el].name })),
  );
};

const getResult = request => {
  // request - "{"newUnit": {"name":"unitNamename","ratios": {"oldUnit": ratio}}}
  const parseRequest = JSON.parse(request);
  const unitIn = parseRequest.distance.unit;
  const value = parseRequest.distance.value;
  const unitOut = parseRequest.convert_to;

  const result = (value * refs.actualDB[unitIn].ratios[unitOut]).toFixed(2);

  const response = {
    unit: unitOut,
    value: result,
  };

  return JSON.stringify(response);
};

const updateList = request => {
  // request - "{"newUnit": {"name":"unitNamename","ratios": {"oldUnit": ratio}}}
  const parseRequest = JSON.parse(request);
  const newUnit = Object.keys(parseRequest)[0];
  const oldUnit = Object.keys(parseRequest[newUnit].ratios)[0];
  const ratio = parseRequest[newUnit].ratios[oldUnit];

  refs.actualDB[newUnit] = {
    name: parseRequest[newUnit].name,
    ratios: {},
  };

  const keys = Object.keys(refs.actualDB);

  keys.forEach(el => {
    if (el === oldUnit) {
      refs.actualDB[el].ratios[newUnit] = (1 / ratio).toFixed(6);
    } else if (el === newUnit) {
      keys.forEach(unit => {
        refs.actualDB[el].ratios[unit] = (
          refs.actualDB[oldUnit].ratios[unit] * ratio
        ).toFixed(6);
      });
    } else {
      refs.actualDB[el].ratios[newUnit] = (
        refs.actualDB[el].ratios[oldUnit] / ratio
      ).toFixed(6);
    }
  });

  localStorage.setItem('db', JSON.stringify(refs.actualDB));

  return JSON.stringify(
    keys.map(el => ({ unit: el, name: refs.actualDB[el].name })),
  );
};

export { getUnitsList, getResult, updateList };
