// remove active button
function removeActiveClass (){
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
} 
// button
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}
// all videos 
function loadVideos (){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( res => res.json())
    .then( data => {
        removeActiveClass()
        document.getElementById("btn-all").classList.add("active")
        displayVideos(data.videos)
    })
}

// video details
const loadVideoDetails = (videoID) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}

// details show
const displayVideoDetails = (video) =>{
   document.getElementById("video_details").showModal()

   const detailsContainner = document.getElementById("details_containner")
   detailsContainner.innerHTML =`
   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="video" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title} Title</h2>
    <p>${video.description}</p>
  </div>
</div>
   `

}

// single button
 const loadCategoriesVideos = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        removeActiveClass()
        const clickButton = document.getElementById(`btn-${id}`)
        clickButton.classList.add("active")
        displayVideos(data.category)
    });
 }

// display dynamic button
  function displayCategories(categories){
    const categoriesContainner = document.getElementById("categories-containner");
    
        // category: "Music"
        // category_id: "1001" 

        for(let cat of categories){
            // console.log(cat)
            const categoriesDiv = document.createElement("div")
            categoriesDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `
            categoriesContainner.appendChild(categoriesDiv);
        }
    }

// dynamic videos demo
    // // dynamic videos
    // {
    //     "category_id": "1001",
    //     "video_id": "aaaa",
    //     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    //     "title": "Shape of You",
    //     "authors": [
    //         {
    //             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
    //             "profile_name": "Olivia Mitchell",
    //             "verified": ""
    //         }
    //     ],
    //     "others": {
    //         "views": "100K",
    //         "posted_date": "16278"
    //     },
    //     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    // }

    // 

// display dynamic videos 


const displayVideos = (videos) => {
    const videoContainner = document.getElementById("video-contsinner")

    videoContainner.innerHTML = "";

    if(videos.length === 0){
        videoContainner.innerHTML =`
        <div class="flex flex-col col-span-full justify-center items-center gap-4 py-5">
        <img class="w-32" src="assets/Icon.png" alt="">
        <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no<br> content here</h1>
      </div>
        `
        return;
    }

    videos.forEach(video => {
        console.log(video)

        const videoDiv = document.createElement("div")
        videoDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
        <figure class="relative w-full h-36 object-cover">
          <img 
            src="${video.thumbnail}"
            alt="video" />
            <span class="absolute bottom-2 right-2 p-1 text-white bg-black rounded">3hrs 56 min ago</span>
        </figure>
        <div class=" flex gap-5 py-5 px-4">
          <div class="profile">
            <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>
          <div class="intro">
            <h2 class="text-xl font-semibold mb-1">${video.title}</h2>
            <div class="flex gap-2 mb-1">
              <h3 class="text-sm font-semibold text-gray-400">${video.authors[0].profile_name}</h3>
              <img src="assets/verified.png" alt="">
            </div>
            <p class="text-sm font-semibold text-gray-400">${video.others.views} views</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>
        `
        videoContainner.append(videoDiv);
    });
}

loadCategories()
