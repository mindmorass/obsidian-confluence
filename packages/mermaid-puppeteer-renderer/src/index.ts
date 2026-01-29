import { ChartData, MermaidRenderer } from "@markdown-confluence/lib";
import path from "path";
import puppeteer, { Browser } from "puppeteer";
import type { LaunchOptions } from "puppeteer-core";
import { downloadBrowsers } from "puppeteer/lib/esm/puppeteer/node/install.js";
import url from "url";

interface RemoteWindowedCustomFunctions {
	renderMermaidChart: (
		mermaidData: string,
		mermaidConfig: unknown,
	) => Promise<{ width: number; height: number }>;
}

const mermaidConfig = {
	theme: "base",
	themeVariables: {
		background: "#ffffff",
		mainBkg: "#ddebff",
		primaryColor: "#ddebff",
		primaryTextColor: "#192b50",
		primaryBorderColor: "#0052cc",
		secondaryColor: "#ff8f73",
		secondaryTextColor: "#192b50",
		secondaryBorderColor: "#df360c",
		tertiaryColor: "#c0b6f3",
		tertiaryTextColor: "#fefefe",
		tertiaryBorderColor: "#5243aa",
		noteBkgColor: "#ffc403",
		noteTextColor: "#182a4e",
		textColor: "#ff0000",
		titleColor: "#0052cc",
	},
};

const puppeteerLaunchConfig: LaunchOptions = {
	headless: true,
	args: [
		"--ignore-certificate-errors",
		"--no-sandbox",
		"--disable-setuid-sandbox",
		"--disable-accelerated-2d-canvas",
		"--disable-gpu",
	],
};

export class PuppeteerMermaidRenderer implements MermaidRenderer {
	async captureMermaidCharts(
		charts: ChartData[],
	): Promise<Map<string, Buffer>> {
		const capturedCharts = new Map<string, Buffer>();

		if (charts.length === 0) {
			return capturedCharts;
		}

		await downloadBrowsers();

		// Launch a single browser instance for all charts
		const browser: Browser = await puppeteer.launch({
			...puppeteerLaunchConfig,
			executablePath: puppeteer.executablePath(),
		});

		try {
			const mermaidHTMLPath = path.join(
				__dirname,
				"mermaid_renderer.html",
			);
			const pathToLoad = url.pathToFileURL(mermaidHTMLPath).href;

			// Process charts sequentially to avoid race conditions with page state
			for (const chart of charts) {
				const page = await browser.newPage();
				try {
					await page.goto(pathToLoad);

					const result = await page.evaluate(
						(mermaidData, mermaidConfig) => {
							const { renderMermaidChart } =
								globalThis as unknown as RemoteWindowedCustomFunctions;

							return renderMermaidChart(
								mermaidData,
								mermaidConfig,
							);
						},
						chart.data,
						mermaidConfig,
					);

					// Add padding to prevent edge clipping
					const padding = 4;
					await page.setViewport({
						width: result.width + padding,
						height: result.height + padding,
						deviceScaleFactor: 2,
					});

					const imageBuffer = await page.screenshot({
						fullPage: true,
						omitBackground: false,
					});
					// Convert Uint8Array to Buffer if needed
					const buffer = Buffer.isBuffer(imageBuffer)
						? imageBuffer
						: Buffer.from(imageBuffer);
					capturedCharts.set(chart.name, buffer);
				} finally {
					await page.close();
				}
			}
		} finally {
			await browser.close();
		}

		return capturedCharts;
	}
}
