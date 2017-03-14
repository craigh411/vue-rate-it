const fs = require('fs');

// Build from font-awesome fontawesome-webfont.svg files (Note: Not all glyphs are included in this file)
var FontAwesome = require('../node_modules/font-awesome/fonts/fontawesome-webfont.svg');

fs.readFile('../node_modules/font-awesome/fonts/fontawesome-webfont.svg', 'utf8', function(err, data) {
    var paths = {};
    var lines = data.split("<");
    for (var i = 0; i < lines.length; i++) {
        var name = /glyph-name=\"([a-z_]+)\"/gi.exec(lines[i]);

    if (name) {
       var line = lines[i].replace(/\r?\n|\r/gi, "");
       var path = /d\=\"(.*?)\"/g.exec(line);
       

        if(path){
            paths[name[1]] = path[1];
        }
    }
}

var output = "export default " + JSON.stringify(paths);
fs.writeFile('../src/raters/font-awesome/glyphs.js', output);

});