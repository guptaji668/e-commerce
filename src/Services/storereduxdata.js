import React from "react";
import { useSelector } from "react-redux";
// import Reduxpractice from "./ReduxPractice";

export default function ReduxData(props) {
  const data = useSelector((x) => x.product);
  var product = Object.values(data);

  function display() {
    return product.map((item) => {
      return (
        <tr>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.class}</td>
          <td>{item.prize}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <table border="1" cellPadding={10} cellSpacing={10}>
        <tr>
          <td>Name</td>
          <td>address</td>
          <td>classs</td>
          <td>prize</td>
        </tr>
        {display()}
      </table>
    </div>
  );
}
