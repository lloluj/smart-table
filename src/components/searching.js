import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  // const compare = createComparison({
  //   skipEmptyTargetValues: true
  // }, rules.searchMultipleFields(searchField, ['date', 'customer', 'seller', 'total'], false));

  return (query, state, action) => {
    // result заменили на query
    return state[searchField]
      ? Object.assign({}, query, {
          // проверяем, что в поле поиска было что-то введено
          search: state[searchField], // устанавливаем в query параметр
        })
      : query; // если поле с поиском пустое, просто возвращаем query без изменений
  };

  // return (data, state, action) => {

  //   // @todo: #5.2 — применить компаратор
  //   if (!state[searchField]) return data;
  //   return data.filter(row => compare(row, state));
  // };
}
