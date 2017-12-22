import { h } from 'hyperapp';

export const Filter = ({ options, selected, setFilter }) => {
  return (
    <div class="filters">
      {options.map(option => (
        <FilterOption
          option={option}
          selected={option === selected}
          setFilter={() => setFilter(option)}
        />
      ))}
    </div>
  );
};

const FilterOption = ({ option, selected, setFilter }) => (
  <div
    key={option}
    onclick={setFilter}
    class={`filters__item ${selected ? 'filters__item--active' : ''}`}
  >
    {option}
  </div>
);
