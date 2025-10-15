import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { join } from 'node:path';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import fs from 'fs';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { webfontDownload } from 'vite-plugin-webfont-dl';
import { meta } from 'vite-plugin-meta-tags';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import resizeImagesPlugin from './src/js/services/resize-img';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseName = `/${path.basename(process.cwd())}/`;

export default defineConfig({
    base: baseName,
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
            },
        },
    },

    plugins: [
        webfontDownload(
            [
                'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Russo+One&display=swap',
            ],
            {
                injectAsStyleTag: false,
                minifyCss: true,
                assetsSubfolder: 'fonts',
            }
        ),
        // meta({
        //     title: 'Atlant-gaz',
        //     description: 'Заправка баллонов техническим газом',
        //     url: 'https://atlant-gaz.by/',
        //     img: '/images/meta-og-image.jpg',
        //     color: '#ffffff',
        // }),
        vitePluginFaviconsInject('src/favicon/favicon.png', {
            background: '#2D2D2D',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                favicons: true,
                windows: false,
                yandex: true,
            },
            appName: 'Atlant-gaz',
            appShortName: 'Atlant-gaz',
            appDescription: 'Atlant-gaz доставка',
        }),
        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 75 },
        }),
        resizeImagesPlugin({
            inputDir: 'dist',
            width: 1920,
        }),
        //createFoldersPlugin(),
        //createFiles(),
        legacy({
            targets: ['defaults'],
        }),
    ],
});

//create folders
function createFoldersPlugin(
    folders = [
        'public/images',
        'src/img/',
        'src/sass/base',
        'src/sass/blocks',
        'src/sass/libs',
        'src/sass/ui',
        'src/sass/utils',
        'src/font',
        'src/js',
        'src/js/modules',
        'src/js/services',
        'src/logo',
        'src/icons',
        'src/favicon',
    ]
) {
    return {
        name: 'vite-plugin-create-folders',
        apply: 'serve',
        configResolved(config) {
            const rootDir = config.root || process.cwd();

            folders.forEach(folder => {
                const fullPath = path.join(rootDir, folder);
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath, { recursive: true });
                }
            });
        },
    };
}

//create files
function createFiles() {
    return {
        name: 'vite-create-files',
        apply: 'serve',
        configResolved(config) {
            const rootDir = config.root || process.cwd();
            const makeFile = (filePath, content = '') => {
                const dir = dirname(filePath);
                if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
                if (!existsSync(filePath)) writeFileSync(filePath, content);
            };

            makeFile(
                join(rootDir, 'src/sass/utils/validations.scss'),
                `@use '/src/sass/base/variables.scss' as *;
                `
            );

            makeFile(
                join(rootDir, 'src/sass/ui/text.scss'),
                `@use '/src/sass/base/mixins.scss' as *;
@use '/src/sass/base/variables.scss' as *;
                `
            );

            makeFile(
                join(rootDir, 'src/sass/ui/buttons.scss'),
                `@use '/src/sass/base/mixins.scss' as *;
@use '/src/sass/base/variables.scss' as *;

.btn-defalt {
    @include button;
    font-size: 20px;
    width: 230px;
    height: 50px;
}
            `
            );

            makeFile(
                join(rootDir, 'src/sass/ui/titles.scss'),
                `@use '/src/sass/base/mixins.scss' as *;

.title-h1-italic {
@include title;
font-style: italic;
font-size: 24px;
font-weight: 400;
}
            `
            );

            makeFile(
                join(rootDir, 'src/sass/styles.scss'),
                `//libs
//base
@use '/src/sass/libs/modern-normalize.css';
@use '/src/sass/base/variables.scss' as *;
@use '/src/sass/base/basic.scss';
//reuse
//ui
@use '/src/sass/ui/titles.scss';
@use '/src/sass/ui/buttons.scss';
//blocks
//fonts
            `
            );
            makeFile(
                join(rootDir, 'src/sass/libs/modern-normalize.css'),
                `*,
::after,
::before {
    box-sizing: border-box;
}
html {
    font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji';
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
}
body {
    margin: 0;
}
hr {
    height: 0;
    color: inherit;
}
abbr[title] {
    text-decoration: underline dotted;
}
b,
strong {
    font-weight: bolder;
}
code,
kbd,
pre,
samp {
    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono',
        Menlo, monospace;
    font-size: 1em;
}
small {
    font-size: 80%;
}
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
sub {
    bottom: -0.25em;
}
sup {
    top: -0.5em;
}
table {
    text-indent: 0;
    border-color: inherit;
}
button,
input,
optgroup,
select,
textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
}
button,
select {
    text-transform: none;
}
[type='button'],
[type='reset'],
[type='submit'],
button {
    -webkit-appearance: button;
}
::-moz-focus-inner {
    border-style: none;
    padding: 0;
}
:-moz-focusring {
    outline: 1px dotted ButtonText;
}
:-moz-ui-invalid {
    box-shadow: none;
}
legend {
    padding: 0;
}
progress {
    vertical-align: baseline;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    height: auto;
}
[type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}
::-webkit-search-decoration {
    -webkit-appearance: none;
}
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}
summary {
    display: list-item;
}
            `
            );
            makeFile(
                join(rootDir, 'src/sass/base/mixins.scss'),
                `@use '/src/sass/base/variables.scss' as *;

@mixin title {
    color: $dark;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    text-align: center;
}

@mixin button {
width: 200px;
height: 50px;
padding: 5px 10px;
background-color: brown;
color: black;
}
            `
            );
            makeFile(
                join(rootDir, 'src/sass/base/basic.scss'),
                `@use '/src/sass/base/variables.scss' as *;

h1,
h2,
h3,
h4,
h5,
figure,
p,
ol,
ul {
    margin: 0;
}

ol[role='list'],
ul[role='list'] {
    list-style: none;
    padding-inline: 0;
}

h1,
h2,
h3,
h4,
h5 {
    font-size: inherit;
    font-weight: inherit;
}

img {
    display: block;
    max-inline-size: 100%;
}

a {
    text-decoration: none;
}

html {
    font-family: 'Roboto', sans-serif;
    scroll-behavior: smooth;
}

body {
    background-color: $dark;
}

.container {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    position: relative;
}
            `
            );
            makeFile(
                join(rootDir, 'src/sass/base/variables.scss'),
                `$light: #f9f9f9;
$dark: #121212;
            `
            );
            makeFile(
                join(rootDir, 'index.html'),
                `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/js/script.js"></script>
    </body>
</html>
            `
            );
            makeFile(
                join(rootDir, '.gitignore'),
                `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
            `
            );
            makeFile(
                join(rootDir, 'postcss.config.cjs'),
                `module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 16,
            propList: ['*'], // Преобразовывать все свойства
            selectorBlackList: [], // Селекторы, которые нужно исключить из преобразования
            replace: true, // Заменять px на rem
            mediaQuery: true, // Преобразовывать px внутри media queries
            minPixelValue: 0, // Минимальное значение px для преобразования
        },
    },
};
            `
            );
            makeFile(
                join(rootDir, 'eslint.config.js'),
                `import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        rules: {
                    'no-unused-vars': 'off',
                },
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
]);
        `
            );

            makeFile(
                join(rootDir, 'src/js/main.js'),
                `'use strict';

//import tabs from './modules/tabs';

window.addEventListener('DOMContentLoaded', async () => {
    //tabs();
});
`
            );

            makeFile(
                join(rootDir, 'src/js/script.js'),
                `'use strict';

import '/src/sass/styles.scss';
import '/src/js/main.js';
`
            );
        },
    };
}
