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
            console.log(result)

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


    let isValid = false;

    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        if (element.id === cartItem.id) {
            element.qty += 1;
            isValid = true;
            break;
        }
    }


    if (!isValid) {
        cart.push(cartItem);
    }


    rendermodalcart(cart)
    setlocalStorage()


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
                    <p class="cart-total">Thành tiền: ${(product.qty * product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>

                <div class="cart-updonw">
                    <button class="btn-qty" onclick='hanledonwcart("${product.id}")'>-</button>
                    <button class="btn-qty" onclick='hanleupcart("${product.id}")'>+</button>
                    <i class="fa fa-trash remove-item" onclick='hanleremovecart("${product.id}")'></i>
                </div>
            </li>
        `
    }
    document.getElementById("cart-list").innerHTML = cart;

    let totalprice = 0;
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        totalprice += product.price * product.qty
    }

    document.getElementById("totalprice").innerHTML =
        `
        Tổng tiền: ${Number(totalprice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        `
    let totalqty = 0;
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        totalqty += product.qty
    }

    //reset lại
    document.getElementById("totalqty").innerHTML = "";


    //nếu lớn hơn 0 thì chạy
    if (totalqty > 0) {
        document.getElementById("totalqty").innerHTML = `
            <span class="cart-count">${totalqty}</span>
            `
    }


}


// lưu vào localStorage

const setlocalStorage = () => {
    const localStorageCart = JSON.stringify(cart);

    localStorage.setItem("cart", localStorageCart);
}

// lấy dữ liệu ra ngoài
const getlocalStorage = () => {
    const localStorageCart = localStorage.getItem("cart");

    const datalocalStorageCart = localStorageCart ? JSON.parse(localStorageCart) : [];

    cart = datalocalStorageCart;

    rendermodalcart(cart);
}

getlocalStorage();


//tăng giảm cart

const hanledonwcart = (id) => {

    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];

        if (id === element.id) {
            element.qty -= 1;
        }

        if (element.qty <= 0) {
            cart.splice(i, 1);
        }

    }
    setlocalStorage()
    rendermodalcart(cart)
}
window.hanledonwcart = hanledonwcart;


const hanleupcart = (id) => {

    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];

        if (id === element.id) {
            element.qty += 1;

        }

    }
    setlocalStorage()
    rendermodalcart(cart)
}
window.hanleupcart = hanleupcart;


const hanleremovecart = (id) => {
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];

        if (id === element.id) {
            cart.splice(i, 1);
        }

    }
    setlocalStorage()
    rendermodalcart(cart)
}
window.hanleremovecart = hanleremovecart;


//reset lại giỏ hàng, nhấn nút thanh toán

document.getElementById("cartpay").onclick = () => {

    if (cart.length === 0) {
        alert("Thanh toán không thành công! \nBạn chưa chọn sản phẩm nào")
        return
    }


    localStorage.removeItem("cart")
    getlocalStorage();
    alert("Thanh toán thành công! Giỏ hàng đã được làm mới.");
}

//show menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Khi click nút 3 gạch
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // chặn sự kiện lan ra ngoài
    menu.classList.toggle('show');
});

// Khi click ra ngoài menu → tắt menu
document.addEventListener('click', (e) => {
    // Nếu click không nằm trong menu và không phải là nút toggle
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('show');
    }
});



