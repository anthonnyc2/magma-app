/*
 * Catalán
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
		language_suffix : 'cat', // Sufijo del idioma
		
		loading : 'Carregant...',
		
		publicidad_loading : 'Carregant publicitat...',
		publicidad_willclosein : 'La publicitat es tancar&agrave; en <timeleft>...',
		
		home_title : 'Inici',
	
		home_navbar_categorias : 'Categories',
		home_navbar_favoritos : 'Favorits',
		home_navbar_buscador : 'Cercador',
		
		
		
		
		more_button_idioma : 'Idioma',
		more_button_informacion : 'Informaci&oacute;',
		more_info_app : '<b>Magma Agenda de Mallorca</b><br />&eacute;s una app gratu&iuml;ta, per a iOS i Android, que et permet estar al dia dels diferents actes i activitats culturals que es realitzen a l\'illa. Pots fer un cop d\'ull a tot el que hi ha publicat o consultar per categories, realitzar cerques personalitzades, afegir actes als teus Favorits, localitzar-los en el mapa i compartir-los amb els teus amics.<br /><br />I si vols que els teus actes culturals apareguin en l\'app, entra al nostre web<br /><b>www.publicaenmagma.es</b><br />i comen&ccedil;a a publicar!',
		
		
		
		
		
		destacados_title : 'Destacats',
		destacados_noevents : 'No hi ha esdeveniments destacats.',
		
		
		
		
		
		
		categorias_title : 'Categories',
		categorias_allcategories : 'Totes les categories',
		categorias_noevents : 'No hi ha esdeveniments en aquesta categoria.',
		categorias_subcategoria_noevents : 'No hi ha esdeveniments en aquesta subcategoria.',
		
		
		
		
		
		
		subcategorias_allsubcategories : 'Totes les subcategories',
		
		
		
		
		
		
		favoritos_title : 'Favorits',
		favoritos_noevents : 'No t&eacute; esdeveniments marcats com a favorits.',
		favoritos_button_agregarfavorito : 'Afegir a favorits',
		favoritos_text_favoritoagregado : 'Afegit a favorits.',
		favoritos_button_eliminarfavorito : 'Eliminar de favorits',
		favoritos_text_favoritoeliminado : 'Eliminat de favorits.',
		
		
		
		
		
		
		buscador_title : 'Cercador',
		
		buscador_error_alert_title : 'Manca informaci&oacute;',
		buscador_error_alert_button : 'Tancar',
		buscador_error_sin_texto : 'No s\'ha especificat un text per buscar.',
		
		buscador_resultados_busqueda_title : 'Resultats',
		buscador_resultados_busqueda_noevents : 'No t&eacute; esdeveniments que coincideixin amb els par&agrave;metres de cerca.',
		
		buscador_string_porpalabras : 'Per paraules',
		buscador_string_porfiltros : 'Per filtres',
		
		buscador_select_categoria : 'Categoria',
		buscador_select_municipio : 'Municipi',
		buscador_select_fecha : 'Data',
		buscador_select_precio : 'Preu',
		
		buscador_select_fecha_todoslosdias : 'Cada dia',
		
		buscador_select_todoslosprecios : 'Todos los precios',
		buscador_select_gratis : 'Gratis',
		buscador_select_menosde10 : 'Menos de 10 &euro;',
		buscador_select_10a25 : 'Entre 10 &euro; y 25 &euro;',
		buscador_select_masde25 : 'Más de 25 &euro;',
		
		
		buscador_button_buscar : 'Cercar',
		
		
		dia_lunes : 'Dilluns',
		dia_martes : 'Dimarts',
		dia_miercoles : 'Dimecres',
		dia_jueves : 'Dijous',
		dia_viernes : 'Divendres',
		dia_sabado : 'Dissabte',
		dia_domingo : 'Diumenge',
		
		
		
		
		
		
		
		eventos_title_categoria : 'Categoria',
		eventos_title_lugar : 'Lloc',
		eventos_title_fecha : 'Data',
		eventos_title_precio : 'Preu',
		
		eventos_navbar_compartir : 'Compartir',
		eventos_navbar_agregarfavorito : 'Afegir a Favorits',
		eventos_navbar_removerfavorito : 'Remoure de Favorits',
		eventos_navbar_mapa : 'Mapa',
		
		eventos_mapa_nodisponible : 'El mapa per aquest esdeveniment no està disponible.',
		eventos_mapa_nodisponible_title : 'No disponible',
		
		eventos_compartir_button_correo : 'Correu',
		eventos_compartir_button_facebook : 'Facebook',
		eventos_compartir_button_twitter : 'Twitter',
		eventos_compartir_button_cancelar : 'Cancel&middot;lar',
		
		eventos_compartir_default_url : 'http://www.publicaenmagma.com/',
		
		eventos_compartir_email_message : '<b><evento_titulo></b>\n\n<em>Categoria:</em> <evento_categoria>\n<em>Preu:</em> <evento_precio>\n<em>Data:</em> <evento_fecha>\n<em>Lloc:</em> <evento_lugar> \n<a href="<evento_url>" target="_blank"><evento_url></a>',
		eventos_compartir_email_subject : '<evento_titulo> - MAGMA Agenda de Mallorca',
		
		eventos_compartir_facebook_message : 'Evento: <evento_titulo>\nCategoria: <evento_categoria>\nLloc: <evento_lugar>\nData: <evento_fecha>\nPreu: <evento_precio>',
		eventos_compartir_facebook_url : '<evento_url>',
		eventos_compartir_facebook_title : '<evento_titulo>',

		eventos_compartir_twitter_message : '[<evento_categoria>] <evento_titulo> (<evento_precio> - <evento_fecha> - <evento_lugar>)',
		eventos_compartir_twitter_url : '<evento_url>',
		
		eventos_detalle_titulo : 'Detalls',
		eventos_detalle_donde : 'ON',
		eventos_detalle_cuando : 'QUAN',
		eventos_detalle_precio : 'PREU',
		eventos_detalle_masinfo : '+ INFO',
		
		eventos_detalle_donde_lugar : 'Lloc',
		eventos_detalle_donde_direccion : 'Adre&ccedil;a',
		eventos_detalle_donde_municipio : 'Municipi',
		
		eventos_detalle_cuando_fecha_simple : 'Dia <fecha_inicio>',
		eventos_detalle_cuando_fecha_doble : 'Entre el <fecha_inicio> i el <fecha_final>',
		eventos_detalle_cuando_horas_simple : '<hora_inicio>h-<hora_final>h',
		eventos_detalle_cuando_horas_doble : '<hora_inicio_1>h-<hora_final_1>h / <hora_inicio_2>h-<hora_final_2>h',
		
		eventos_detalle_precio_gratis : 'Event gratu&iuml;t',
		eventos_detalle_precio_simple : '<precio> €',
		eventos_detalle_precio_doble : '<precio> € (<precio_anticipado> venda anticipada)',
		
		eventos_detalle_masinfo_telefono : 'Tel&egrave;fon',
		eventos_detalle_masinfo_email : 'Correu',
		eventos_detalle_masinfo_web : 'Web'
	};






	return lang;
});