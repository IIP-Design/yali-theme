# Change Log
##### All notable changes to this project will be documented in this file.

## [v1.5.4](https://github.com/IIP-Design/yali-theme/tree/v1.5.4)

**Added:**
- Add Bodybuilder `notFilter`s for Podcast and Video taxonomies to the `article` content type query. This prevents `article` queries from returning posts with the `Podcast` or `Video` `content_type` taxonomy, i.e., only articles that are not podcasts or videos are returned.

## [v1.5.3](https://github.com/IIP-Design/yali-theme/tree/v1.5.3)

**Changed:**
- Refactored the conditional call of `addFeed` to handle the `custom` value for the `Select posts by` option since custom selection of posts should not be handled by `query.builder`. If handled by `query.builder`, *all results* will be returned rather than the specifically selected posts.

## [v1.5.2](https://github.com/IIP-Design/yali-theme/tree/v1.5.2)

**Changed:**
- Switch capability on theme settings panel to allow admins on multi-sites to see it (rather than just super admins)
- Add checks for campaign page link before before adding it to campaign list array to prevent PHP warnings
- Adjusted "Select posts by taxonomy" default option to "all" from "none" and the label to "All taxonomies" from "None"
- Pass all post list feeds through `query.builder` so that a `query` prop will be added to the article feed config. Without a `query` prop, post lists would return erroneously no results if the "Select posts by taxonomy" is set to "none".

**Removed:**
- Deprecated qzzr shortcode

## [v1.5.1](https://github.com/IIP-Design/yali-theme/tree/v1.5.1) (2019-02-13)

**Changed:**
- Add checks before foreach loops in content blocks to prevent PHP warnings

## [v1.5.0](https://github.com/IIP-Design/yali-theme/tree/v1.5.0) (2019-01-23)

**Added:**
- 'YALI Theme' submenu under the 'Appearance' admin menu, where users can customize their instance of the YALI theme
- Configurable input in the new theme customization menu that replaces hardcoded 'Join the YALI Network' form ids
- Ability to search content blocks and filter them by block type

**Changed:**
- Removed unused bio custom post type

## [v1.4.18](https://github.com/IIP-Design/yali-theme/tree/v1.4.18) (2018-10-29)

**Added:**
- Content type and language selection options for post list content block, which allows users to filter post lists from the dashboard

**Changed**
- Refactored regular expression for Portuguese language display for dropdown menus to better handle alternative spellings of Brazil

## [v1.4.17](https://github.com/IIP-Design/yali-theme/tree/v1.4.17) (2018-10-23)

**Removed:**
- Removed hard-coded YALIGoesGreen page template (can be replicated with content blocks)

## [v1.4.16](https://github.com/IIP-Design/yali-theme/tree/v1.4.16) (2018-10-19)

**Changed:**
- Adjusted Portuguese language display to read "Portuguese" instead of "Portuguese (Brazil)" in dropdown menus and post list filters dashboard

## [v1.4.15](https://github.com/IIP-Design/yali-theme/tree/v1.4.15) (2018-10-10)

**Changed:**
- Updated MWF Application Twig

## [v1.4.14](https://github.com/IIP-Design/yali-theme/tree/v1.4.14) (2018-09-20)

**Changed:**
- Updated mwf-application .twig and .php to add MWF CTA

## [v1.4.13](https://github.com/IIP-Design/yali-theme/tree/v1.4.13) (2018-09-12)

**Changed:**
- Updated mwf-application twig button blocks and application announcement for launch

## [v1.4.12](https://github.com/IIP-Design/yali-theme/tree/v1.4.12) (2018-09-11)

**Added:**
- Dedicated text color option for the media content block
- Applied CMB2 `oembed` filters to content block wysiwyg fields, which allows embedded content, e.g., YouTube videos, to display properly

## [v1.4.11](https://github.com/IIP-Design/yali-theme/tree/v1.4.11) (2018-09-07)

**Added:**
- Background color, full-width, button background color, and button text color options to the media content block

## [v1.4.10](https://github.com/IIP-Design/yali-theme/tree/v1.4.10) (2018-09-05)

**Changed:**
- Updated mwf-application twig button block

## [v1.4.9](https://github.com/IIP-Design/yali-theme/tree/v1.4.9) (2018-09-04)

**Changed:**
- Updated mwf application twig template
  
## [v1.4.8](https://github.com/IIP-Design/yali-theme/tree/v1.4.8) (2018-08-27)

**Fixed:**
- `scrollToElemID` returns the hash instead of the entire URL, which allows button links to scroll properly to sections of the same page

## [v1.4.7](https://github.com/IIP-Design/yali-theme/tree/v1.4.7) (2018-08-23)

**Fixed:**
- Post list content blocks no longer return false positives when selecting by tags or categories

## [v1.4.6](https://github.com/IIP-Design/yali-theme/tree/v1.4.6) (2018-08-22)

**Changed:**
- Switched page list content block article title to h3 (rather than h2) 

## [v1.4.5](https://github.com/IIP-Design/yali-theme/tree/v1.4.5) (2018-08-22)

**Fixed:**
- `data-filter-value` values with apostrophe(s) that break the CDP query string by escaping taxonomy fields for the CDP config and using double quotes for `data-filter-value`
- `content_type` archive pages that returned *all* content rather than that specific content type only, e.g., `Podcast` `content_type` archive page now returns podcasts only and not other, non-podcast, posts
- `Podcast` and `Video` drop down selections on post list with filter content blocks
- Branded courses no longer appear in CDP query results
- Category CDP queries now return the correct posts and/or courses instead of returning false positives

**Changed:**
- Adjusted course name sizes for certificate badges
- Adjusted header sizes and templates so that the main header is an `h1`
- Moved IE styles to a separate scss partial to allow the styles to apply to entire site
- Updated the MWF application tips link

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
