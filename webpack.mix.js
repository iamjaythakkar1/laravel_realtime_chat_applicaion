const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .sass("resources/sass/app.scss", "public/css")
    .sourceMaps(); // Optional: Enable sourcemaps for easier debugging
