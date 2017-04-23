const fs = require('fs');

fs.readdir('glyphs', function(err, files) {
    var paths = {};
    var itemsProcessed = 0;
    files.forEach(function(file) {
        fs.readFile('glyphs/' + file, 'utf-8', function(err, data) {
            var name = file.replace(".svg", "");
            var line = data.replace(/\r?\n|\r/gi, "");
            var path = /d\=\"(.*?)\"/g.exec(line);

            if (path) {
                paths[name] = path[1];
            }

            if (itemsProcessed === files.length) {
                var output = "export default " + JSON.stringify(paths);
                fs.writeFile('../src/raters/font-awesome/glyphs.js', output);
            }
            itemsProcessed++;
        })
    })
});
