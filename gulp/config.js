var dest = "./dist";
var src = './src';

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 8080,
      livereload: {
        port: 35929
      }
    }
  },
  less: {
    src: src + "/styles/**/*.{less,css}",
    dest: dest + "/styles",
    settings: {
      indentedSyntax: false, // Enable .less syntax?
      imagePath: '/images' // Used by the image-url helper
    }
  },
  browserify: {
    settings: {
      transform: ['reactify', '6to5ify']
    },
    src: src + '/js/index.js',
    dest: dest + '/js',
    outputName: 'index.js',
  },
  jshint: {
    src: src + '/js/**/*.js'
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};
