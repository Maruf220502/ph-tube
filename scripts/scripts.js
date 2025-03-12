
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function loadVideos (){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( res => res.json())
    .then( data => displayVideos(data.videos))
}
  function displayCategories(categories){
    const categoriesContainner = document.getElementById("categories-containner");
    
        // category: "Music"
        // category_id: "1001" 

        for(let cat of categories){
            // console.log(cat)
            const categoriesDiv = document.createElement("div")
            categoriesDiv.innerHTML = `
            <button class="btn hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `
            categoriesContainner.appendChild(categoriesDiv);
        }
    }

// dynamic button
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
const displayVideos = (videos) => {
    const videoContainner = document.getElementById("video-contsinner")

    videos.forEach(video => {
        console.log(video)

        const videoDiv = document.createElement("div")
        videoDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="video" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>
        `
        videoContainner.append(videoDiv);
    });
}

loadCategories()
loadVideos()