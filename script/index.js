
const showLoader = () => {
    document.getElementById('loader').classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden")
}

const hideLoader = () => {
    document.getElementById('loader').classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden")
}



// remove button

function removeButton() {
    const activeButton = document.getElementsByClassName("active");
    for (let btn of activeButton) {
        btn.classList.remove("active");
    }



}

// load categories

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));

}

// / start load video part
function loadvideos(searchText = "") {

    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchText}`)
        .then((respon) => respon.json())
        .then((data) => {
            // remove active button
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        })
}

const loadCategoriesVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeButton()
            const clickButton = document.getElementById(`btn-${id}`)
            clickButton.classList.add("active")
            // console.log(clickButton);
            displayVideos(data.category)
        });
};

const loadvideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))


};

const displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    
  </div>
</div>
    `

};
function displayCategories(categories) {
    const categoriesContainer = document.getElementById("category-container");

    for (let cat of categories) {
        // console.log(cat)


        const div = document.createElement("div");
        div.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    
          `;
        categoriesContainer.append(div);

    }

}
// end load categories


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");



    videoContainer.innerHTML = "";

    if (videos.length === 0) {
        videoContainer.innerHTML = `

        
        <div class="col-span-full flex flex-col justify-center items-center py-20">
            <img class="w-[120px]" src="./assest/Icon - Copy.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>

        
        `;
        hideLoader()
        return;
    }
    videos.forEach(video => {
        // console.log(video)
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
        ${video.authors[0].profile_name}    

        ${video.authors[0].verified == true ? ` <img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                alt=""> ` : `  `}  

        </p>
        <p class="text-sm text-gray-400">${video.others.views} views</p>
    </div>

            </div >
            <button onclick= loadvideoDetails('${video.video_id}') class="btn btn-block">show Details</button>
        </div >
    `;
        videoContainer.appendChild(videoCard)
    });
    hideLoader()

}

document.getElementById("search-input").addEventListener("keyup", (event) => {
    const input = event.target.value;
    loadvideos(input);
})
// end load video part


loadCategories()




