<?php
/**
 * Class loader using SPL autoloader.
 */
class YALI_Autoloader {

	/**
	 * Path to look for classes
	 *
	 * @var string
	 */
	private static $base_path;

	/**
	 * Registers Autoloader as an SPL autoloader.
	 */
	public static function register( $base_path ) {
		self::$base_path = $base_path;

		spl_autoload_register( array(__CLASS__, 'autoload') );
	
	}

	 /**
   * Recursively autoload classes in directory
   *
   * @param  string $class
   * @param  string $dir
   * @return bool
   */
  public static function autoload( $class, $dir = null ) {
	
    if ( is_null( $dir ) ) {
			 $dir = self::$base_path;
		}
    
    foreach ( scandir( $dir ) as $file ) {
      // directory?
      if ( is_dir( $dir.$file ) && substr( $file, 0, 1 ) !== '.' ) {
				self::autoload( $class, $dir.$file.'/' );
			
			// is file?
			} else {
				if(strpos($file, '_class.php') !== false) {
            require_once $dir . '/' . $file;
        }
			}
    }
  }
	
}