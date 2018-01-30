# gsite

## OAUTH
Las llamadas a Google Drive(GD) para obtener información deben estar autorizadas mediante el protocolo Oauth2.
Este protocolo consiste en que un usuario de GD cede permisos a la aplicación web bbva.com para que esta acceda a su contenido en GD.
En nuestro caso de uso lo que queremos acceder al GD del usuario jose.drac.contractor@bbva.com para ofrecer el contenido de sus spreadsheets a todos los usuarios de la web. Lo que necesitamos es generar un 'token' oauth de jose.drac.contractor y compartirlo con todos los usuarios para autorizar su acceso.

Para generar este token el usuario jose.drac.contractor ha de acceder a la página:
* https://sites.google.com/a/bbva.com/evolucionadigital/oauth

La primera vez que se accede habrá que:
* Permitir las ventanas emergentes en el navegador.
* Pulsar el botón de autorización.
* Aceptar la petición de permisos.

El token se generará y se guardará automaticamente en un archivo(token_file).
Los tokens que ofrece Google API caducan cada hora así que debemos actualizarlo antes para que el contenido siga disponible, para ello debemos dejar permanentemente activo un navegador con esta página cargada y ella sola se refrescara cada 50 minutos generando un nuevo token sin intervención del usuario.
Una vez que tenemos almacenado un token valido en un token_file accesible publicamente desde la web podremos autorizar cualquier peticion a GD añadiendo dicho token a la url. Para hacer esto se ha programado un wrapper en el archivo:
* gsites/evolucionaDigital/js/envaironment.js

Este wrapper recibe como parametros una url y un callback, cuando se ejecuta hace una lectura del token_file y convierte la url en una url autorizada, posteriormente ejecuta el callback inyectandole la url autorizada. Este callback debería ser el que haga la petición a GD.
Podeis ver un ejemplo en el archivo:
* gsites/evolucionaDigital/implementaciones.xml

### OAUTH FAQ
* El token_file no puede guardarse en un servidor HTTP externo porque Google Sites(GS) sirve la web como HTTPS y no permite hacer llamadas HTTP al perderse la confidencialidad de las comunicaciones.
* El que generemos un servidor HTTPS con credenciales autofirmadas no sirve porque los navegadores solo confían en certificados de Autoridades Certificadoras.
* El token file debe ser un spreadsheet compartido como 'publico en web' para que pueda ser leido por cualquiera.
* Los usuarios de bbva.com (incluido jose.drac.contractor) no pueden compartir documentos de GD como 'publico en web' por lo que el token_file debe ser creado por una cuenta externa a bbva.com y dar al usuario jose.drac.contractor permisos de edición sobre ese fichero.
* El token caduca cada hora por lo que debe generarse uno nuevo antes de que expire para seguir ofreciendo el servicio.
* No podemos usar el 'refresh_token' propio de Oauth para generar tokens nuevos ya que se debería hacer en un backend que no tenemos.


### Como acceder a los datos de una spreadsheet en la que solo se tienen permisos de lectura
* Hay que realizar la llamada a través de un script de GAS. Para ello se realizará una llamada ayax al script pasando los parámetros necesarios de la Spreadsheet.
* Un ejemplo de script sería:
'''
function doGet(e) {
  return ContentService
    .createTextOutput('on_result(' + JSON.stringify(returnData(e)) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function returnData(e) {
  var data = SpreadsheetApp
      .openById(e.parameter.key)
      .getSheets()[e.parameter.sheetIndex]
      .getDataRange()
      .getValues();
  return data;
}
'''
* El doGet recibiria por GET la petición ayax y devolvería las celdas de la Spreadsheet mediante la función returnData.
* Un ejemplo de petición por ayax sería:
'''
function sendQuery() {

    var dataForm = {
        'key': getSpreadsheetKey(),
        'sheetIndex': contextVars.sheetIndex
    };

    $.ajax({
        type: 'GET',
        url: 'https://script.google.com/a/bbva.com/macros/s/AKfycbyUHqliB455rjeTHt5m8OCXQtWSfiN1xP8aqGTUVcOddCzNOHU/exec',
        data: dataForm,
        dataType: 'jsonp',
        crossDomain: true,
        jsonpCallback: "on_result",
        success: function (data) {
            //Eliminamos las primeras filas ya que no son necesarias
            data.splice(0, 7);
            console.log(data);
            handleQueryResponse(data);
        },
        error: function () {
            console.log('error');
        }
    });

}

function handleQueryResponse(response) {
    data = getDataFiltered(response);
    if (data) {
        createCards(data);
        gadgets.window.adjustHeight();
    }
}
'''
* En la llamada pasariamos la key del Spreadsheet y el índice de la hoja si fuese necesario.
