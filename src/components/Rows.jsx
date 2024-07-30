import { countryToAlpha3 } from "country-to-iso";

export default function Rows({ data }) {
  return (
    <tr>
      <th scope="row">{data.id}</th>
      <td>
        <img src={data.image} width={25} />
      </td>
      <td>{`${data.firstName} ${data.maidenName} ${data.lastName}`}</td>
      <td>{`${data.gender.slice(0, 1).toUpperCase()}/${data.age}`}</td>
      <td>{data.company.title}</td>
      <td>
        {`${data.address.state}, ${countryToAlpha3(data.address.country)}`}
      </td>
    </tr>
  );
}
