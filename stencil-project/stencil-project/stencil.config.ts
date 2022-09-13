import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { angularOutputTargetFix } from "./src/directives/angular-output-target-fix";

const angularValueAccessorBindings: ValueAccessorConfig[] = [
	{
		elementSelectors: ['kds-text-input[type=text]'],
		event: 'change',
		targetAttr: 'value',
		type: 'text',
	},
	{
		elementSelectors: ['kds-text-input[type=number]'],
		event: 'change',
		targetAttr: 'value',
		type: 'number',
	},
	{
		elementSelectors: ['kds-checkbox'],
		event: 'change',
		targetAttr: 'checked',
		type: 'boolean',
	},
	{
		elementSelectors: ['kds-dropdown'],
		event: 'change',
		targetAttr: 'value',
		type: 'select',
	},
];


export const config: Config = {
	namespace: 'kds-web-core',
	testing: {
		/**
		 * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
		 * before it can run your tests
		 */
		browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
		// browserHeadless: false,
		// browserSlowMo: 500,
		coverageThreshold: {
			global: {
				branches: 30,
				functions: 30,
				lines: 40,
				statements: 40
			}
		},
		transformIgnorePatterns: [
			"node_modules/(?!(@kohls/kds-primitives)/)",
		],
		coveragePathIgnorePatterns: [
			"node_modules",
			"test"
		]
	},
	globalStyle: 'src/global/kds.scss',
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
			copy: [
				{ src: '../public/*.js', dest: 'kds-web-core/assets/js/' }
			],
		},
		{
			type: 'dist-hydrate-script'
		},
		reactOutputTarget({
			componentCorePackage: '@kohls/kds-web-core',
			proxiesFile: './framework-int/react/src/components.ts',
		}),
		angularOutputTarget({
			componentCorePackage: '@kohls/kds-web-core',
			directivesProxyFile: './framework-int/angular/src/components.ts',
			valueAccessorConfigs: angularValueAccessorBindings,
		}),
		angularOutputTargetFix({
			directivesUtilsFile:
				"../../framework-int/angular/src/angular-component-lib/utils.ts",
		}),
	],
	plugins: [
		sass({
			includePaths: ['node_modules'],
		})
	],
};