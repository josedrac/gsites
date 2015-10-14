var carpetagrf="http://bbcode2html-para-gadget.googlecode.com/files/";
//var carpetagrf="http://bbvatravellersgadgets.googlecode.com/svn/trunk/";
var iconostxt=":)|:(|:o|;)|:P|:x|bien|mal|si|no|aplausos|mejorable|a ver|pensando|flipe|sin palabras";
var matriz_iconos= new Array(); 
matriz_iconos=iconostxt.split ("|");

var _navegador = navigator.userAgent;
var ie = /msi/i.test(_navegador);
var op = /opera/i.test(_navegador);
var mo = /gecko/i.test(_navegador);
var otroNav = !(ie || mo);

function comprueba_bbcode2html(contenedor)
{
	if(typeof bbcode2html != 'undefined') 
	{
	   var resultado=bbcode2html (document.getElementById (contenedor).value);
	   var miventana=window.open("","miventana","width=400,height=300,menubar=no,scrollbars=yes"); 
	   miventana.document.write (resultado);
	} 
	else 
	{
	   alert ("Se necesita la libreria bbcode2html.js para ver la imagen previa");
	}
 }
		 
function leer_de (contenedor)
{		
	var resultado="";
	var control="";
	control= document.getElementById (contenedor);	
	if (op || mo)	{//alert("mozilla u opera");
	with (control) return value.substring(selectionStart, selectionEnd);
	} else if (otroNav)	{//alert("otro");
	return "";
	} else if (ie)	{
	return document.selection.createRange().text;
	}
}

function insertar_en (texto,contenedor)
{		
	var resultado="";
	var control="";
	control= document.getElementById (contenedor);
	
	if (op || mo)	{//alert("mozilla u opera");	
		var _ini = control.selectionStart;
		var _fin = control.selectionEnd;
		var inicio = control.value.substr(0, _ini);
		var fin = control.value.substr(_fin, control.value.length);
		control.value = inicio + texto + fin;
		if (_ini == _fin)	{
		   control.selectionStart = inicio.length + texto.length;
		   control.selectionEnd = control.selectionStart;
		   } else	{
	control.selectionStart = inicio.length;
	control.selectionEnd = inicio.length + texto.length;
	}
	control.focus();
	
	} else if (otroNav)	{//alert("otro");
	 control.value += texto;
	 control.focus();
	
	} else if (ie)	{
		 control.focus();
		 if (control.createTextRange)	
		 {
			//if (!control.posi) datos_ie(control);
			control.posi = document.selection.createRange().duplicate();   
			with(control)	{
					var actuar = (posi.text == "");
					posi.text = texto;
					if (!actuar)
					posi.moveStart("character", -texto.length);
					posi.select();
					}
		}
	}

	if(typeof registra != 'undefined') {
	registra(contenedor);
	}
}

function imagen_para(tag)
{
	switch (tag) 
	{
		case "Negrita": return "bold.gif"; break;
		case "Subrayado": return "underline.gif"; break;
		case "Cursiva": return "italic.gif"; break;
		case "Insertar enlace": return "link.gif";break;
		case "Insertar imagen": return "insertimage.gif";break;	
		case "Lista": return "bullist.gif"; break;
		case "Fuente": return "sfuente.gif"; break;
	}		 
 }
 
function muestra_oculta(tag,contenedor)
{		 
	if (document.getElementById)
	{ 	
		switch (tag)
		{
		   case "caretos": document.getElementById("fuente_"+contenedor).style.display="none"; break
		   case "fuente": document.getElementById("caretos_"+contenedor).style.display="none"; break
		}		   
	id=tag+"_"+contenedor;
	var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	}
 }
		 		 
function btn_seleccionado(tag,contenedor)
{
	switch (tag) 
	{
		case "Negrita": instag("b",contenedor); break;
		case "Subrayado": instag("u",contenedor); break;
		case "Cursiva": instag("i",contenedor); break;		
		case "Insertar enlace": inslink(contenedor);break;
		case "Insertar imagen": insimg(contenedor);break;
		case "Lista": inslist (contenedor); break;
		case "Previo": comprueba_bbcode2html(contenedor); break;
		//case "Ayuda": window.open("http://sites.google.com/site/fdvcreations/google-sites/ayuda-para-bbcode","ayudabbcode","width=600,height=400,menubar=no,scrollbars=yes"); break;
		default: break;
	}
 }
		 
function instag (tag,contenedor)
{
	 var seleccion="";
	 var resultado="";
	 seleccion=leer_de(contenedor);
	 resultado="["+tag+"]"+seleccion+"[/"+tag+"]";
	 insertar_en (resultado,contenedor);
}
		 
function inscolor (contenedor)
{
	 var control=document.getElementById("Selec_Color_"+contenedor);
	 var tag=control.value;
	 if (tag!="") {
		var seleccion="";
		var resultado="";
		seleccion=leer_de(contenedor);
		resultado="[color="+tag+"]"+seleccion+"[/color]";
		insertar_en (resultado,contenedor);
		control.value="";
		}
 }

function inssize (contenedor)
{
	var control=document.getElementById("Selec_size_"+contenedor);
	var tag=control.value;
	if (tag!="") 
	{
		var seleccion="";
		var resultado="";
		seleccion=leer_de(contenedor);
		resultado="[size="+tag+"]"+seleccion+"[/size]";
		insertar_en (resultado,contenedor);
		control.value="";
	}
}
		 
function insfont (contenedor)
{
	 var control=document.getElementById("Selec_font_"+contenedor);
	 var tag=control.value;
	 if (tag!="") 
	 {
		var seleccion="";
		var resultado="";
		seleccion=leer_de(contenedor);
		resultado="[font="+tag+"]"+seleccion+"[/font]";
		insertar_en (resultado,contenedor);
		control.value="";
	}
}
		  
function inslink (contenedor)
{
	 var seleccion="";
	 var resultado="";
	 var enlace = prompt("Introduzca la URL:", "http://");
	 
	 seleccion=leer_de(contenedor);
	 if (seleccion==""){
	   resultado="[url]"+enlace+"[/url]";
	   } else {
	   resultado="[url="+enlace+"]"+seleccion+"[/url]";
	   }
	 insertar_en (resultado,contenedor);
}
		 
function insimg (contenedor)
{
	 var enlace="";
	 var resultado="";
	 
	 enlace=leer_de(contenedor);
	 if (enlace==""){
		enlace = prompt("Introduzca la URL de la Imagen:", "http://");
		}
	 resultado="[img]"+enlace+"[/img]";
	 insertar_en (resultado,contenedor);
}

function inslist (contenedor)
{
	 var seleccion="";
	 var resultado="";
	 seleccion=leer_de(contenedor);
		 
	 resultado='[list]\r\n[*]'+seleccion+'\r\n[/list]';
	 insertar_en (resultado,contenedor);
}
		 
function boton(tag,contenedor)
{
	var resultado="";
	if (tag=="|") {
	resultado="&nbsp;&nbsp;";
	} else {		 	
	resultado+='<img src="';
	resultado+=carpetagrf;
	resultado+=imagen_para(tag);
	resultado+='" onclick="btn_seleccionado(';
	resultado+="'";
	resultado+=tag;
	resultado+="','";
	resultado+=contenedor;
	resultado+="')";
	resultado+='" onmouseover="this.style.border=';
	resultado+="'solid 1px #000000';";
	resultado+='" onmouseout="this.style.border=';
	resultado+="'solid 1px #F7F7F7';";
	resultado+='" style="border: 1px solid rgb(247, 247, 247);" title="';
	resultado+=tag;
	resultado+='" ';
	if (esicono(tag)=="no"){
	   resultado+='height=20 width=21';
	   }
	resultado+='>&nbsp;';
	}
	return resultado;	 
}

function esicono(tag)
{
	 var resultado="no";
	 for (i=0;i<matriz_iconos.length;i++){
		 if (matriz_iconos[i]==tag) {
			resultado="si";
			break
			}
		 } 
}
		 
function editor_para(contenedor)
{        
	 var html_btn="";
	 html_btn+="<div style='display:inline;'>";
	 html_btn+=boton("Negrita",contenedor);
	 html_btn+=boton("Subrayado",contenedor);		 
	 html_btn+=boton("Cursiva",contenedor);
	 html_btn+=boton("Lista",contenedor);
	 html_btn+=boton("|",contenedor);	
	 html_btn+=boton("Insertar enlace",contenedor);
	 html_btn+=boton("Insertar imagen",contenedor);
	 html_btn+=boton("|",contenedor);
	// html_btn+=boton("Ayuda",contenedor);		 
	 /*if(typeof bbcode2html != 'undefined') {		 		   
			   html_btn+=boton("Previo",contenedor);
			   }*/		 
	 html_btn+="</div>";				
	 // Fuente		
	 html_btn+='<div id="fuente_'+contenedor+'" style="display:inline; border-width:0; font-size:11;">';
	 html_btn+="&nbsp;";
	 html_btn+="Fuente:&nbsp;";
	 html_btn+='<select id="Selec_font_'+contenedor+'" onchange="insfont (';
	 html_btn+="'"+contenedor+"')";
	 html_btn+='"><option value="" selected>-';
	 html_btn+='<option value="Times New Roman,serif">Times New Roman';
	 html_btn+='<option value="Garamond,serif">Garamond';
	 html_btn+='<option value="Georgia,serif">Georgia';
	 html_btn+='<option value="Arial,sans-serif">Arial';
	 html_btn+='<option value="Trebuchet,sans-serif">Trebuchet';
	 html_btn+='<option value="Verdana,sans-serif">Verdana';
	 html_btn+='<option value="Courier,monospace">Courier';
	 html_btn+='<option value="Courier New,monospace">Courier New';
	 html_btn+='<option value="Andale Mono,monospace">Andale Mono';
	 html_btn+='</select>';
	 
	 html_btn+="&nbsp;Tama&ntilde;o:&nbsp;";
	 html_btn+='<select id="Selec_size_'+contenedor+'" onchange="inssize (';
	 html_btn+="'"+contenedor+"')";
	 html_btn+='"><option value="" selected>-';
	 html_btn+='<option value="8">8';
	 html_btn+='<option value="10">10';
	 html_btn+='<option value="12">12';
	 html_btn+='<option value="16">16';
	 html_btn+='<option value="24">24';
	 html_btn+='<option value="34">34';
	 html_btn+='<option value="46">46';
	 html_btn+='</select>';
	 
	 html_btn+="&nbsp;Color:&nbsp;";
	 html_btn+='<select id="Selec_Color_'+contenedor+'" onchange="inscolor (';
	 html_btn+="'"+contenedor+"')";
	 html_btn+='"><option value="" selected>-';
	 html_btn+='<option value="white" style="color:white;">blanco';
	 html_btn+='<option value="#073763" style="color:#073763;">azul texto BBVA';
	 html_btn+='<option value="black" style="color:black;">negro';
	 html_btn+='<option value="green" style="color:green;">verde';
	 html_btn+='<option value="red" style="color:red;">rojo';
	 html_btn+='<option value="yellow" style="color:yellow;">amarillo';
	 html_btn+='<option value="blue" style="color:blue;">azul';
	 html_btn+='<option value="aqua" style="color:aqua;">Agua';
	 html_btn+='<option value="gray" style="color:gray;">gris';
	 html_btn+='<option value="lime" style="color:lime;">lima';
	 html_btn+='<option value="maroon" style="color:maroon;">marron';
	 html_btn+='<option value="navy" style="color:navy;">mar';
	 html_btn+='<option value="silver" style="color:silver;">plata';
	 html_btn+='<option value="cyan" style="color:cyan;">celeste';		 
	 html_btn+='</select>';
	 // Fin Fuente
	 html_btn+='</div>';

	 document.write (html_btn);
	 // muestra_oculta("fuente",contenedor);
} 
