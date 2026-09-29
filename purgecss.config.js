module.exports = {
    content: [
        "_site/**/*.html",
        "_site/**/*.js"
    ],
    css: [
        "_site/assets/css/*.css"
    ],
    output: "_site/assets/css/",
    skippedContentGlobs: [
        "_site/assets/**/*.html"
    ],
    // theme rules are keyed on a data-theme value set at runtime by JS,
    // so PurgeCSS can't see them in the content — keep them explicitly
    safelist: {
        greedy: [/data-theme/]
    }
};
