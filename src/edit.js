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
import { PanelBody, TextControl } from "@wordpress/components";
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
	const { apiKey, apiStatus, placeId, res } = attributes;
	const [apiTrue, setApiTrue] = useState(false);

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
							console.log(place.reviews);
							attributes.res = place.reviews;
							attributes.apiStatus = "true";
							setApiTrue(true);
						}
					}
				);
			}
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="API情報入力">
					<TextControl
						label="APIキー"
						value={attributes.apiKey}
						onChange={(value) => setAttributes({ apiKey: value })}
					/>
					<TextControl
						label="ロケーションID"
						value={attributes.placeId}
						onChange={(value) => setAttributes({ placeId: value })}
					/>
					<button onClick={clickEvent}>口コミ情報を表示する</button>
					{apiStatus === "false" && (
						<p>口コミ情報の取得に失敗しました。正しく情報が入力されているかご確認ください。</p>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="review">
					{apiStatus === "true" && res !== "" && res.map((value, key) => {
							return (
								<div className="review__item" key={`review-${key}`}>
									<p className="review_rating" data-rating={value.rating}>星の数：{value.rating}</p>
									<p className="review_text">{value.text}</p>
								</div>
							)
						})
					}
				</div>
			</div>
		</>
	);
}
