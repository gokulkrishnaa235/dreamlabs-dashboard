import React, { useState } from "react";
import "./dashboard.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
// import Button from "@material-ui/core/Button";
import CustomTable from "../CustomTable";
import Modal from "../Modal";
import Cards from "../Cards";
import db from "../../firebase";

function Dashboard(props) {
  const { tableData } = props;

  const [img, updateImage] = useState("");
  const [modalStatus, updateModalStatus] = useState(false);
  const [sku, updateSku] = useState("");
  const [productName, updateProductName] = useState("");
  const [description, updateDescription] = useState("");
  const [Category, updateCategory] = useState("");
  const [Weight, updateWeight] = useState("");
  const [MCPercent, updateMCPercent] = useState("");
  const [isEditMode, updateEditMode] = useState(false);
  const [id, updateId] = useState("");
  const [isViewMode, updateViewMode] = useState(false);
  const [isDeleteMode, updateDeleteMode] = useState(false);

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (sku && Category && description && MCPercent && Weight && productName) {
      const data = {
        sku,
        category: Category,
        description: description,
        mc_price: MCPercent,
        product_image: img,
        weight: Weight,
        product_name: productName,
      };
      try {
        if (isEditMode) {
          const res = await db.collection("inventory").doc(id).set(data);
          console.log("updated data successfully !!", res);
        } else {
          const res = await db.collection("inventory").add(data);
          console.log("added data successfully !!", res);
        }
        updateImage("");
        updateSku("");
        updateProductName("");
        updateDescription("");
        updateCategory("");
        updateWeight("");
        updateMCPercent("");
        updateId("");
        updateModalStatus(false);
      } catch (e) {
        console.log("error while updating data ", e);
      }
    }
  }

  async function deleteData() {
    try {
      const res = await db.collection("inventory").doc(id).delete();
      console.log("data deleted successfully", res);
      updateId("");
      updateDeleteMode(false);
    } catch (e) {
      console.log("error occurred while deleting data");
    }
  }

  const openDeleteMode = (id) => {
    updateId(id);
    updateDeleteMode(true);
  };

  const uploadImage = (e) => {
    try {
      var file = e.target.files[0];
      var storageRef = firebase.storage().ref("img/" + file.name);
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log("File available at", downloadURL);
          updateImage(downloadURL);
        });
        // console.log("Uploaded a blob or file!", snapshot);
      });
    } catch {
      console.log("error while uploading image");
    }
  };

  const openEditMode = (value) => {
    const { id = "", data = {} } = value;
    const {
      product_image,
      sku,
      product_name,
      description,
      category,
      weight,
      mc_price,
    } = data;
    updateModalStatus(true);
    updateImage(product_image);
    updateSku(sku);
    updateProductName(product_name);
    updateDescription(description);
    updateCategory(category);
    updateWeight(weight);
    updateMCPercent(mc_price);
    updateId(id);
    updateEditMode(true);
  };

  const openViewMode = (value) => {
    const { id = "", data = {} } = value;
    const {
      product_image,
      sku,
      product_name,
      description,
      category,
      weight,
      mc_price,
    } = data;
    updateModalStatus(true);
    updateImage(product_image);
    updateSku(sku);
    updateProductName(product_name);
    updateDescription(description);
    updateCategory(category);
    updateWeight(weight);
    updateMCPercent(mc_price);
    updateId(id);
    updateViewMode(true);
  };

  const closeModal = () => {
    updateImage("");
    updateSku("");
    updateProductName("");
    updateDescription("");
    updateCategory("");
    updateWeight("");
    updateMCPercent("");
    updateId("");
    updateModalStatus(false);
    updateEditMode(false);
    updateViewMode(false);
  };

  const closeDeleteModal = () => {
    updateId("");
    updateDeleteMode(false);
  };

  return (
    <div className="dashboard-container">
      <div className="card-group">
        <Cards label="Monitors" />
        <Cards label="Matches" />
        <Cards label="High Risk Level" />
        <Cards label="Warning Watch List" />
        <Cards label="assignments" />
      </div>

      <Button
        variant="contained"
        className="setting-icon"
        color="secondary"
        onClick={() => updateModalStatus(true)}
      >
        Add New +
      </Button>

      <CustomTable
        tableData={tableData}
        openEditMode={(value) => openEditMode(value)}
        openViewMode={(value) => openViewMode(value)}
        openDeleteMode={(value) => openDeleteMode(value)}
      />
      {modalStatus && (
        <Modal header="Add Inventory" updateModalState={() => closeModal()}>
          <React.Fragment>
            <form className="form-container" onSubmit={onSubmitHandler}>
              <label for="sku">SKU</label>
              <br />
              <input
                type="text"
                id="sku"
                name="sku"
                value={sku}
                onChange={(e) => updateSku(e.target.value)}
                required
                disabled={isViewMode}
              />
              <br />
              <label for="productName">Product Name</label>
              <br />
              <input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => updateProductName(e.target.value)}
                required
                disabled={isViewMode}
              />
              <br />

              <label for="Category">Category</label>
              <br />
              <input
                type="text"
                id="Category"
                name="Category"
                value={Category}
                onChange={(e) => updateCategory(e.target.value)}
                required
                disabled={isViewMode}
              />
              <br />
              <label for="Weight">Weight</label>
              <br />
              <input
                type="text"
                id="Weight"
                name="Weight"
                value={Weight}
                onChange={(e) => updateWeight(e.target.value)}
                required
                disabled={isViewMode}
              />
              <br />
              <label for="MCPercent">MC Percent</label>
              <br />
              <input
                type="text"
                id="MCPercent"
                name="MCPercent"
                value={MCPercent}
                required
                disabled={isViewMode}
                onChange={(e) => updateMCPercent(e.target.value)}
              />
              <br />
              <label for="image">Product Image</label>
              <br />
              <div className="box">
                {img && (
                  <img src={img} alt="preview" className="image-container" />
                )}
                {!isViewMode ? (
                  <div class="upload-options">
                    <label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage(e)}
                      />
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <br />
              <label for="description">Description</label>
              <br />
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => updateDescription(e.target.value)}
                required
                disabled={isViewMode}
              />
              <br />
              {!isViewMode ? (
                <input type="submit" value={isEditMode ? "update" : "Submit"} />
              ) : (
                ""
              )}
            </form>
          </React.Fragment>
        </Modal>
      )}

      {isDeleteMode && (
        <Modal
          header="Do you really want to delete ?"
          updateModalState={() => closeDeleteModal()}
        >
          <Button
            variant="contained"
            color="secondary"
            className="delete-button"
            onClick={() => deleteData()}
          >
            Delete
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
