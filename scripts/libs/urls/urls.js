define(function() {
	var URLs = {
		eventos			: 'http://localhost/produccion/web/api/eventos',
		eventos_cat		: 'http://localhost/produccion/web/api/eventosCategoria/<id_cat>',
		eventos_subcat	: 'http://localhost/produccion/web/api/eventos/<id_subcat>',
		destacados		: 'http://localhost/produccion/web/api/destacados/',
		//destacados		: 'search.json',
		detalle_evento	: 'http://localhost/produccion/web/api/detalleEvento/',
		img_evento		: 'http://localhost/produccion/web/data/img/thumbs/',
		categorias		: 'http://localhost/produccion/web/api/categorias/',
		subcategorias	: 'http://localhost/produccion/web/api/subcategorias/<id_cat>',
		busqueda		: 'http://localhost/produccion/web/?p=api&m=search&a=<string_busqueda>',
		//busqueda		: 'search.json',
		publicidad		: 'http://localhost/produccion/web/api/publicidad/',
		municipios		: 'http://localhost/produccion/web/api/municipios'
	};
	
	return URLs;
});
