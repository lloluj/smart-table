import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  // Очистка полей фильтров (опциональный шаг)
  Object.keys(indexes).forEach((elementName) => {
    if (elements[elementName]) {
      // Очищаем все существующие опции в выпадающем списке
      elements[elementName].innerHTML = "";
    }
  });

  // Заполнение выпадающих списков данными
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        // Создаём элемент <option>
        const option = document.createElement("option");
        option.value = name; // Устанавливаем значение атрибута value
        option.textContent = name; // Устанавливаем текстовое содержимое опции
        return option; // Возвращаем созданный элемент
      }),
    );
  });
  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      // Получаем родительский элемент кнопки
      const parent = action.closest(".filter-group"); // предполагаем, что кнопка и input находятся в контейнере с классом .filter-group

      if (parent) {
        // Находим поле ввода в родительском элементе
        const input = parent.querySelector("input");

        if (input) {
          // Сбрасываем значение поля ввода
          input.value = "";

          // Получаем имя поля для очистки из атрибута data-field кнопки
          const fieldName = action.dataset.field;

          if (
            fieldName &&
            state.filters &&
            state.filters[fieldName] !== undefined
          ) {
            // Сбрасываем соответствующее поле в state
            state.filters[fieldName] = "";
          }
        }
      }
    }
    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter(row => compare(row, state));
  };
}
