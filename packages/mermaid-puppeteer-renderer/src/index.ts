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
	) => Promise<void>;
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
					// Set a large viewport with deviceScaleFactor upfront.
					// This avoids reflow issues from resizing the viewport
					// after the SVG has been rendered and measured.
					await page.setViewport({
						width: 1920,
						height: 1080,
						deviceScaleFactor: 2,
					});

					await page.goto(pathToLoad);

					await page.evaluate(
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

					// Screenshot the chart container element directly.
					// The browser-side code (mermaid_renderer.js) uses
					// getBBox() to resize the SVG to fit all graphical
					// content, so #graphDiv wraps it exactly.
					const chartElement = await page.$("#graphDiv");
					if (!chartElement) {
						throw new Error("Chart container #graphDiv not found");
					}
					const imageBuffer = await chartElement.screenshot({
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
