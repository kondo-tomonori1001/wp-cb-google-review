/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, SelectControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import $ from "jquery";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { apiKey, apiStatus, placeId, locationData, selectPlaceName, res } = attributes;
  // APIのajax通信を判定
  const [apiTrue, setApiTrue] = useState(false);
  // 口コミ更新用フック
  const [reviews,setReviews] = useState();
  // 箇所候補の更新用
  const [places,setPlaces] = useState();

  console.log(apiKey,res,apiStatus,placeId);
  const clickEvent = () => {
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
            console.log(status);
            if (status === "INVALID_REQUEST"){
              attributes.apiStatus = "false";
              attributes.res = '';
              setApiTrue(false);

              console.log('error');
            }
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              console.log("reviews" in place);
              // 口コミURL
              if(!("reviews" in place)){
                alert('口コミ情報が登録されていません');
                return;
              }
              if(place.reviews.length === 0){
                alert('口コミ情報が登録されていません');
                return;
              }
              for(let i = 0; i < place.reviews.length; i ++){
                const originUrl = place.reviews[i].author_url;
                const originUrlArray =originUrl.split('/');
                originUrlArray.pop();
                originUrlArray.push('place');
                originUrlArray.push(placeId);
                const reviewUrl = originUrlArray.join('/');
                place.reviews[i].reviewUrl = reviewUrl;
              }
              console.log(place.reviews);

              attributes.res = place.reviews;
              attributes.apiStatus = "true";
              setApiTrue(true);
              setReviews(place.reviews);
              
            }
          }
        );
      }
    );
  };

  const getFromLocation = () => {
    $.getScript("https://maps.google.com/maps/api/js?key=" + apiKey + "&libraries=places")
      .done(function () {
        const locationDataArray = locationData.split(',');
        const pos = new google.maps.LatLng(Number(locationDataArray[0]), Number(locationDataArray[1]));
        const service = new google.maps.places.PlacesService(
          document.createElement("div")
          );
          service.nearbySearch(
            {
              location: pos,
              radius: '3',
            },
          function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              console.log(place);
              const selectList = [{value: null, label: 'Select an Option', disabled: true}];
              for(let i = 0; i < place.length; i++){
                const item = {
                  value:place[i].place_id,
                  label:place[i].name
                }
                selectList.push(item);
              }
              attributes.selectPlaceName = selectList;
              console.log(selectList);
              // 再度レンダリングさせるためにフックで更新
              setPlaces(selectList);
            }
          }
        );
      }
    )
  }

  const settingApiLinkArray = document.getElementById('admin-js').getAttribute('src').split('/');
  const settingApiLink = settingApiLinkArray.slice(0,settingApiLinkArray.length - 1).join('/');
  // console.log(settingApiLink);

  return (
    <>
      <InspectorControls>
        <PanelBody title="API情報入力" initialOpen={false}>
          <a href={`${settingApiLink}/setting_api.pdf`} target="_blank" className="setting-link">APIキーの取得方法</a>
          <TextControl
            label="APIキー"
            value={attributes.apiKey}
            onChange={(value) => setAttributes({ apiKey: value })}
          />
        </PanelBody>
        <PanelBody title="GoogleMapの位置情報の入力" initialOpen={false}>
          <a href={`${settingApiLink}/setting_location.pdf`} target="_blank" className="setting-link">位置情報の取得方法</a>
          <TextControl
            label="位置情報（緯度・経度）の入力"
            value={attributes.locationData}
            onChange={(value) => setAttributes({ locationData: value })}
            className="u-mb10"
            />
          <Button variant="primary" className="is-primary u-mb24" onClick={getFromLocation}>位置情報を設定する</Button>
          <SelectControl
            label="箇所を選択する"
            value={attributes.placeId}
            options = {attributes.selectPlaceName}
            onChange = {(value) => setAttributes({ placeId: value })}
            />
          <TextControl
            label="ロケーションID（直接指定も可能です）"
            value={attributes.placeId}
            onChange={(value) => setAttributes({ placeId: value })}
            className="u-mb10"
          />
          <p>直接指定する場合の検索は<a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank">こちら</a></p>
          <Button variant="primary" className="is-primary" onClick={clickEvent}>口コミ情報を表示する</Button>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className="review">
          {apiStatus === "true" && res !== "" && res.map((value, key) => {
              return (
                <div className="review__item" key={`review-${key}`}>
                  <a className="review__link" href={value.reviewUrl} target="_blank" rel="noreferrer noopener">
                    <div className="review__user">
                      <img src={value.profile_photo_url}/>
                      <p>{value.author_name}</p>
                    </div>
                    <p className="review_rating" data-rating={value.rating}>星の数：{value.rating}</p>
                    <a className="review__text">{value.text}</a>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
