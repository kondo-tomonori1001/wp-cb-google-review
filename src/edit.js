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

import axios from "axios";

export default function Edit({ attributes, setAttributes }) {
	const { apiKey, placeId, res } = attributes;
	const [apiTrue, setApiTrue] = useState(false);

	console.log(res === undefined);

const clickEvent = () => {
	const setApiKey = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=review&key=${apiKey}`
	console.log(setApiKey);
	axios.get(apiKey)
		.then((response) => {
			attributes.res = response.data;
			console.log(res);
			setApiTrue(true);
		})
		.catch((error) => {
			setApiTrue(false);
			console.log('ERROR!! occurred in Backend.')
		});
}

	return (
		<>
			<InspectorControls>
				<PanelBody title="API情報入力">
					<TextControl
						label="APIキー"
						value={attributes.apiKey}
						onChange={(value) => setAttributes({ apiKey: value })}
					/>
					<p>{apiKey}</p>
					<TextControl
						label="ロケーションID"
						value={attributes.placeId}
						onChange={(value) => setAttributes({ placeId: value })}
					/>
					<p>{placeId}</p>
					<button onClick={clickEvent}>表示する</button>
					{apiTrue === false && <p>口コミ情報の取得に失敗しました。正しく情報が入力されているかご確認ください。</p>}
				</PanelBody>
			</InspectorControls>

			<p {...useBlockProps()}>
				{__("Block – hello from the editor!", "block")}
			</p>
			{
				(res !== undefined && apiTrue === true) && res.map((value, key) => {
					return <p key={key}>{value.name}</p>
				})
			}
			{apiTrue && <script src={`https://maps.google.com/maps/api/js?key=${apiKey}&libraries=places`}></script>}
		</>
	);
}
