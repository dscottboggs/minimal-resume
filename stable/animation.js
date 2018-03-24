function Expand(panelNumber) {
	$.ajax(
		$(`#panel${panelNumber}`).slideDown(
			function() {
				$(`#fd${panelNumber}`).show();
				$(`#f${panelNumber}`).hide();
			}
		)
	);
};
function Retract(panelNumber) {
	$.ajax(
		$(`#panel${panelNumber}`).slideUp(
			function() {
				$(`#f${panelNumber}`).show();
				$(`#fd${panelNumber}`).hide();
			}
		)
	);
};
