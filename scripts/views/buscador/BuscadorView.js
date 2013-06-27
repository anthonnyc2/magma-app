/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/buscador/BuscadorResultsView', 'views/more/MoreView', 'text!views/buscador/BuscadorView.tpl'],
    function (urls, lang, $, _, Backbone, BuscadorResultsView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			lista_categorias: [],
			lista_municipios : [],
			
            events:{
            	'pageshow' : 'redrawView',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .more_button' : 'More_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'Home_clickHandler',
                'click #buscar' : 'searchButton_clickHandler',
                'submit form' : 'searchButton_clickHandler'
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            initialize: function()
            {
            	this.loadListaCategorias();
            	this.loadListaMunicipios();
            },
            
            redrawView: function()
            {
            	var HTML = "";
            	
            	if ( typeof this.lista_categorias != 'undefined' && this.lista_categorias.length > 0 )
            	{
	            	var obj_cat = $("#select-categorias");
	            	var obj_mun = $("#select-municipios");
	            	
	            	$(":not(option[value=categoria])", obj_cat).each(function() {
	            		$(this).remove();
	            	});
	            	
	            	$(":not(option[value=municipio])", obj_mun).each(function() {
	            		$(this).remove();
	            	});

            		// Cargar categorías
            		var list = this.lista_categorias;
            		for (var i in list)
            		{
            			var id_cat = list[i]['id'];
            			var nombre_cat = list[i]["categoria_" + lang.getString('language_suffix')];
            			
            			obj_cat.append("<option value=\"" + id_cat + "\">" + nombre_cat + "</option>");
            			//HTML += "<option value=\"" + id_cat + "\">" + nombre_cat + "</option>\n";
            		}
            		
            		// Cargar municipios
            		var muns = this.lista_municipios;
            		for (var i in muns)
            		{
            			var id_mun = muns[i]['id'];
            			var nombre_mun = muns[i]["municipio_" + lang.getString('language_suffix')];
            			
            			obj_mun.append("<option value=\"" + id_mun + "\">" + nombre_mun + "</option>");
            		}
            		
            		//obj.html(HTML).selectmenu('refresh', true);
            	}
            },

            render:function () {
            	this.$el.html( _.template( ViewTemplate, lang.getStringList() ) );
            	return this;
            },
            
            Home_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popToFirst();
            },
            
            navBar_clickHandler:function(event)
            {
            	event.preventDefault();
            	var itemHref = $(event.currentTarget).attr('href');
            	var ClaseVista = null;
            	
            	var moduleFile = itemHref == "#categorias" ? "views/categorias/CategoriasView" : ( itemHref == "#favoritos" ? "views/favoritos/FavoritosView" : null );
            	
            	if (moduleFile)
            	{
            		ClaseVista = require(moduleFile);
            		var newView = new ClaseVista();
            		$.mobile.jqmNavigator.popToFirst({ transition : 'none' });
            		$.mobile.jqmNavigator.pushView(newView);
            	}
            },
            
            loadListaCategorias:function()
            {
            	var $this = this;
            	
            	var Category = Backbone.Model.extend({
            		defaults: {
            			id : null,
            			categoria_esp : null,
            			categoria_cat : null
            		}
            	});
            	
            	var Categories = Backbone.Collection.extend({
            		model : Category,
            		url: urls.categorias,
            		
            		parse:function(resp) {
            			$this.lista_categorias = resp;
            			$this.lista_categorias.sort(function(a,b) {
            				var text = "categoria_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Agregar elemento "Todas las categorías"
		    			var allCategoriesEl = {
		    				id: -1
		    			};
		    			allCategoriesEl["categoria_" + lang.getString('language_suffix')] = lang.getString('categorias_allcategories');
		    			$this.lista_categorias.unshift(allCategoriesEl);
		    			
		    			$this.redrawView();
            		}
            	});
            	
            	var cats = new Categories();
            	cats.fetch();
            },
            
            loadListaMunicipios:function()
            {
            	var $this = this;
            	
            	var Municipio = Backbone.Model.extend({
            		defaults: {
            			id : null,
            			municipio_esp : null,
            			municipio_cat : null
            		}
            	});
            	
            	var Municipios = Backbone.Collection.extend({
            		model : Municipio,
            		url: urls.municipios,
            		
            		parse:function(resp) {
            			$this.lista_municipios = resp;
            			$this.lista_municipios.sort(function(a,b) {
            				var text = "municipio_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			$this.redrawView();
            		}
            	});
            	
            	var muns = new Municipios();
            	muns.fetch();
            },
            
           	searchButton_clickHandler:function(evt)
           	{
           		evt.preventDefault();
           		
           		var string_busqueda = $("#buscador-field_palabras").val();
           		
           		var id_cat = $("#select-categorias").val();
           		var municipio = $("#select-municipios").val();
           		var dias = $("#select-fecha").val();
           		var rango_precio = $("#select-rango_precio").val();
           		
           		/*if (string_busqueda.length == 0)
           		{
           			if (navigator.notification) // Corriendo sobre PhoneGap
           			{
           				navigator.notification.alert( lang.getString('buscador_error_sin_texto'), (function() {}), lang.getString('buscador_error_alert_title') );
           			}
           			else // Corriendo en navegador
           			{
	           			alert( lang.getString('buscador_error_sin_texto') );
           			}
           		}
           		else
           		{*/
           			var newView = new BuscadorResultsView(string_busqueda, id_cat, municipio, dias, rango_precio);
           			$.mobile.jqmNavigator.pushView(newView, { transition : 'slide' });
           		//}
           	}
        });
        return View;
    });