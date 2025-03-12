// function category() {
//     fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//         .then((respon) => respon.json())
//         .then((data) => loadCategories(data.categories));
// }

// function loadCategories(categories) {
//     const container = document.getElementById("category-container");
//     for (let cat of categories) {

//         const div = document.createElement('div');
//         div.innerHTML = `
//           <button class="btn btn-sm  text-white bg-[#FF1F3D] py-2 px-5">${cat.category}</button>
//         `
//         container.appendChild(div);
//     }

// }
// category()