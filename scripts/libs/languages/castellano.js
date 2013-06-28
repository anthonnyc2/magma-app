/*
 * Castellano
 */
define(function() {

	/*
	 * CÓDIGOS HTML - CARACTERES ESPECIALES
	 * 
	 * á = &aacute;		é = &eacute;	...
	 * à = &agrave;		è = &egrave;	...
	 * ñ = &ntilde;
	 * 
	 * · = &middot;
	 * ç = &ccedil;
	 * € = &euro;
	 * 
	 * ¡ = &iexcl;
	 */

	
	var lang = {
		language_suffix : 'esp', // Sufijo del idioma
		
		loading : 'Cargando...',
		
		publicidad_loading : 'Cargando publicidad...',
		publicidad_willclosein : 'La publicidad se cerrar&aacute; en <timeleft>...',
		
		home_title : 'Inicio',
	
		home_navbar_categorias : 'Categorías',
		home_navbar_favoritos : 'Favoritos',
		home_navbar_buscador : 'Buscador',
		
		
		
		
		more_button_idioma : 'Idioma',
		more_button_informacion : 'Informaci&oacute;n',
		more_info_app : '<b>Magma Agenda de Mallorca</b><br />es una app gratuita, para iOS y Android, que te permite estar al d&iacute;a de los distintos eventos y actividades culturales que se realizan en la isla. Puedes echar un vistazo a todo lo que hay publicado o consultar por categor&iacute;as, realizar b&uacute;squedas personalizadas, a&ntilde;adir eventos a tus Favoritos, localizarlos en el mapa y compartirlos con tus amigos.<br /><br />Y si quieres que tus eventos aparezcan en la app, entra en nuestra web<br /><b>www.publicaenmagma.es</b><br/>y &iexcl;empieza a publicar!',
		
		
		
		
		
		destacados_title : 'Destacados',
		destacados_noevents : 'No hay eventos destacados.',
		
		
		
		
		
		
		categorias_title : 'Categorías',
		categorias_allcategories : 'Todas las categorías',
		categorias_noevents : 'No hay eventos en esta categoría.',
		categorias_subcategoria_noevents : 'No hay eventos en esta subcategoría.',
		
		
		
		
		
		
		subcategorias_allsubcategories : 'Todas las subcategorías',
		
		
		
		
		
		
		favoritos_title : 'Favoritos',
		favoritos_noevents : 'No hay eventos marcados como favoritos.',
		favoritos_button_agregarfavorito : 'Añadir a favoritos',
		favoritos_text_favoritoagregado : 'Añadido a favoritos.',
		favoritos_button_eliminarfavorito : 'Eliminar de favoritos',
		favoritos_text_favoritoeliminado : 'Eliminado de favoritos.',
		
		
		
		
		
		
		buscador_title : 'Buscador',
		
		buscador_error_alert_title : 'Falta información',
		buscador_error_alert_button : 'Cerrar',
		buscador_error_sin_texto : 'No se ha especificado un texto para buscar.',
		
		buscador_resultados_busqueda_title : 'Resultados',
		buscador_resultados_busqueda_noevents : 'No hay eventos que coincidan con los par&aacute;metros de búsqueda.',
		
		buscador_string_porpalabras : 'Por palabras',
		buscador_string_porfiltros : 'Por filtros',
		
		buscador_select_categoria : 'Todas las categorías',
		buscador_select_municipio : 'Todos los municipios',
		buscador_select_fecha : 'Fecha',
		buscador_select_precio : 'Precio',
		
		buscador_select_fecha_todoslosdias : 'Todos los d&iacute;as',
		
		buscador_select_todoslosprecios : 'Todos los precios',
		buscador_select_gratis : 'Gratis',
		buscador_select_menosde10 : 'Menos de 10 &euro;',
		buscador_select_10a25 : 'Entre 10 &euro; y 25 &euro;',
		buscador_select_masde25 : 'Más de 25 &euro;',
		
		buscador_button_buscar : 'Buscar',
		
		
		dia_lunes : 'Lunes',
		dia_martes : 'Martes',
		dia_miercoles : 'Mi&eacute;rcoles',
		dia_jueves : 'Jueves',
		dia_viernes : 'Viernes',
		dia_sabado : 'S&aacute;bado',
		dia_domingo : 'Domingo',
		
		
		
		
		
		
		
		eventos_title_categoria : 'Categoría',
		eventos_title_lugar : 'Lugar',
		eventos_title_fecha : 'Fecha',
		eventos_title_dia : 'Día',
		eventos_title_varios_dias_1 : 'Entre el',
		eventos_title_varios_dias_2 : 'y el',
		eventos_title_precio : 'Precio',
		
		eventos_navbar_compartir : 'Compartir',
		eventos_navbar_agregarfavorito : 'Añadir a Favoritos',
		eventos_navbar_removerfavorito : 'Remover de Favoritos',
		eventos_navbar_mapa : 'Mapa',
		
		eventos_mapa_nodisponible : 'El mapa para este evento no está disponible.',
		eventos_mapa_nodisponible_title : 'No disponible',
		
		eventos_compartir_button_correo : 'Correo',
		eventos_compartir_button_facebook : 'Facebook',
		eventos_compartir_button_twitter : 'Twitter',
		eventos_compartir_button_cancelar : 'Cancelar',
		
		eventos_compartir_default_url : 'http://www.publicaenmagma.com/',
		
		eventos_compartir_email_message : '<b><evento_titulo></b>\n\n<em>Categoría:</em> <evento_categoria>\n<em>Precio:</em> <evento_precio>\n<em>Fecha:</em> <evento_fecha>\n<em>Lugar:</em> <evento_lugar> \n<a href="<evento_url>" target="_blank"><evento_url></a>',
		eventos_compartir_email_subject : '<evento_titulo> - MAGMA Agenda de Mallorca',
		
		eventos_compartir_facebook_message : 'Evento: <evento_titulo>\nCategoría: <evento_categoria>\nLugar: <evento_lugar>\nFecha: <evento_fecha>\nPrecio: <evento_precio>',
		eventos_compartir_facebook_url : '<evento_url>',
		eventos_compartir_facebook_title : '<evento_titulo>',

		eventos_compartir_twitter_message : '[<evento_categoria>] <evento_titulo> (<evento_precio> - <evento_fecha> - <evento_lugar>)',
		eventos_compartir_twitter_url : '<evento_url>',
		
		eventos_detalle_titulo : 'Detalles',
		eventos_detalle_donde : 'DÓNDE',
		eventos_detalle_cuando : 'CUÁNDO',
		eventos_detalle_precio : 'PRECIO',
		eventos_detalle_masinfo : '+ INFO',
		
		eventos_detalle_donde_lugar : 'Lugar',
		eventos_detalle_donde_direccion : 'Dirección',
		eventos_detalle_donde_municipio : 'Municipio',
		
		eventos_detalle_cuando_fecha_simple : 'El día <fecha_inicio>',
		eventos_detalle_cuando_fecha_doble : 'Entre el <fecha_inicio> y el <fecha_fin>',
		eventos_detalle_cuando_horas_simple : '<hora_inicio>h-<hora_final>h',
		eventos_detalle_cuando_horas_doble : '<hora_inicio_1>h-<hora_fin_1>h / <hora_inicio_2>h-<hora_fin_2>h',
		
		eventos_detalle_precio_gratis : 'Gratis',
		eventos_detalle_precio_simple : '<precio> €',
		eventos_detalle_precio_doble : '<precio> € (<precio_anticipado> venta anticipada)',
		
		eventos_detalle_masinfo_telefono : 'Teléfono',
		eventos_detalle_masinfo_email : 'E-mail',
		eventos_detalle_masinfo_web : 'Web'
	};






	return lang;
});