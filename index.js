function getWee(modifier) {
	var b = "w";
	if (modifier && modifier === 1) {
		b = "W";
	}
	for (i = 0; i < 5; i++) {
		b += "e";
	}
	if (modifier && modifier === 2) {
		if (Math.random() < 0.5) {
			b += ".";
		} else {
			b += "!";
		}
	}
	return b;
}

function getTextNodesIn(elem, opt_fnFilter) {
	var textNodes = [];
	if (elem) {
		for (var nodes = elem.childNodes, i = nodes.length; i--; ) {
			var node = nodes[i],
				nodeType = node.nodeType;
			if (nodeType == 3) {
				if (!opt_fnFilter || opt_fnFilter(node, elem)) {
					textNodes.push(node);
				}
			} else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
				textNodes = textNodes.concat(
					getTextNodesIn(node, opt_fnFilter)
				);
			}
		}
	}
	return textNodes;
}

function weeify() {
	getTextNodesIn(document).forEach((node) => {
		if (node.textContent.length > 0) {
			var wordArray = node.textContent.trim().split(/\s+/);
			if (wordArray[0].length > 0 && wordArray.length < 50) {
				var newWordArray = [];
				wordArray.forEach((word) => {
					newWordArray.push(getWee());
				});
				newWordArray[0] = getWee(1);
				if (newWordArray.length > 1) {
					newWordArray[newWordArray.length - 1] = getWee(2);
				}
				node.textContent = newWordArray.join(" ");
			}
		}
	});
}
