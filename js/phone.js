// load the all data

const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


  // display the phones

    const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ='';


    // display the show all button if there are more than 12 phones
    const showAllBtn = document.getElementById('show-all-button');
    if(phones.length > 12 && !isShowAll){
    showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
//    console.log('is show all', isShowAll);

    // display only the first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

     phones.forEach(phone =>{
        // console.log(phones);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`

        // set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p class="text-[#706F6F] my-2">There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions justify-center">
            <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;

    // appendChild
    phoneContainer.appendChild(phoneCard);
     });

    //  hide loading spinner
     toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) =>{
    // load single phone data
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

   }

//  display the single phone data
    const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
     showDetailsContainer.innerHTML = `
         <img src="${phone.image}" alt="" />
        
         <p class="my-4"><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
         <p class="my-4"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
         <p class="my-4"><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
         <p class="my-4"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
         <p class="my-4"><span class="font-bold">Slug: </span>${phone?.slug}</p>
         <p class="my-4"><span class="font-bold">Release date: </span>${phone?.releaseDate}</p>
         <p class="my-4"><span class="font-bold">Brand: </span>${phone?.brand}</p>
         <p class="my-4"><span class="font-bold">GPS: </span>${phone?.others?.GPS}</p>
     `

    //  showing the modal
    show_details_modal.showModal();

   }

// handle search button
    const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
} 

    const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone()