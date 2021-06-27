const ratingEl = document.getElementsByClassName('review_rating');

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
