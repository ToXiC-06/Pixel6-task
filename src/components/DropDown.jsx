export default function DropDown({ title, content, handleChange }) {
  return (
    <select
      onChange={handleChange}
      className="border-0 rounded bg-dark text-white p-1"
    >
      <option value={title}>{title}</option>
      {content.map((item) => (
        <option value={item} key={item}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
