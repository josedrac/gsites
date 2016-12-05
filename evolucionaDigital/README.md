# gsite

## OAUTH
Las llamadas a Google Drive(GD) para obtener información deben estar autorizadas mediante el protocolo Oauth2.
Este protocolo consiste en que un usuario de GD cede permisos a la aplicación web bbva.com para que acceda a su contenido en GD.
En nuestro caso de uso queremos acceder al GD del usuario jose.drac.contractor@bbva.com para ofrecer el contenido de sus spreadsheets a todos los usuarios de la web.Por lo que necesitamos es generar un 'token' oauth de jose.drac.contractor y compartirlo con todos los usuarios para autorizar su acceso al GD.

Para generar este token el usuario jose.drac.contractor ha de acceder a la pagina:
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
* Los usuarios de GD (incluido jose.drac.contractor) no pueden compartir documentos como 'publico en web' por lo que el token_file debe ser creado por una cuenta externa a bbva.com y dar al usuario jose.drac.contractor permisos de edición sobre ese fichero.
* El token caduca cada hora por lo que debe generarse uno nuevo antes de que expire para seguir ofreciendo el servicio.
* No podemos usar el 'refresh_token' propio de Oauth para generar tokens nuevos ya que se debería hacer en un backend que no tenemos.
