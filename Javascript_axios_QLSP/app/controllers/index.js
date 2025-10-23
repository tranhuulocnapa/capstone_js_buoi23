import ApiServices from "./../services/apiServices.js";
import Product from "./../models/product.js";

const api = new ApiServices();

const getEle = (id) => {
  return document.getElementById(id);
};

const getListProduct = () => {
  const promise = api.getListProductApi();

  promise
    .then((result) => {
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

const renderListProduct = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    contentHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="./../../assets/img/${product.image}" width="50" />
            </td>
            <td>${product.description}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditProduct(${
                product.id
              })">Edit</button>
              <button class="btn btn-danger" onclick="handleDeleteProduct(${
                product.id
              })">Delete</button>
            </td>
        </tr>
    `;
  }

  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};

/**
 * Handle Edit Product
 */
const handleEditProduct = (id) => {
  // Update modal title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";

  // create "Update Product" button
  const updateProductBtn = `<button class="btn btn-primary" onclick="handleUpdateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML =
    updateProductBtn;

  // get product by id
  const promise = api.getProductByIdApi(id);

  promise
    .then((result) => {
      const product = result.data;
      // fill data to form
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("HinhSP").value = product.image;
      getEle("Mota").value = product.description;
      getEle("Rating").value = product.rating;
    })
    .catch((error) => {
      console.log(error);
    });
};

window.handleEditProduct = handleEditProduct;

/**
 * Handle Update Product
 */
const handleUpdateProduct = (id) => {
  // Get data from user input
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const image = getEle("HinhSP").value;
  const description = getEle("Mota").value;
  const rating = getEle("Rating").value;

  // create object product
  const product = new Product(id, name, price, description, image, rating);

  // update product to server
  const promise = api.updateProductApi(product);

  promise
    .then((result) => {
      const product = result.data;
      // re-render list product
      getListProduct();
      // close modal
      document.getElementsByClassName("close")[0].click();
      // alert success
      alert(`Update product id=${product.id} successfully!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.handleUpdateProduct = handleUpdateProduct;

/**
 * Handle Delete Product
 */
const handleDeleteProduct = (id) => {
  const promise = api.deleteProductApi(id);

  promise
    .then((result) => {
      // re-render list product
      getListProduct();
      // alert success
      alert(`Delete product id=${result.data.id} successfully!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.handleDeleteProduct = handleDeleteProduct;

/**
 * Xu ly UI Add Product
 */
getEle("btnThemSP").onclick = () => {
  // Update modal title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  // create "Add Product" button
  const addProductBtn = `<button class="btn btn-primary" onclick="handleAddProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = addProductBtn;
};

/**
 * Add Product
 */
const handleAddProduct = () => {
  // Get data from user input
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const image = getEle("HinhSP").value;
  const description = getEle("Mota").value;
  const rating = getEle("Rating").value;

  // create object product
  const product = new Product("", name, price, description, image, rating);

  // add product to server
  const promise = api.addProductApi(product);
  promise
    .then((result) => {
      // re-render list product
      getListProduct();
      // close modal
      document.getElementsByClassName("close")[0].click();
      // alert success
      alert(`Add product id=${result.data.id} successfully!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.handleAddProduct = handleAddProduct;
