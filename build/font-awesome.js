const fs = require('fs');

fs.readdir('glyphs', function(err, files) {
    var paths = {};
    var pathsString = "";
    var itemsProcessed = 1;
    files.forEach(function(file) {
        fs.readFile('glyphs/' + file, 'utf-8', function(err, data) {
            var name = file.replace(".svg", "");
            var line = data.replace(/\r?\n|\r/gi, "");
            var path = /d\=\"(.*?)\"/g.exec(line);

            if (path) {
                // individual paths
               // pathsString += "export const fa_" + name.replace(/-/g, "_") + "='" + path[1]+"';\n";
                // All paths object
                //paths[name] = path[1];
            //}

               //var output = pathsString;
               var exportName = name.replace(/-/g, "_")
               var output = "const fa_" + exportName +" = '" + path[1] + "'\nexport default fa_" + exportName;

                fs.writeFile('../glyphs/' + name + '.js', output);
                //fs.writeFile('../src/raters/font-awesome/glyphs-individual.js', pathsString);
                console.log('done');
            }
        })
    })
});
