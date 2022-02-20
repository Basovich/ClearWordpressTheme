<?php

function spybubble_setup() {

	add_theme_support( 'title-tag' );

	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
            'menu-header' => esc_html__('Menu header', 'ClearWordpressTheme'),
            'menu-best-features' => esc_html__('Best Features', 'ClearWordpressTheme'),
            'menu-about' => esc_html__('About Us', 'ClearWordpressTheme'),
            'menu-service' => esc_html__('Service legal terms', 'ClearWordpressTheme'),
        )
	);
}
add_action( 'after_setup_theme', 'spybubble_setup' );

/**
 * Enqueue scripts and styles.
 */
function true_jquery_register()
{
    if (!is_admin()) {
        wp_deregister_script('jquery');
    }
}
add_action('init', 'true_jquery_register');

function spybubble_scripts() {
    wp_enqueue_style('blog-style', get_template_directory_uri() . '/gulp/css/blog.min.css', array(), filemtime(get_template_directory() . '/gulp/css/blog.min.css'), false);
	wp_enqueue_script( 'blog-script', get_template_directory_uri() . '/gulp/js/blog.min.js', array(), filemtime(get_template_directory() . '/gulp/js/blog.min.js'), true );
}
add_action( 'wp_enqueue_scripts', 'spybubble_scripts' );

/**
 * Disable the emoji's
 */
function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

    // Remove from TinyMCE
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );

/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}


/**
 * Remove Gutenberg Style
 */
function smartwp_remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' );
}
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );