const handleTab = async () => {
    // fetching data
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    //  get tabcontainer div
    const tabContainer = document.getElementById('tab-container');
    const categoryName=await data.data;
     
    categoryName.forEach( tab => {
         const div = document.createElement('div');
         div.innerHTML=`
         <a onclick="handleTabClick('${tab.category_id}')" class="tab  hover:bg-[#FF1F3D] hover:text-white text-xl font-semibold bg-slate-200 px-6 pb-1 rounded-lg">${tab.category}</a>
         `
         tabContainer.appendChild(div);
    });
 
}

const handleTabClick =async (categoryId='1000') => {
       const response= await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
       const data = await response.json();
    
       const cardsContainer =document.getElementById('cards-container');
       cardsContainer.innerHTML=``;
    //    get empty div to show error message 
       const noDataDiv=document.getElementById('no-data-div');
    //    check whether the api link is empty or not
       if(data.data.length===0){
           noDataDiv.classList.remove('hidden');
       }
       else{
        noDataDiv.classList.add('hidden');
       }

        data.data.forEach(item => {
        const hours=Math.floor(item.others.posted_date/3600);
        const minutes=(((item?.others?.posted_date/3600)-hours)*60).toFixed(0);
       
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="card w-auto h-80 bg-base-100 shadow-xl p-2 relative">
        
          <figure class="h-40  mb-8 "><img  src="${item.thumbnail}" alt="Item Photo" /></figure>
          <p class="bg-slate-700 text-white absolute right-4 top-32 px-1 rounded-lg">${item?.others?.posted_date? `${hours} hrs ${minutes} min ago`  : ''}</p>
        
         <div class="flex gap-4">

          <div>
            <img class="w-10 h-10 rounded-full" src="${item?.authors[0]?.profile_picture}" alt="Author Photo">
          </div>

          <div class="">
            <h4 class="text-lg font-semibold" >${item?.title}</h4>
            <div class="flex items-center">
            <p class="me-2 my-2">${item?.authors[0]?.profile_name}</p>
            
             <p class="me-2 my-2">${item?.authors[0]?.verified? `<i class="fa-solid fa-circle-check text-[#2568EF] text-lg"></i>` : ''}</p>

             </div>
                <p>${item?.others?.views}</p>
           </div>

        </div>
      </div>
        `;
          cardsContainer.appendChild(div);
       });
}

// handle blog button
const handleBlogBtn = () => {
    console.log('blog');
    window.location.href='./blog.html';
}

handleTab();
handleTabClick();