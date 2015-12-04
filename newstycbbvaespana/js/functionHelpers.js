



function adjustGadgetHeight(div) {
	onElementHeightChange(document.getElementById(div),
	 	function(){

		    var height = document.getElementById(div).offsetHeight;
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

				

