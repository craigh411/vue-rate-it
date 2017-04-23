# Change Log
- Changes before version 1.2.1 not documented (see commit history)
- Project follows [Semantic Versioning](http://semver.org/)

## [Unreleased]

### Added
- A new customProps prop for passing through additional props from the base-rating component, which may be required to be passed onto a RatingItem, e.g. font awesome glyphs require the glyph name to be passed, which is done through customProps['glyphs'].
- Font awesome
  - build tools to convert font awesome glyphs to paths
  - A font-awesome-glyph component.
  - A font-awesome-rating component to allow use of font-awesome glyphs for  raters
- A heart-rating component
- A new heart component
- A new Path template for creating paths
- A new Polygon template has been created for designing different polygons for rating items.
- A new base component has been created that can be extended.
- New mixins have bee created for the functionality of the rater and the rating items.
- Browserify-shim because components now require an import of vue (for the Vue.extend functionality), so Vue now needs to be shimmed so `dist` files can access the global vue object so developers don't get two versions of `Vue` on their webpage.
- Added new script to `package.json` for running watchers as watching will now require an -f flag to pass the file name
- Added Watchify for development
- ChangeLog

### Changed
- the star-rating component now uses the mixins and extend functionality.
- Gulpfile now ignores imports of vue
- Gulpfile can now bundle all dist files.
- Updated Readme
- Added new `watch` task to gulpfile.babel.js


