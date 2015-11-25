// Convertidor bbCode a HTML

// Funcion para designar el estilo de una imagen
function dameEstilos(texto){
    var resultado="";
    var contador;
    var estilo=new Array();
    estilo=texto.split(",");
    for (contador=0;contador<estilo.length;contador++){
        switch (estilo[contador]){
            case "top":
                resultado+="vertical-align: "+estilo[contador]+"; "
                break;
            case "middle":
                resultado+="vertical-align: "+estilo[contador]+"; "
                break;
            case "bottom":
                resultado+="vertical-align: "+estilo[contador]+"; "
                break;
            case "center":
                resultado+="float: "+estilo[contador]+"; "
                break;  
            case "left":
                resultado+="float: "+estilo[contador]+"; "
                break;
            case "right":
                resultado+="float: "+estilo[contador]+"; "
                break;
            default:
                if (estilo[contador].substr(0,1)=="h"){
                    resultado+="height: "+estilo[contador].substr(1)+"px; ";
                    } else {
                        if (estilo[contador].substr(0,1)=="w") {
                            resultado+="width: "+estilo[contador].substr(1)+"px; ";
                            }
                        }
            }
        }
    return resultado
    }
    
// Funcion para Copiar a Portapapeles
function clipboardCopy(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    }
    else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e) {
            alert("Un script no puede Cortar / Copiar / Pegar automáticamente por razones de seguridad.\n"+
                  "Para hacerlo necesitas activar 'signed.applets.codebase_principal_support' en about:config'");
            return false;
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes['@mozilla.org/supports-tring;1'].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
}
// Fin de copiar a Portapapeles

// Obtener URL a partir de cadena
function bbcode2html_dameurl(destinourl,textourl,marcoparaurl){
		var resultado="";		
		var dominio="";
		var patron="^(http|https|ftp|file|news|data)://"
		
		destinourl=destinourl.replace(/(^\s*)|(\s*$)/g,""); //elimina espacios a izquierda y derecha
		var destinourlminusculas=destinourl.toLowerCase();
		if (destinourlminusculas.search(patron) != 0){
		   destinourl="http://"+destinourl;
		   }
		
		//var urlventanapadre="http://sites.google.com/site/fdvcreations/pruebas";		
		var urlventanapadre= _args()["parent"];	
		
		var posbarra=urlventanapadre.indexOf ("/",7);
		dominio=urlventanapadre.substr (0,posbarra);
				
		if (marcoparaurl==""){		  
		   patron= "^"+dominio;		   
		   if (destinourl.search(patron)==0){
		   	  marcoparaurl="_top";
		   	  } else {
			  marcoparaurl="_blank";
			  }
		   }		
		resultado+='<a href="';										   
	    resultado+=destinourl;
	    resultado+='" target="'+marcoparaurl+'">';
		resultado+=textourl;
		resultado+="</a>";
		return resultado
		}
		
// Convertir a HTML el texto BBcode
function bbcode2html(cadena) {

         var carpetagrf_bbcode2html="http://bbcode2html-para-gadget.googlecode.com/files/";
		 
		 var resultado=""; var etiqueta="";var etiqueta_esperada=""; var contenido=""; var marco="";
		 var estado=0; var letra="";
		 
		 for (var ct=0;ct<cadena.length;ct++) {
		 	 
			 letra=cadena.charAt(ct);	 
		 	 if (letra=="["&&estado==0) {
			 	 etiqueta=""; estado=1; }
				 
			 if (letra=="]"&&estado==1) {
			     estado=2;      	 	 }
				 
		 	 switch (estado) {
			 		case 0: resultado+=letra; break
					case 1: etiqueta+=letra;  break
					case 2:
						 // evaluamos la etiqueta
						 etiqueta+=letra;
						 estado=0;
						 if (etiqueta.lastIndexOf("=") ==-1) {
						 	switch (etiqueta) {
						 		case "[b]": resultado+="<b>"; break
								case "[/b]": resultado+="</b>"; break
								case "[i]": resultado+="<i>"; break
								case "[/i]": resultado+="</i>"; break
								case "[u]": resultado+="<u>"; break
								case "[/u]": resultado+="</u>"; break
								case "[hr]": resultado+="<hr>"; break
								case "[br]": resultado+="<br>"; break
								case "[p]": resultado+="<br clear=all>"; break
								case "[list]":resultado+="<ul>";break
								case "[/list]":resultado+="</ul>";break
								case "[*]":resultado+="<li>";break
								case "[quote]":resultado+="<blockquote>";break
								case "[/quote]":resultado+="</blockquote>";break
								
								case "[code]":estado=3; contenido=""; etiqueta_esperada="[/code]"; break
								//case "[code]":resultado+="<code><pre>";break
								//case "[/code]":resultado+="</pre></code>";break
					            case "[block]": resultado+='<div style="display:inline;  float: left;">'; break
								case "[/block]": resultado+='</div>';break
								case "[left]":resultado+='<div style="text-align: left;">';break
								case "[/left]":resultado+='</div>';break
								case "[right]":resultado+='<div style="text-align: right;">';break
								case "[/right]":resultado+='</div>';break
								case "[center]":resultado+='<div style="text-align: center;">';break
								case "[/center]":resultado+='</div>';break
								case "[justify]":resultado+='<div style="text-align: justify;">';break
								case "[/justify]":resultado+='</div>';break
								
								case "[h1]":resultado+="<h1>";break
								case "[/h1]":resultado+="</h1>";break
								case "[h2]":resultado+="<h2>";break
								case "[/h2]":resultado+="</h2>";break
								case "[h3]":resultado+="<h3>";break
								case "[/h3]":resultado+="</h3>";break
								case "[h4]":resultado+="<h4>";break
								case "[/h4]":resultado+="</h4>";break
								case "[h5]":resultado+="<h5>";break
								case "[/h5]":resultado+="</h5>";break
								case "[h6]":resultado+="<h6>";break
								case "[/h6]":resultado+="</h6>";break
								
								case "[sup]":resultado+="<sup>";break
								case "[/sup]":resultado+="</sup>";break
								case "[sub]":resultado+="<sub>";break
								case "[/sub]":resultado+="</sub>";break
								
						        case "[img]": estado=3; contenido=""; etiqueta_esperada="[/img]"; break
								
								case "[url]": estado=3; contenido=""; etiqueta_esperada="[/url]"; break
								case "[url-in]": estado=3; contenido=""; etiqueta_esperada="[/url]"; break
								case "[url-out]": estado=3; contenido=""; etiqueta_esperada="[/url]"; break								
								case "[email]": estado=3; contenido=""; etiqueta_esperada="[/email]"; break
								case "[copy]": estado=3; contenido=""; etiqueta_esperada="[/copy]"; break
                                case "[clipboard]": estado=3; contenido=""; etiqueta_esperada="[/clipboard]"; break								
								case "[/font]": resultado+="</span>"; break
								case "[/color]": resultado+="</span>"; break
								case "[/size]": resultado+="</span>"; break								
								case "[google]": estado=3; contenido=""; etiqueta_esperada="[/google]"; break
								case "[wikipedia]": estado=3; contenido=""; etiqueta_esperada="[/wikipedia]"; break
							
								default: resultado+=etiqueta;
						 		} // fin del switch etiqueta	
							} else {
							
							   estado=4; contenido="";
							   etiqueta_esperada="[/"+etiqueta.substring(1,etiqueta.lastIndexOf("="))+"]";
							   
							   switch (etiqueta_esperada){
							   		  case "[/url-in]": etiqueta_esperada="[/url]";break
									  case "[/url-out]": etiqueta_esperada="[/url]";break
							   		  
									  case "[/font]":
									  	   estado=0;
										   resultado+='<span style="font-family:';
										   resultado+=etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1);
										   resultado+='">';
										   break
									  case "[/size]":
									  	   estado=0;
										   resultado+='<span style="font-size:';
										   resultado+=etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1);
										   resultado+='">';
										   break
									  case "[/color]":
									  	   estado=0;
										   resultado+='<span style="color:';
										   resultado+=etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1);
										   resultado+='">';
										   break
									  case "[/list]":
									       estado=0;
										   resultado+='<ul style="list-style-type: ';
										   switch (etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1)) {
										   		  case "c": resultado+='circle">';break
												  case "d": resultado+='disc">';break
												  case "s": resultado+='square">';break
												  case "1": resultado+='decimal">';break
												  case "a": resultado+='lower-alpha">';break
												  case "A": resultado+='upper-alpha">';break
												  case "i": resultado+='lower-roman">';break
												  case "I": resultado+='upper-roman">';break
												  default: resultado+='circle">';break
										   		  }
										   break
									  case "[/quote]":
									  	   estado=0;
										   resultado+="<blockquote><i>";
										   resultado+=etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1);
										   resultado+=" escribi&oacute;:</i><br>";
										   break
							   		  }							   
							   }
						 	break 
					case 3:
						 contenido+=letra;
						 if (contenido.lastIndexOf("]") !=-1) {
						 	if (contenido.substring(contenido.lastIndexOf("["),contenido.lastIndexOf("]")+1)==etiqueta_esperada) { 	
							   switch (etiqueta_esperada) {
							   		  case "[/url]":
									  	   switch (etiqueta){
										   		  case "[url-in]": marco="_top";break
												  case "[url-out]": marco="_blank"; break
												  default: marco=""
												  }	                                                  			  
									  	   resultado+=bbcode2html_dameurl(contenido.substring(0,contenido.lastIndexOf("[")),contenido.substring(0,contenido.lastIndexOf("[")),marco);
									  	   estado=0;
										   break
									  case "[/img]":
									  	   resultado+='<img src="';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='">';
										   
										   estado=0;
										   break
								       
                                       case "[/clipboard]":
                                           resultado+='<span style="border:black solid 1px;     margin: 2px; padding: 4px; background-color:white; color: black;">';								  	   
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   //resultado+='&nbsp;<input type="button" value="copiar" onclick="clipboardCopy(';
                                     	   resultado+='&nbsp;<span onclick="clipboardCopy(';
                                           resultado+="'";
                                           resultado+=contenido.substring(0,contenido.lastIndexOf("["));								
                                           resultado+="'";
                                           resultado+=');" style="';   
                                           resultado+='text-decoration: none; ';
                                           resultado+='border-width:2px; ';
                                           resultado+='color: #000000; ';
                                           resultado+='font-weight: bold; ';
                                           resultado+='background-color: #CCCCCC; ';
                                           resultado+='border-style: outset; ';
                                           resultado+='cursor: default; ';                                           
                                           resultado+=' " ';                                           
                                           resultado+='onMouseOver="';
                                           resultado+="this.style.color='#FFFFFF';this.style.backgroundcolor='#999999'; this.style.borderStyle='outset';";
                                           resultado+='" onMouseOut="';
                                           resultado+="this.style.color='#000000';this.style.backgroundcolor='#000000'; this.style.borderStyle='outset';";
                                           resultado+='" onMouseDown="';
                                           resultado+="this.style.color='#FFFFFF';this.style.backgroundcolor='#666666'; this.style.borderStyle='inset';";
                                           resultado+='" onMouseUp="';
                                           resultado+="this.style.color='#FFFFFF';this.style.backgroundcolor='#999999'; this.style.borderStyle='outset';";    
										   //resultado+=');" />';
                                           resultado+='">copiar</span>';
										   resultado+='</span>';
                                           estado=0;
										   break

                                       case "[/copy]":						  	   
                                            resultado+='<input type="text" name="Texto" value="';
                                            resultado+=contenido.substring(0,contenido.lastIndexOf("["));
                                            resultado+='" size=';
                                            resultado+=contenido.substring(0,contenido.lastIndexOf("[")).length+4;
                                            resultado+=' onClick="this.select()" readonly>';
		                                    estado=0;
										   break							
                                		   
									   case "[/code]":
									  	   
										   resultado+='<code><pre>';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='</pre></code>';
										   estado=0;
										   break
										   
									  case "[/email]":
									  	   resultado+='<a href="mailto: ';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='">';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+="</a>";
										   
										   estado=0;
										   break
									  case "[/google]":
									  	   resultado+='<a href="http://www.google.com/search?q=';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='" target="_blank">';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='</a>';
										   estado=0;
										   break
									  case "[/wikipedia]":
									  	   resultado+='<a href="http://es.wikipedia.org/wiki/';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='" target="_blank">';
										   resultado+=contenido.substring(0,contenido.lastIndexOf("["));
										   resultado+='</a>';
										   estado=0;
										   break
									  }
							   }
							}
						break
					case 4:
						 contenido+=letra;
						 if (contenido.lastIndexOf("]") !=-1) {
						 	if (contenido.substring(contenido.lastIndexOf("["),contenido.lastIndexOf("]")+1)==etiqueta_esperada) { 	
							   
							   switch (etiqueta_esperada) {
							   		  case "[/url]":
									       switch (etiqueta.substring(1,etiqueta.lastIndexOf("="))){
										   		  case "url-in": marco="_top";break
												  case "url-out": marco="_blank"; break
												  default: marco=""
												  }
                                           resultado+=bbcode2html_dameurl(etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1),bbcode2html(contenido.substring(0,contenido.lastIndexOf("["))),marco);
                                           estado=0;
										   break
							   		  case "[/img]":
									  	   resultado+='<img src="';
										   resultado+=bbcode2html(contenido.substring(0,contenido.lastIndexOf("[")));										   
										   resultado+='"';// align="';
										   //resultado+=etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1);										   
                                           resultado+=' style="';
                                           resultado+=dameEstilos(etiqueta.substring(etiqueta.lastIndexOf("=")+1,etiqueta.length-1));
										   resultado+='">';
										   estado=0;
										   break									  
									  }
							   }
							}
						break					 
			 		} // fin del switch estado
		 	 } // fin del for
		 
		 if (estado>0) {resultado=resultado+etiqueta+contenido;}
		 
		 return resultado;
		 }
// Fin del convertidor BBcode a HTML
