import mermaid from "mermaid";

window.renderMermaidChart = async (chartData, mermaidConfig) => {
	mermaid.initialize({ ...mermaidConfig, startOnLoad: false });

	const { svg } = await mermaid.render("graphDiv2", chartData);
	const chartElement = document.querySelector("#graphDiv");
	chartElement.innerHTML = svg;

	const svgElement = document.querySelector("#graphDiv svg");
	const rect = svgElement.getBoundingClientRect();
	return {
		width: Math.ceil(rect.width),
		height: Math.ceil(rect.height),
	};
};
