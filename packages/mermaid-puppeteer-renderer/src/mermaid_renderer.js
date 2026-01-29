import mermaid from "mermaid";

window.renderMermaidChart = async (chartData, mermaidConfig) => {
	mermaid.initialize({ ...mermaidConfig, startOnLoad: false });

	const { svg } = await mermaid.render("graphDiv2", chartData);
	const chartElement = document.querySelector("#graphDiv");
	chartElement.innerHTML = svg;

	const svgElement = document.querySelector("#graphDiv svg");

	// Allow overflow so getBBox() can measure all graphical content
	svgElement.style.overflow = "visible";

	// getBBox() returns the tight bounding box of ALL graphical content
	// in SVG user coordinates, including elements that overflow the
	// declared viewBox. This is more accurate than getBoundingClientRect()
	// (CSS layout box) or scrollWidth/scrollHeight (scrollable area).
	const bbox = svgElement.getBBox();

	const padding = 10;
	const x = bbox.x - padding;
	const y = bbox.y - padding;
	const width = bbox.width + padding * 2;
	const height = bbox.height + padding * 2;

	// Update the SVG to encompass all graphical content so the
	// container element (#graphDiv) sizes correctly for screenshot
	svgElement.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
	svgElement.setAttribute("width", `${Math.ceil(width)}`);
	svgElement.setAttribute("height", `${Math.ceil(height)}`);
};
