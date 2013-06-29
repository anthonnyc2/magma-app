<%
	// Preprocesamiento de strings
	
	var evento_titulo = detalles_evento["titulo_" + language_suffix];
	var evento_categoria = detalles_evento["categoria_" + language_suffix];
	var evento_imagen = ( detalles_evento['imagen'].length > 1 ) ? "<img src=\"" + urls.img_evento + detalles_evento['imagen'] + "\" alt=\"\" />" : '';
	var evento_descripcion = detalles_evento["descripcion_" + language_suffix];
	
	var evento_lugar = detalles_evento['lugar'];
	var evento_direccion = detalles_evento['direccion'];
	var evento_municipio = detalles_evento["municipio_" + language_suffix];
	
	
	/*
	 * FECHAS
	 */
	var temp_fechainicio = detalles_evento['fecha_inicio'].split("-"), temp_fechafin = detalles_evento['fecha_fin'].split("-");
	temp_fechainicio.reverse();
	temp_fechafin.reverse();
	var evento_fechainicio = temp_fechainicio.join("/");
	var evento_fechafin = temp_fechafin.join("/");
	
	var evento_string_fechas;
	if (evento_fechainicio == evento_fechafin) // Una sola fecha
	{
		evento_string_fechas = eventos_detalle_cuando_fecha_simple.replace("<fecha_inicio>", evento_fechainicio);
	}
	else // Fecha de inicio y final diferentes
	{
		evento_string_fechas = eventos_detalle_cuando_fecha_doble.replace("<fecha_inicio>", evento_fechainicio).replace("<fecha_final>", evento_fechafin);
	}
	
	
	/*
	 * HORAS
	 */
	var temp_horainicio = detalles_evento['hora_inicio'].split(":"), temp_horafinal = detalles_evento['hora_final'].split(":");
	temp_horainicio.pop();
	temp_horafinal.pop();
	
	var evento_hora_inicio = temp_horainicio.join(":");
	var evento_hora_final = temp_horafinal.join(":");
	var evento_hora_string = eventos_detalle_cuando_horas_simple.replace("<hora_inicio>", evento_hora_inicio).replace("<hora_final>", evento_hora_final);

	var DIAS_SEMANA = [ "", "L", "M", "X", "J", "V", "S", "D" ];
	var dias_semana = detalles_evento['dias_semana'].length ? detalles_evento['dias_semana'].split(",") : new array();
	var dias_semana_html = "";
	for(var i = 1; i <= 7; i++)
	{
		dias_semana_html += "<div class=\"dia";
		for(var j in dias_semana)
		{
			if (i == dias_semana[j]) dias_semana_html += " dia_selected";
		}
		dias_semana_html += "\"><p>";

		dias_semana_html += DIAS_SEMANA[i];

		dias_semana_html += "</p></div>";
	}
	
	/*
	 * PRECIO
	 */
	var evento_precio = detalles_evento['precio'];
	var evento_precio_string;
	if (evento_precio == 0) // Evento gratuito
	{
		evento_precio_string = eventos_detalle_precio_gratis.replace('<precio>', evento_precio);
	}
	else // Evento pagado
	{
		evento_precio_string = eventos_detalle_precio_simple.replace('<precio>', evento_precio);
	}
	
	/*
	* Detectar si viene desde Destacados
	*/

	var tituto_detalle = '';
	if(bandera_destacados == 1){
		tituto_detalle = destacados_title;
		bandera_destacados = 0;
	}
	else
		tituto_detalle = eventos_detalle_titulo;
	
	
	var evento_telefono = detalles_evento['telf'];
	var evento_email = detalles_evento['email'];
	var evento_web = detalles_evento['web'];
%>

<!-- HOME - header -->
<div data-role="header" data-id="detalleEvento-header" id="detalleEvento-header" data-position="fixed">
	<a data-rel="back" href="#"><img src="images/navigation/back.jpg" alt="" /></a>
	<a href="#more" class="ui-btn-right more_button"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt="" /></a>
	
	<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion"><%= tituto_detalle %></div></div>
</div>
<!-- FIN: HOME - header -->









<!-- HOME - content -->
<div data-role="content" id="detalleEvento-content">
	
	<div class="evento_titulo"><%= evento_titulo %></div>
	<div class="evento_categoria">. <%= evento_categoria %> .</div>
	<div class="evento_imagen"><%= evento_imagen %></div>
	<div class="evento_descripcion"><%= evento_descripcion %></div>
	
	<br />
	
	<div class="evento_masinfo">
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_donde %></div>
			<div class="info info_donde table_cell">
				<span class="info_donde_lugar"><%= eventos_detalle_donde_lugar %></span>: <%= evento_lugar %>
				<br />
				<span class="info_donde_direccion"><%= eventos_detalle_donde_direccion %></span>: <%= evento_direccion %>
				<br />
				<span class="info_donde_municipio"><%= eventos_detalle_donde_municipio %></span>: <%= evento_municipio %>
			</div>
		</div>
		
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_cuando %></div>
			<div class="info info_cuando table_cell">
				<span class="info_cuando_fechas"><%= evento_string_fechas %></span>
				
				<br />
				
				<div class="dias_semana">
					<%= dias_semana_html %>
				</div>
				
				<div class="horas_evento">
					<%= evento_hora_string %>
					<!--<%= evento_hora_inicio %>h-<%= evento_hora_final %>h-->
				</div>
			</div>
		</div>
		
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_precio %></div>
			<div class="info table_cell">
				<%= evento_precio_string %>
			</div>
		</div>
		
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_masinfo %></div>
			<div class="info info_donde table_cell">
				<%= eventos_detalle_masinfo_telefono %>: <%= evento_telefono %>
				<br />
				<%= eventos_detalle_masinfo_email %>: <%= evento_email %>
				<br />
				<%= eventos_detalle_masinfo_web %>: <a href="<%= evento_web %>" target="_blank"><%= evento_web %></a>
			</div>
		</div>
	</div>
</div>
<!-- FIN: HOME - content -->











<!-- HOME - footer -->
<div data-role="footer" data-id="evento-footer" id="evento-footer" data-position="fixed">
	<div data-role="navbar" data-iconpos="top">
		<ul>
			<li>
				<a href="#compartir" data-transition="slideup" data-theme="" data-icon="gear"><div class="text"><%= eventos_navbar_compartir %></div></a>
			</li>
			
			<li>
				<a href="#agregarFavorito" id="agregarFavorito" data-transition="slideup" data-theme="" data-icon="gear"><div class="text"><%= eventos_navbar_favorito_text %></div></a>
			</li>
			
			<li>
				<a href="#mapa" data-transition="slide" data-theme="" data-icon="gear"><div class="text"><%= eventos_navbar_mapa %></div></a>
			</li>
		</ul>
	</div>
</div>
<!-- FIN: HOME - footer -->