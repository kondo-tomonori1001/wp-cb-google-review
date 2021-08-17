// 評価を数字から星マークに変換
ratingChange();

function ratingChange(){
  const ratingEl = document.getElementsByClassName('review__rating');
  
  
  for(let i = 0; i < ratingEl.length; i ++){
    const rating = ratingEl[i].getAttribute('data-rating');
    
    for(let j = 1; j <= rating; j++){
      const starEl = document.createElement('i');
      starEl.setAttribute('class','fas fa-star');
      ratingEl[i].appendChild(starEl);
    }
  
    for(let k = rating; k < 5; k++){
      const grayStarEl = document.createElement('i');
      grayStarEl.setAttribute('class','far fa-star');
      ratingEl[i].appendChild(grayStarEl);
    }
  }
}

// 口コミ情報の自動取得
getReview();

function getReview(){
  const el = document.getElementById('review');
  const $el = $('.reviewPublish')
  const apiKey = el.dataset.key;
  const placeId = el.dataset.place;

  $.getScript(
    "https://maps.google.com/maps/api/js?key=" + apiKey + "&libraries=places",
    function () {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
        );
        service.getDetails(
          {
            placeId: placeId,
            fields: ["review"],
          },
        function (place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            const reviews = place.reviews;
            $el.empty();
            for(let i = 0; i < reviews.length; i++){
              const item = $(`
                <div class="review__item">
                  <a class="review__link" href=${reviews[i].author_url} target="_blank" rel="noreferrer noopener">
                    <div class="review__user">
                      <img src=${reviews[i].profile_photo_url}>
                      <p>${reviews[i].author_name}</p>
                    </div>
                    <p class="review__rating" data-rating=${reviews[i].rating}></p>
                    <p class="review__text" key=${i}>${reviews[i].text}</p>
                  </a>
                </div>
                `);
              $el.append(item);
            }
            ratingChange();
          }
        }
      );
    }
  );
}