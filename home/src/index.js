import CartItem from "./cartiem.js";


const getListproduct = () => {
    const promise = axios({
        url: "https://68f5f9ef6b852b1d6f15ab33.mockapi.io/product",
        method: 'GET',
    });

    promise
        .then((result) => {
            renderlistproduct(result.data);
            filter(result.data);

        })
        .catch((error) => {
            console.log(error);

        }
        );
}

getListproduct();


const renderlistproduct = (data) => {

    let producthtml = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];

        producthtml += `
    <div class="card">
        <div class="card__image">
            <img src=${product.img} alt=${product.type} />
        </div>
        <div class="card__body">
            <h3 class="card__title">${product.name}</h3>
            <p class="card__desc">${product.desc}</p>
            <ul class="card__specs">
                <li><strong>Màn hình: </strong>${product.screen}</li>
                <li><strong>Camera sau: </strong>${product.backCamera}</li>
                <li><strong>Camera trước: </strong>${product.frontCamera}</li>
                <li><strong>Loại: </strong>${product.type}</li>
            </ul>
            <div class="card__bottom">
                <span class="price">${Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <button class="btn-buy" onclick='hanlecart(${JSON.stringify(product)})'>
                    <i class="fa-solid fa-cart-shopping"></i> Mua ngay
                </button>
            </div>
        </div>
    </div>
            `;
    }

    document.getElementById("product-list").innerHTML = producthtml


}



//filter lọc hiển thị danh sách sản phẩm

const filter = (data) => {

    document.getElementById("filter").addEventListener("change", () => {
        const type = document.getElementById("filter").value;
        let filttproduct = [];
        if (type === "all") {
            renderlistproduct(data);
            return
        }

        for (let i = 0; i < data.length; i++) {
            const product = data[i];

            if (product.type === type) {
                filttproduct.push(product);
            }
        }
        renderlistproduct(filttproduct);
    })
}


// giỏ hàng

const createCartItem = (product) => {
    const id = product.id
    const name = product.name
    const price = product.price
    const img = product.img
    const qty = 1

    const giohang = new CartItem(id, name, price, img, qty)
    return giohang


}





let cart = [];

const hanlecart = (product) => {

    const cartItem = createCartItem(product)


    let found = false;

    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        if (element.id === cartItem.id) {
            element.qty += 1;
            found = true;
            break;
        }
    }


    if (!found) {
        cart.push(cartItem);
    }


    rendermodalcart(cart)

    // rendercart(cart)
}

window.hanlecart = hanlecart


//modal giỏ hàng
const rendermodalcart = (data) => {
    let cart = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        cart += `
            <li>
                <img src=${product.img} alt=${product.type} />
                <div class="cart-info">
                  <p class="cart-name">${product.name}</p>
                  <p class="cart-qty">Số lượng: ${product.qty}</p>
                  <p class="cart-price">${Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
                <div class="cart-updonw">
                    <button class="btn-qty" onclick='hanledonwcart(${product.id})'>-</button>
                    <button class="btn-qty" onclick='hanleupcart(${product.id})'>+</button>
                    <i class="fa fa-trash remove-item" onclick='hanleremovecart(${product.id})'></i>
                </div>
            </li>
        `
    }
    document.getElementById("cart-list").innerHTML = cart;

    let totalprice = 0;
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        totalprice += product.price
    }

    document.getElementById("totalprice").innerHTML =
        `
            Tổng: <strong>${Number(totalprice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
        `
    let totalqty = 0;
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        totalqty += product.qty
    }

    document.getElementById("totalqty").innerHTML = `
    <span class="cart-count">${totalqty}</span>
    `
}

//tăng giảm cart

const hanledonwcart = (id) => {
    console.log(id);
}
window.hanledonwcart = hanledonwcart;


const hanleupcart = (id) => {
    console.log(id);
}
window.hanleupcart = hanleupcart;

const hanleremovecart = (id) => {
    console.log(id);
}
window.hanleremovecart = hanleremovecart;
