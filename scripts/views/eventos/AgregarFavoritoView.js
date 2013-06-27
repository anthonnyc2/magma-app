/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'text!views/eventos/AgregarFavoritoView.tpl' ],
    function (urls, lang, $, _, Backbone, ViewTemplate) {
		var View = Backbone.View.extend({
			operacion_agregar: true, // true = agregar, false = remover
			infoEvento : null,
			
            events:{
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click #button-agregarfavorito' : 'btnAgregarFavorito_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                'click #favoritos_cerrar' : 'btnBack_clickHandler'
            },
            
            initialize: function(infoEvento)
            {
            	this.infoEvento = infoEvento;
            	
            	if ( this.esFavorito(infoEvento['id']) == -1 ) // No es favorito, mostrar el texto "Agregar a favoritos"
            	{
            		this.operacion_agregar = true;
            	}
            	else // Es favorito, mostrar botón "Eliminar de favoritos"
            	{
            		this.operacion_agregar = false;
            	}
            },

            render:function () {
            	var data = lang.getStringList();
            	data.operacion_agregar = this.operacion_agregar;
            	
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
            	$.mobile.jqmNavigator.popView({ transition : 'slideup', reverse : true });
            },
            
            btnAgregarFavorito_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var id_fav = this.infoEvento['id'];
            	
            	var storage = window.localStorage;
            	var lista_favoritos_json = storage.getItem('favoritos'); // Obtener JSON de favoritos
            	
            	// Lista de objetos Javascript con los favoritos
            	var lista_favoritos = lista_favoritos_json ? JSON.parse(lista_favoritos_json) : [];
            	var index_favorito = this.esFavorito(id_fav); // Posición en el array si es favorito, -1 si no lo es
            	
            	if ( index_favorito != -1 ) // Es favorito, removerlo de la lista
            	{
            		lista_favoritos.splice(index_favorito, 1);
            	}
            	else // No es favorito, agregar al comienzo de la lista
            	{
            		lista_favoritos.unshift(this.infoEvento);
            	}
            	
            	lista_favoritos_json = JSON.stringify(lista_favoritos); // Transformar nueva lista en JSON
            	storage.setItem('favoritos', lista_favoritos_json); // Guardar en localStorage
            	
            	$("div.mensaje").html( index_favorito != -1 ? lang.getString('favoritos_text_favoritoeliminado') : lang.getString('favoritos_text_favoritoagregado') );
            },
            
            esFavorito:function(id_evt)
            {
            	var favorito = -1; // No es favorito por defecto
            	
            	var storage = window.localStorage;
            	var lista_favoritos_json = storage.getItem('favoritos');
            	var lista_favoritos = [];
            	
            	if (lista_favoritos_json)
            	{
            		lista_favoritos = JSON.parse(lista_favoritos_json);
            		
            		for (var i in lista_favoritos)
            		{
            			var obj = lista_favoritos[i];
            			
            			if ( obj['id'] == id_evt )
            			{
            				favorito = i; // Devolver la posición del favorito
            				break;
            			}
            		}
            	}
            	
            	return favorito;
            }
        });
        return View;
    });