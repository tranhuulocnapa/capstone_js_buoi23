const getlistproduct = () => {
    const promise = axios({
        url: "https://68f5f9ef6b852b1d6f15ab33.mockapi.io/product",
        method: 'GET',
    })

    promise
        .then((result) => {
            console.log(result.data)
            renderproduct(result.data)

        })
        .catch(() => {
            console.log(result)

        })


}
getlistproduct()

const renderproduct = (data) => {
    let product = "";

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        product += `

            <tr>
                <td>${i+1}</td>
                <td>
                  <img src=${element.img} alt=${element.name}>
                </td>
                <td>${element.name}</td>
                <td>${Number(element.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>${element.screen}</td>
                <td>${element.backCamera}</td>
                <td>${element.frontCamera}</td>
                <td>${element.desc}</td>
                <td>${element.type}</td>
                <td class="actions">
                  <button class="btn-edit">
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button class="btn-delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
            </tr>
`

        document.getElementById("product-list").innerHTML = product
    }




}























// Toggle sidebar on mobile
const toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

// Khi click vào nút ☰ thì bật/tắt menu
toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Ngăn chặn click lan ra ngoài
    sidebar.classList.toggle("active");
});

// Khi click ra ngoài menu thì ẩn menu
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove("active");
    }
});