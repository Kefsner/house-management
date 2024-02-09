export default function Categories(props) {
    return (
        <section className="finances-categories-section">
      <button
        className="add-category-button"
        onClick={() => props.openModal("add-category")}
      >
        Add Category
      </button>
      <table className="categories-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Subcategories</th>
          </tr>
        </thead>
        <tbody>
          {props.categories.map((category) => (
            <tr key={category.id}>
              <td>{category.type}</td>
              <td>{category.name}</td>
              <td>{category.subcategories.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="add-button"
        onClick={() => {
          props.openModal("add-transaction");
        }}
      >
        +
      </button>
      </section>
    )
}