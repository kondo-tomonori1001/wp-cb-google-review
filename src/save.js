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
	const { placeId, res } = attributes;

	return (
		<div className="review">
			{
				res !== undefined && (res.map((value, key) => {
					return (
						<>
							<div className="review__item">
								<div className="review__user">
									<img src={value.profile_photo_url}/>
									<p>{value.author_name}</p>
								</div>
								<p className="review__rating" data-rating={value.rating}></p>
								<a href={value.reviewUrl} target="_blank" rel="noreferrer noopener" className="review__text" key={key}>{value.text}</a>
							</div>
						</>
					)
				}))
			}
		</div>
	);
	
}
