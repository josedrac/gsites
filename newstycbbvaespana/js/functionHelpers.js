


function adjustGadgetHeight(div) {
	onElementHeightChange(document.getElementById(div),
	 	function(){
			var D = document;
		    var height = Math.max(
		    	document.getElementById(div).offsetHeight,
		        D.body.scrollHeight, D.documentElement.scrollHeight,
		        D.body.offsetHeight, D.documentElement.offsetHeight,
		        D.body.clientHeight, D.documentElement.clientHeight
			);

			gadgets.window.adjustHeight(Math.ceil(height));
		});
}

function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight)
            callback();

        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

				