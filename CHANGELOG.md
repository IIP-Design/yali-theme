# Change Log
##### All notable changes to this project will be documented in this file.

## [v1.4.4](https://github.com/IIP-Design/yali-theme/tree/v1.4.4) (2018-08-02)

**Added:**

- IE targeted Polyfills for CustomEvent and ParentNode.append()
- Styles for IE flexbox layout bugs

**Removed:**

- `dist` and `style.css` from `.gitignore` (temporarily) to allow for reconfiguration of Jenkins build process
  
## [v1.4.3](https://github.com/IIP-Design/yali-theme/tree/v1.4.3) (2018-07-30)

**Fixed:**

- Fixed declaration of post list with filters language object in twig template
  
## [v1.4.2](https://github.com/IIP-Design/yali-theme/tree/v1.4.2) (2018-07-30)

**Features:**

- Added custom attachment field for attribution and the option to display media attribution for featured images
- Added a meta box option to preselect a content language when creating a post list with filters

**Changed:**

- Moved React course styles to `partials/_courses.scss` from `page-templates/courses/_courses.scss`
- Replaced `is_page_template` with `has_shortcode` in `functios.php` for less brittle conditional loading of CDP article feed assets

## [v1.4.1](https://github.com/IIP-Design/yali-theme/tree/v1.4.1) (2018-07-26)

**Features:**

- Switched to names from slugs in single template to fix 'You May Also Like' section.


## [v1.4.0](https://github.com/IIP-Design/yali-theme/tree/v1.4.0) (2018-07-25)

**Features:**

- Updated custom_taxonomies references to site_taxonomies.
- Removed aggregation of video categories.
- Updated getCategories to use yali site only categories (from site_taxonomies.categories).
- Fixed issue where YALI JS was generating slug values based on Series' names for the queries. Removed this.
- Updated tags, series, and categories to produce a query that aligns with new schema (no slugs).
- Changed id to post_id where referenced.
- Augmented getCategories and getLanguages to aggregate terms from BOTH video and other document types (unit.language vs language.).
- Changed taxonomies property references to custom_taxonomies as well as sub property names (e.g. slug vs name).
- Augmented appendQry to react differently when given an array of fields (ORs them together now).
- Augmented reduceQry to parenthesize groupings.

## [v1.3.16](https://github.com/IIP-Design/yali-theme/tree/v1.3.16) (2018-06-19)

**Features:**

- Add metabox to the content block admin to select pages from the site (excludes course pages)
- Add Twig partial to display the page list content block on the frontend (modeled on CDP post list)
