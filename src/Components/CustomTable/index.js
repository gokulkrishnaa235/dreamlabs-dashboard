import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import "./customTable.css";

const Title = [
  "sku",
  "category",
  "description",
  "mc_price",
  "product_image",
  "product_name",
  "weight",
];

const getKey = {
  sku: "SKU",
  category: "Category",
  description: "Description",
  mc_price: "MC Price",
  product_image: "Product Image",
  product_name: "product Name",
  weight: "weight",
};

function CustomTable(props) {
  const { tableData, openEditMode, openViewMode, openDeleteMode } = props;

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            {Title.map((title) => (
              <th key={title}> {getKey[title]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((value) => {
            return (
              <tr key={value.id}>
                <td id="sku">{value.data.sku}</td>

                <td id="category">{value.data.category}</td>

                <td id="description">{value.data.description}</td>

                <td id="mc_price">{value.data.mc_price}</td>

                <td id="product_image">
                  <img
                    className="product_image"
                    src={value.data.product_image}
                    alt={value.data.sku}
                  />
                </td>

                <td id="product_name">{value.data.product_name}</td>

                <td id="weight">{value.data.weight}</td>

                <IconButton onClick={() => openEditMode(value)}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => openViewMode(value)}>
                  <VisibilityIcon />
                </IconButton>

                <IconButton onClick={() => openDeleteMode(value.id)}>
                  <DeleteIcon />
                </IconButton>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default memo(CustomTable);
