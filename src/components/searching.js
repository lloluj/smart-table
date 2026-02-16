import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  // const compare = createComparison({
  //   skipEmptyTargetValues: true
  // }, rules.searchMultipleFields(searchField, ['date', 'customer', 'seller', 'total'], false));
  
  return (data, state, action) => {
    const query = state[searchField]?.toLowerCase().trim();

    if (!query) return data;

    return data.filter(row =>
      ['customer', 'seller'].some(field =>
        row[field]?.toLowerCase().includes(query)
      )
    );
  };

  // return (data, state, action) => {
    
  //   // @todo: #5.2 — применить компаратор
  //   if (!state[searchField]) return data;
  //   return data.filter(row => compare(row, state));
  // };
}
