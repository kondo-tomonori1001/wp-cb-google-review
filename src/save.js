/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const { apiKey, placeId, res } = attributes;

  return (
    <div id="review" className="review reviewPublish" data-key={apiKey} data-place={placeId}>
      {
        res !== undefined && (res.map((value, key) => {
          return (
            <>
              <div className="review__item">
                <a className="review__link" href={value.reviewUrl} target="_blank" rel="noreferrer noopener">
                  <div className="review__user">
                    <img src={value.profile_photo_url}/>
                    <p>{value.author_name}</p>
                  </div>
                  <p className="review__rating" data-rating={value.rating}></p>
                  <p className="review__text" key={key}>{value.text}</p>
                </a>
              </div>
            </>
          )
        }))
      }
    </div>
  );
  
}
