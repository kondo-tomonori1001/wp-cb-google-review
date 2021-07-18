<?php
/**
 * Plugin Name:       GoogleReview
 * Description:       Googleマップに表示される口コミ情報を取得するプラグインです。
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            KON
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_block_block_init() {
  register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'create_block_block_block_init' );

// メニュー追加
function add_menu(){
  add_menu_page( 'GooglePlacesAPI','GooglePlacesAPI','manage_options','get_api','add_page','dashicons-align-left');
}
// add_action( 'admin_menu', 'add_menu' );

function add_page(){
  ?>
  <h2>GooglePlaces口コミ情報出力プラグイン</h2>
  <label>
    APIキー
    <input type="text" value="<?php echo get_option('apiKey'); ?>"">
  </label>
  <label>
    プレイスID
    <input type="text">
  </label>
  <?php
}

// font-awesome
function enqueue_scripts(){
  wp_enqueue_style('fontawesome','https://use.fontawesome.com/releases/v5.2.0/css/all.css');
  }

add_action('wp_enqueue_scripts','enqueue_scripts');

// JSフック
function add_js(){
  wp_enqueue_script(
    'custom.js',
    plugins_url('/googleReview/custom.js'),
    // plugins_url('/block/custom.js'),
    array(),
    false,
    true
  );
}
add_action( 'wp_enqueue_scripts', 'add_js' );

function my_admin_footer_script() {
  wp_enqueue_script( 
    'admin', 
    plugins_url('/googleReview/admin.js'),
    // plugins_url('/block/admin.js'),
    '',
    false,
    true
  );
}
add_action('admin_enqueue_scripts', 'my_admin_footer_script');
?>