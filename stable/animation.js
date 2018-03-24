
$(document).ready(function(){
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
	$(`#f${1}`).click(function(){
		Expand(1);
	});
	$(`#fd${1}`).click(function() {
		Retract(1);
	});
	$(`#f${2}`).click(function(){
		Expand(2);
	});
	$(`#fd${2}`).click(function() {
		Retract(2);
	});
	$(`#f${'2A'}`).click(function(){
		Expand('2A');
	});
	$(`#fd${'2A'}`).click(function() {
		Retract('2A');
	});
	$(`#f${'2B'}`).click(function(){
		Expand('2B');
	});
	$(`#fd${'2B'}`).click(function() {
		Retract('2B');
	});
	$(`#f${'2C'}`).click(function(){
		Expand('2C');
	});
	$(`#fd${'2C'}`).click(function() {
		Retract('2C');
	});
	$(`#f${'2D'}`).click(function(){
		Expand('2D');
	});
	$(`#fd${'2D'}`).click(function() {
		Retract('2D');
	});
	$(`#f${3}`).click(function(){
		Expand(3);
	});
	$(`#fd${3}`).click(function() {
		Retract(3);
	});
	$(`#f${4}`).click(function(){
		Expand(4);
	});
	$(`#fd${4}`).click(function() {
		Retract(4);
	});
	$(`#f${5}`).click(function(){
		Expand(5);
	});
	$(`#fd${5}`).click(function() {
		Retract(5);
	});
	$(`#f${6}`).click(function(){
		Expand(6);
	});
	$(`#fd${6}`).click(function() {
		Retract(6);
	});
});
