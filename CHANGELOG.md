# Change Log
##### All notable changes to this project will be documented in this file.

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
