import mermaid from "mermaid";

window.renderMermaidChart = async (chartData, mermaidConfig) => {
	mermaid.initialize({ ...mermaidConfig, startOnLoad: false });

	const { svg } = await mermaid.render("graphDiv2", chartData);
	const chartElement = document.querySelector("#graphDiv");
	chartElement.innerHTML = svg;

	const svgElement = document.querySelector("#graphDiv svg");

	// Ensure overflow content (labels, annotations) is visible for capture
	svgElement.style.overflow = "visible";

	const rect = svgElement.getBoundingClientRect();

	// Also check container scroll dimensions to catch any overflow content
	// that extends beyond the SVG element's bounding box
	const scrollWidth = chartElement.scrollWidth;
	const scrollHeight = chartElement.scrollHeight;

	return {
		width: Math.ceil(Math.max(rect.width, scrollWidth)),
		height: Math.ceil(Math.max(rect.height, scrollHeight)),
	};
};
