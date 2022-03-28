const FilterButton = ({ setFilter, isFiltered }) => {
  return (
    <button
      className="btn"
      id="filter-btn"
      onClick={() => setFilter(!isFiltered)}
    >
      {isFiltered ? "show all" : "show netflix only"}
    </button>
  );
};

export default FilterButton;
