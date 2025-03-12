function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));

}

function loadvideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((respon) => respon.json())
        .then((data) => displayVideos(data.videos))
}
function displayCategories(categories) {
    const categoriesContainer = document.getElementById("category-container");

    for (let cat of categories) {
        // console.log(cat)


        const div = document.createElement("div");
        div.innerHTML = `
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    
          `;
        categoriesContainer.append(div);

    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videos.forEach(video => {
        console.log(video)
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
       <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="" />
                <span class="absolute bottom-2 right-2 text-white  bg-black px-2 text-sm rounded">3hrs 56 min
                    ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">

                <div class="profile">

                    <div class="avatar">

                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div >
                    </div >
                </div >
    <div class="intro">

        <h2 class="text-sm">Midnight Serenade
        </h2>
        <p class="text-sm text-gray-400 flex gap-1">
        ${video.authors[0].profile_name}     <img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                alt="">
        </p>
        <p class="text-sm text-gray-400">${video.others.views} views</p>
    </div>

            </div >
        </div >
    `;
        videoContainer.appendChild(videoCard)
    });

}

loadCategories()




