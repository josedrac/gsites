var Sidebar = function(options){
  var options = options || {};
  var url_detail = options.url_detail || 'https://sites.google.com/a/bbva.com/portaldeayuda/movilidad/detalle_app?app_id=';
  var fields = options.fields || { id : 0, name: 1,image: 3 } ;
  var template = options.template || function(dataDCm, subseccion){
       var html= "";
       html +='<div class=\"titulo\">' + subseccion + '</div>';
         html +='<ul id=\"botonera\">'; 
         for(var row=0;row<filas;row++){
           if( dataDC.validateRow(row)){
              html +="<li><a  href='"+dataDC.getHref(row)+"' target='_parent'>"+
              dataDC.getName(row)+"</a></li>";
           }
        }
    
      html +='</ul>';
      return html;
  }
  
  
  var gadgetHelper = null;
  var prefs = new _IG_Prefs();
  var urlTable = prefs.getString("_table_query_url");
  var subseccion = prefs.getString("subseccion"); 
  _IG_RegisterOnloadHandler(loadVisualizationAPI);
  
  function loadVisualizationAPI() {
    google.load("visualization", "1", {"packages": ["table"]});
    google.setOnLoadCallback(handleQueryResponse);
  }
    
  function getData(callback){
    var gadgetHelper = new google.visualization.GadgetHelper();
    var opts = {dataType:'jsonp'};
    var queryDC = new google.visualization.Query(urlTable, opts);
     
    var queryDCtosend = "select *";
  
    queryDC.setQuery(queryDCtosend);			  
    queryDC.send(callback);
  
  }
  
  var DataTable= function(data,url_detail){
    var HEADER_ROW = 0;
    this.fields= {
       id : 0,
       name: 1,
       image: 3
    };
  
    var dataDC = data;
    this.getId = function(row){
       return dataDC.getValue(row, this.fields.id);
    }
    this.getHref = function(row){
       return url_detail+this.getId(row);
    }
    this.getNumberOfRows = function(){
       return dataDC.getNumberOfRows();
    }
    this.getName = function(row){
       return dataDC.getValue(row, this.fields.name);
    }		
    this.getImage = function(row){
       return dataDC.getValue(row, this.fields.image);
    }
  
    this.validateRow = function(row){
       return true;
    }
  
  }
  
  function handleQueryResponse(response){
     //console.log(response);
     var dataDC = new DataTable(response.getDataTable(), self.url_detail);
     dataDc.fields = fields;
    var filas = dataDC.getNumberOfRows();
  

    document.getElementById('content_div').innerHTML = template(dataDC, subseccion);
  
  }

}
