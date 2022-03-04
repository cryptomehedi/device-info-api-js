// *select all id and class 
const searchField = document.querySelector('.phone-name-input');
const searchButton = document.querySelector('#search-button');
const phoneDetails = document.querySelector('#phone-details');
const phoneContainer = document.querySelector('.phone-container');
const warningMessage = document.querySelector('.warning-message');
const spinnerShow = document.querySelector('#spinner-show');

// *search validation & api data collect
const searchPhone = () =>{
    spinnerLoad ('block');
    if(!isNaN(searchField.value)){
            emptyValue()
            const div = document.createElement('div');
                div.classList.add ('flex');
                div.classList.add ('justify-center');
                div.classList.add ('p-4');
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('font-bold');
                p.classList.add('text-4xl');
                p.classList.add('text-red-500');
                p.innerText = ` Your Search Field Is Empty`;
                div.appendChild(p)
                warningMessage.appendChild(div)
                spinnerLoad ('none');
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`
        emptyValue();
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
    }
}
// *API search validation 
const displaySearchResult = phonesData =>{
    if(phonesData.status == false ){
            const div = document.createElement('div');
                div.classList.add ('flex');
                div.classList.add ('justify-center');
                div.classList.add ('p-4');
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('font-bold');
                p.classList.add('text-4xl');
                p.classList.add('text-red-500');
                p.innerText = `Search Result Not Found`;
                div.appendChild(p)
                warningMessage.appendChild(div)
    }else{
        const phones = phonesData.data
        phones.slice(0,20).forEach (phone =>{
            const div = document.createElement('div');
            div.classList.add ('bg-orange-200');
            div.classList.add ('m-8');
            div.classList.add ('p-4');
            div.classList.add ('rounded');
            div.classList.add ('shadow-xl');
            div.classList.add ('hover:shadow-2xl');
            div.classList.add ('shadow-slate-800');
            div.classList.add ('hover:shadow-neutral-800');
            div.classList.add ('hover:opacity-90');
            const p = document.createElement('p');
            p.innerHTML = `
            <div class="bg-slate-200 rounded p-4">
                <div class="bg-white rounded p-4">
                    <div class="flex">
                    <img class=" px-2" src="${phone.image}">
                    </div><br>
                    <span class="font-semibold text-blue-700">Phone Name:</span> ${phone.phone_name} <br>
                    <span class="font-semibold text-blue-700">Brand :</span> ${phone.brand}<br>
                    <button onclick="showPhoneDetails('${phone.slug}')" class="bg-rose-300 hover:bg-rose-600 px-2 h-8 mt-4 rounded px-2 hover:text-white font-semibold">Phone Details</button>
                </div>
            </div>
            `;
            div.appendChild(p)
            phoneContainer.appendChild(div)
        })
    }
    spinnerLoad ('none');
}
// *API id collection & data process
const showPhoneDetails = phoneSlug =>{
    const url =`https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
// *Display Details Selected Phone 
const displayDetails= data =>{
    phoneDetails.textContent=''
    const div = document.createElement('div');
    div.classList.add ('flex');
    div.classList.add ('justify-center');
    div.classList.add ('p-4');
    const p = document.createElement('p')
    p.classList.add('grid')
    p.classList.add('md:grid-cols-1')
    p.classList.add('lg:grid-cols-2')
    window.scrollTo(0,0)
    p.innerHTML=`
    
        <div class="lg:w-100 sm:w-2/3 px-8 flex sm:justify-center lg:justify-end">
            <img class="" src="${data.image}">
        </div>
        <div class=" bg-orange-200 sm:mt-4 shadow-2xl shadow-slate-500 p-4 rounded">
            <div class="bg-white rounded p-4">
                <span class="font-semibold text-sky-900">Name:</span> ${data.name}<br>
                <span class="font-semibold text-sky-900">Brand:</span> ${data.brand}<br>
                <span class="font-semibold text-sky-900">Release Date:</span> ${data.releaseDate ? data.releaseDate : 'No Release Date Found'}<br>
                <span class="font-semibold text-sky-900">Chip Set:</span> ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet: 'No Chip Set Data Found'}<br>
                <span class="font-semibold text-sky-900">Display Size:</span> ${data.mainFeatures.displaySize ? data.mainFeatures.displaySize : 'No Display Size Data Found'}<br>
                <span class="font-semibold text-sky-900">Memory:</span> ${data.mainFeatures.memory ? data.mainFeatures.memory : 'No Data Found'}<br>
                <span class="font-semibold text-sky-900">Storage:</span> ${data.mainFeatures.storage ? data.mainFeatures.storage : 'No Data Found'}<br>
                <span class="font-semibold text-sky-900">Sensor:</span> ${data.mainFeatures.sensors ? data.mainFeatures.sensors : 'No Data Found'}<br>
                <hr><span class="text-xl text-amber-600">Other</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">Bluetooth:</span> ${data.others?.Bluetooth ? data.others?.Bluetooth : 'No Bluetooth Data Found'}</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">GPS:</span> ${data.others?.GPS ? data.others?.GPS: 'No GPS Data Found'}</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">NFC:</span> ${data.others?.NFC ? data.others?.NFC : 'No NFC Data Found'}</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">Radio:</span> ${data.others?.Radio ? data.others?.Radio: 'No Radio Data Found'}</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">USB:</span> ${data.others?.USB ? data.others?.USB : 'No USB Data Found'}</span><br>
                <span class="ml-8"><span class="font-semibold text-sky-900">WLAN:</span> ${data.others?.WLAN ? data.others?.WLAN : 'No WLAN Data Found'}</span>
                
                
            </div>
        </div>
    `;
    div.appendChild(p)
    phoneDetails.appendChild(div)
}

// *Empty value function  
const emptyValue = () => {
    searchField.value=''
    phoneDetails.textContent=''
    warningMessage.textContent=''
    phoneContainer.textContent=''
}
// *spinner add and close function
const spinnerLoad = (param) =>{
    
    spinnerShow.innerHTML = `
    <p class="inline-flex  items-center font-semibold leading-6 text-sm shadow rounded-md transition ease-in-out duration-150 hover:bg-gray-600 hover:text-white bg-gray-200 text-black border rounded-lg p-2 m-2 ring  focus:ring-offset-2 focus:ring-offset-orange-500">
        <!-- <i class="fas fa-spinner"></i> -->
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading ...
        </p>
    `
    spinnerShow.style.display = param
}