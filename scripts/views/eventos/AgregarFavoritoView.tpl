<%
	var evento_titulo = detalles_evento["titulo_" + language_suffix];
	var evento_categoria = detalles_evento["categoria_" + language_suffix];
	
	var texto_boton = operacion_agregar ? favoritos_button_agregarfavorito : favoritos_button_eliminarfavorito;
%>
<!-- HOME - header -->
<div data-role="header" data-id="detalleEvento-header" id="detalleEvento-header" data-position="fixed">
	<a data-rel="back" href="#detalleEvento"><img src="images/navigation/back.jpg" alt="" /></a>
	<a data-transition="slide" href="#more"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt=""></a>
	
	<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion">Favoritos</div></div>
</div>
<!-- FIN: HOME - header -->

<div data-role="content" id="detalleEvento-content">
	<div class="evento_titulo"><%= evento_titulo %></div>
	<div class="evento_categoria">- <%= evento_categoria %> -</div>
	
	<div class="menuCompartir">
		<div class="mensaje">
			<a href="#" data-role="button" id="button-agregarfavorito"><%= texto_boton %></a>
		</div>
		<br />
		<a href="#detalleEvento" class="button" data-transition="" data-role="button" id="favoritos_cerrar">Cerrar</a>
	</div>
</div>