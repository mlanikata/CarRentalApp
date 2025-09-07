async function fetchModels() {

    const response = await fetch("https://car-rental-api.up.railway.app/car");
    
    const data = await response.json();
    
    const models = data.data;
    
    return models;
}

async function renderModels() {

    try{

        const modelsList = document.querySelector("#models-list");
        const modelsFilter = document.querySelector(".models__header__sort").value;
      
        modelsList.innerHTML = `<i class="fa-solid fa-spinner models__list__spinner"></i>`;
      
        const models = await fetchModels();
      
          if (modelsFilter === "HIGH_TO_LOW") {
          models.sort((a, b) => b.per_day_price - a.per_day_price);
        } else if (modelsFilter === "LOW_TO_HIGH") {
          models.sort((a, b) => a.per_day_price - b.per_day_price);
        } else if (modelsFilter === "RATING") {
          models.sort((a, b) => b.rating - a.rating);
        }
      
      
        const modelsHTML = models
          .map((model) => {
            return ` <div class="model">
            <img src="https://car-rental-api.up.railway.app/${
              model.image
            }" alt="" class="model__img" />
            <div class="model__details model__details-1">
              <h3 class="model__details__name">${model.make} ${model.model}</h3>
              <h4 class="model__details__price">
               $${Math.floor(
                 model.per_day_price
               )} <span class="model__details__price__span">per day</span>
              </h4>
            </div>
            <div class="model__details model__details-2">
              <div class="model__detail model__detail__rating">
                <i class="model__detail__icon fa-solid fa-star"></i>
                <span class="model__detail__text">${model.rating} / 5</span>
              </div>
              <div class="model__detail model__detail-right">
                <i class="model__detail__icon fa-solid fa-car"></i>
                <span class="model__detail__text">${model.fuel}</span>
              </div>
              <div class="model__detail">
                <i class="model__detail__icon fa-solid fa-car"></i>
                <span class="model__detail__text">${model.make}</span>
              </div>
              <div class="model__detail model__detail-right">
                <i class="model__detail__icon fa-solid fa-car"></i>
                <span class="model__detail__text">${model.transmission}</span>
              </div>
            </div>
            <button class="model__btn">
              <span class="model__btn__span">Book Ride</span>
              <i class="fa-regular fa-circle-check model__btn__icon"></i>
            </button>
          </div>`;
          })
          .join("");
      
        modelsList.innerHTML = modelsHTML;
    }

    catch(e){

    }

}

renderModels();
