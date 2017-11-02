# Change Log
- Project follows [Semantic Versioning](http://semver.org/)

## Unreleased
- Update class names in BaseRating to avoid name clashes
- Add rtl support
- Updgrade to webpack 3 - Unfortunately, hoisting with vue-loader 13 produces a larger bundle size, so sticking with vue-loader 11
- Removed dead pixel column that allowed users to reset rating to 0


## Version 2.0.1 (2017-11-02)
- Change type in README.md
- Update Changelog for 2.0.0
- Tidy glyph build script


## Version 2.0.0 (2017-11-01)
- Solved file size issue by seperating `font-awesome` port.
- Updated font awesome build script to output individual glyph paths.
- Change `fa-rating` functionailty
- Change CDN build process
- Update docs
- Update README.md

## Version 1.1.5 (2017-05-31)
- Fixed issue that causes div to be placed inside span.
- Tidy up.
- EsLint config changed to use (most) vue defaults.

## Version 1.1.4 (2017-05-11)
- Created new pre-transpiled distributable and set it as main entry point.
- vue-loader, babel-loader, vueify or babelify are no longer required.
- Added new CDN for full library.
- CDN's moved to dist/cdn folder. 
- Updated examples to use full library CDN
- Updated README.md
- Updated Docs

## Version 1.1.3 (2017-05-10)
- Added pre-transpiled mixins for use with webpack

## Version 1.1.2 (2017-05-07)
- Fix typo in README

## Version 1.1.1 (2017-05-04)
- Fix typos in README

## Version 1.1 (2017-04-28)
- Added export of individual font awesome glyphs.
- Added extendable base glyph for font-awesome to allow use of glyphs without importing all of them.
- Added new rate-it component for passing custom rating items.
- Moved glyphs file to root so it can be accessed by `import {fa_glyph} from 'vue-rate-it/glyphs;'` 
- Added new "extendable" example.
- Updated "Extending" section of docs.

## Version 1.0 (2017-04-26)
- Initial release





