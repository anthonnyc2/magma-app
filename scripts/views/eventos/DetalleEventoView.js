/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/eventos/CompartirView', 'views/eventos/AgregarFavoritoView', 'views/eventos/MapaView', 'views/more/MoreView','text!views/eventos/DetalleEventoView.tpl'],
    function (urls, lang, $, _, Backbone, CompartirView, AgregarFavoritoView, MapaView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			detalles_evento: null,

            events:{
            	'pageshow' : 'redrawView',
            	'click .more_button' : 'More_clickHandler',
            	'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler'
            },
            
            initialize: function(infoEvento)
            {
            	// Forzar recarga de la información del evento
        		var EventoModel = Backbone.Model.extend({
        			urlRoot: urls.detalle_evento,
        			
        			defaults: {
            			id: 0,
            			accountsId: 0,
            			destacado: 0,
            			titulo_esp : '',
            			titulo_cat : '',
            			categoriasId: -1,
            			subcategoriasId: -1,
            			descripcion_esp : '',
            			descripcion_cat : '',
            			imagen: '',
            			lugar: '',
            			direccion: '',
            			municipio : '',
            			fecha_inicio: '0000-00-00',
            			fecha_fin: '0000-00-00',
            			dias_semana: null,
            			hora_inicio: '00:00:00',
            			hora_final: '00:00:00',
            			precio: 0,
            			telf: '',
            			email: '',
            			web: '',
            			publicado: 0,
            			fecha_registro: '0000-00-00 00:00:00',
            			fecha_publicado: '0000-00-00 00:00:00'
            		}
        		});
        		var evento = new EventoModel({ id : infoEvento.id });
        		evento.fetch({ async : false });
        		
        		this.detalles_evento = evento.toJSON();
            	
            	for (var i in this.detalles_evento) // Corregir valores nulos a 0 binario
            	{
            		if (this.detalles_evento[i] == undefined || this.detalles_evento[i].length < 1) this.detalles_evento[i] = "\0";
            	}
            	
            	// Actualizar los favoritos con los nuevos datos
            	var favoritos = window.localStorage.getItem('favoritos');
            	if (favoritos)
            	{
            		favoritos = JSON.parse(favoritos);
            		
            		if ( this.isFavorite(this.detalles_evento['id']) )
            		{
        				favoritos.splice( i, 1, this.detalles_evento );
            		}
            		
            		favoritos = JSON.stringify(favoritos);
            		
            		window.localStorage.setItem('favoritos', favoritos);
            	}
            },

            render:function () {
            	var data = lang.getStringList();
            	data.detalles_evento = this.detalles_evento;
            	data.urls = urls;
            	data.eventos_navbar_favorito_text = this.isFavorite( this.detalles_evento['id'] ) ? lang.getString('eventos_navbar_removerfavorito') : lang.getString('eventos_navbar_agregarfavorito');
            	
            	this.$el.html( _.template( ViewTemplate, data ) );
            	
            	return this;
            },
            
            Home_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popToFirst();
            },
            
            btnBack_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popView();
            },
            
            navBar_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var itemHref = $(evt.currentTarget).attr('href');
            	
        		var dstClassName = itemHref.charAt(1).toUpperCase() + itemHref.substring(2, itemHref.length) + "View";
            	var dstClass = eval(dstClassName);
            	
            	if (dstClass !== undefined)
            	{
            		var newView = new dstClass(this.detalles_evento);
            		
            		if ( itemHref == '#mapa') $.mobile.jqmNavigator.pushView(newView);
	            	else $.mobile.jqmNavigator.pushView(newView, { transition: 'slideup' });
            	}
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            redrawView:function()
            {
            	var addString = this.isFavorite( this.detalles_evento['id'] ) ? lang.getString('eventos_navbar_removerfavorito') : lang.getString('eventos_navbar_agregarfavorito');
            	$("#agregarFavorito div.text").html(addString);
            },
            
            isFavorite:function(id_evt)
            {
            	var returnval = false;
            	// Actualizar los favoritos con los nuevos datos
            	var favoritos = window.localStorage.getItem('favoritos');
            	if (favoritos)
            	{
            		favoritos = JSON.parse(favoritos);
            		
            		for (var i in favoritos)
            		{
            			if ( favoritos[i]['id'] == id_evt )
            			{
            				returnval = true;
            				break;
            			}
            		}
            	}
            	
            	return returnval;
            }
        });
        return View;
    });