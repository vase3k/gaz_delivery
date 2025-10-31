import { defineConfig } from 'vite';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { webfontDownload } from 'vite-plugin-webfont-dl';
import { meta } from 'vite-plugin-meta-tags';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import convertWebp from './src/js/services/convertWebp.js';

const baseName = `/${path.basename(process.cwd())}/dist/`;

export default defineConfig({
	base: baseName,
	build: {
		rollupOptions: {
			input: {
				index: 'index.html',
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
		meta({
			title: 'Atlant-gaz',
			description: 'Заправка баллонов техническим газом',
			url: 'https://atlant-gaz.by/',
			img: '/images/meta-og-image.jpg',
			color: '#ffffff',
		}),
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
		legacy({
			targets: ['defaults'],
		}),
		convertWebp(),
	],
});
