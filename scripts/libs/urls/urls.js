define(function() {
	var URLs = {
		eventos			: 'http://www.publicaenmagma.es/produccion/web/api/eventos',
		eventos_cat		: 'http://www.publicaenmagma.es/produccion/web/api/eventosCategoria/<id_cat>',
		eventos_subcat	: 'http://www.publicaenmagma.es/produccion/web/api/eventos/<id_subcat>',
		destacados		: 'http://www.publicaenmagma.es/produccion/web/api/destacados/',
		//destacados		: 'search.json',
		detalle_evento	: 'http://www.publicaenmagma.es/produccion/web/api/detalleEvento/',
		img_evento		: 'http://www.publicaenmagma.es/produccion/web/data/img/thumbs/',
		categorias		: 'http://www.publicaenmagma.es/produccion/web/api/categorias/',
		subcategorias	: 'http://www.publicaenmagma.es/produccion/web/api/subcategorias/<id_cat>',
		busqueda		: 'http://www.publicaenmagma.es/produccion/web/?p=api&m=search&a=<string_busqueda>',
		//busqueda		: 'search.json',
		publicidad		: 'http://www.publicaenmagma.es/produccion/web/api/publicidad/',
		municipios		: 'http://www.publicaenmagma.es/produccion/web/api/municipios'
	};
	
	return URLs;
});
