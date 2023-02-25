let allData;
const loadData = async (searchText) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        allData = data.meals;
        displayData(data.meals.slice(0, 6));
    }
    catch (err) {
        console.log(err)
    }
}

const displayData = (meals) => {
    const container = document.getElementById('container');
    container.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('card-side');
        div.classList.add('bg-base-100');
        div.innerHTML = `
        <figure>
          <img style="height:200px"
            class="rounded-r-xl w-full h-full"
                src="${meal.strMealThumb}"
                alt="Movie" />
        </figure>          
        <div class="card-body">
            <h2 class="card-title">
                ${meal.strMeal}
            </h2>
            <p>${meal.strInstructions.slice(0, 50)}
            </p>
            <a onclick="allDetails(${meal.idMeal})" class="text-[#fbbd23] font-bold underline"
                href=""><label for="my-modal-6" class="">View Details</label></a>
                
        </div>
        `;
        container.appendChild(div)
    });
}

const inputFiled = document.getElementById('inputFiled');
const searchText = () => {
    const inputValue = inputFiled.value;
    loadData(inputValue);
    inputFiled.value = '';
}

const showAll = () => {
    displayData(allData)
}
loadData('fish');

// show all food

const allDetails = async (idMeal) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        const res = await fetch(url);
        const data = await res.json();
        allDetailsDisplay(data.meals[0])
    }
    catch (err) {
        console.log(err)
    }
}

const allDetailsDisplay = (meal) => {
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = `
    <h3 class="font-bold text-lg mb-4">${meal.strMeal}</h3>
    <img class="w-full h-64 rounded-lg" src="${meal.strMealThumb}"/>
            <p class="py-4"><span class="font-bold">Category</span> : ${meal.strCategory}</p>
            <p class="py-4"><span class="font-bold">Area</span> : ${meal.strArea}</p>
            <p class="py-4"><span class="font-bold">Instructions</span> : ${meal.strInstructions.slice(0, 200)}</p>
            <p class="py-4"><span class="font-bold">Youtube</span> : <a href="https://www.youtube.com/">https://www.youtube.com/</a></p>
            <div class="modal-action">
                <label for="my-modal-6"
                class="btn btn-error">Cancel</label>
            </div>
    `
}
