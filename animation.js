function Expand(panelID) {
  $.ajax(
    $(`#panel-${panelID}`).slideDown(
      function() {
        $(`#flipped-${panelID}`).show();
        $(`#flip-${panelID}`).hide();
      }
    )
  );
};
function Retract(panelID) {
  $.ajax(
    $(`#panel-${panelID}`).slideUp(
      function() {
        $(`#flip-${panelID}`).show();
        $(`#flipped-${panelID}`).hide();
      }
    )
  );
};
function ToggleFooter() {
    $.ajax(
        $('#footlink-div').slideToggle()
    );
}
