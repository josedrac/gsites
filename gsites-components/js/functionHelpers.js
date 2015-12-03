


function adjustGadgetHeight() {

	var D = document;
    var height = Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );

	gadgets.window.adjustHeight(Math.ceil(height));

}