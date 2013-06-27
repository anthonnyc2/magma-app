<%
	var titulo_seccion = detalles_evento['destacado'] == 1 ? "Destacados" : "Detalles";
	
	var evento_titulo = detalles_evento["titulo_" + language_suffix];
	var evento_categoria = detalles_evento["categoria_" + language_suffix];
%>
<!-- HOME - header -->
<div data-role="header" data-id="detalleEvento-header" id="detalleEvento-header" data-position="fixed">
	<a data-rel="back" href="#detalleEvento"><img src="images/navigation/back.jpg" alt="" /></a>
	<a href="#more" class="ui-btn-right more_button"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt=""></a>
	
	<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion"><%= eventos_navbar_compartir %></div></div>
</div>
<!-- FIN: HOME - header -->

<div data-role="content" id="detalleEvento-content">
	<div class="evento_titulo"><%= evento_titulo %></div>
	<div class="evento_categoria">- <%= evento_categoria %> -</div>
	
	<div class="menuCompartir">
		<a href="#compartir_email" class="button" data-transition="" data-role="button" id="compartir_email"><div class="text"><%= eventos_compartir_button_correo %></div></a>
		<a href="#compartir_facebook" class="button" data-transition="" data-role="button" id="compartir_facebook"><div class="text"><%= eventos_compartir_button_facebook %></div></a>
		<a href="#compartir_twitter" class="button" data-transition="" data-role="button" id="compartir_twitter"><div class="text"><%= eventos_compartir_button_twitter %></div></a>
		<br />
		<a href="#detalleEvento" class="button" data-transition="" data-role="button" id="compartir_cancelar"><div class="text"><%= eventos_compartir_button_cancelar %></div></a>
	</div>
</div>
