/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/categorias/SubcatView', 'views/categorias/EventResultsView', 'views/favoritos/FavoritosView', 'views/buscador/BuscadorView', 'views/more/MoreView', 'text!views/categorias/CategoriasView.tpl'],
    function (urls, lang, $, _, Backbone, SubcatView, EventResultsView, FavoritosView, BuscadorView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			categoriasList: [],
			loading: true,
			
            events:{
            	'pageshow' : 'refreshCategories',
            	'click .more_button' : 'More_clickHandler',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'Home_clickHandler', // Como es primera página de navegación, vuelve al Home
                'click div.subcat a' : 'subcat_clickHandler'
            },
            
            initialize: function()
            {
            	var $this = this;
            	$this.categoriasList = [];
            	$this.loading = true;
            	
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
            			$this.categoriasList = resp;
            			
            			$this.categoriasList.sort(function(a,b) {
            				var text = "categoria_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Agregar elemento "Todas las categorías"
		    			var allCategoriesEl = {
		    				id: -1
		    			};
		    			allCategoriesEl["categoria_" + lang.getString('language_suffix')] = lang.getString('categorias_allcategories');
		    			$this.categoriasList.unshift(allCategoriesEl);
            			
            			$this.loading = false;
            			$this.refreshCategories();
            		}
            	});
            	
            	var cats = new Categories();
            	cats.fetch();
            	
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
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            navBar_clickHandler:function(event)
            {
            	event.preventDefault();
            	var itemHref = $(event.currentTarget).attr('href');
            	var ClaseVista = null;
            	
            	var moduleFile = itemHref == "#favoritos" ? "views/favoritos/FavoritosView" : ( itemHref == "#buscador" ? "views/buscador/BuscadorView" : null );
             
            	if (moduleFile)
            	{
            		ClaseVista = require(moduleFile);
            		var newView = new ClaseVista();
            		$.mobile.jqmNavigator.popToFirst({ transition : 'none' });
            		$.mobile.jqmNavigator.pushView(newView);
            	}
            },
            
            refreshCategories:function()
            {
            	$(".ui-header .barra_titulo_seccion .titulo_seccion").html(lang.getString('categorias_title'));
            	$(".barra_titulo_seccion .date").html(lang.getDate());
            	
            	var list = this.categoriasList;
            	var content = $("#categorias-content");
            	content.html( this.loading ? lang.getString('loading') : ( list.length > 0 ? "" : "No hay categorías disponibles.") );
            	
            	if ( this.categoriasList[0] ) this.categoriasList[0]["categoria_" + lang.getString('language_suffix')] = lang.getString('categorias_allcategories');
            	
            	for (cat in list)
            	{
            		var id = list[cat].id;
            		var nombre = list[cat]["categoria_" + lang.getString('language_suffix')];
            		content.append("<div class=\"subcat\"><a href=\"#categoriaDetalle\" class=\"ui-btn\" id=\"categoria_id-" + id + "\"><img src=\"images/navigation/forward.jpg\" alt=\"\" /><h4>" + nombre + "</h4></a>");
            	}
            },
            
            subcat_clickHandler:function(evt) {
            	evt.preventDefault();
            	var id_attr = $(evt.currentTarget).attr('id');
            	
            	var id_cat = id_attr.substring(13, id_attr.length);
            	var nombre_cat = $("h4", evt.currentTarget).text();
            	
            	var newView = null;
            	if (id_cat == -1) // Todas las subcategorías, pasar directo a la vista de resultados
            	{
            		newView = new EventResultsView(id_cat, nombre_cat);
            	}
            	else // Seleccionada categoría, mostrar subcategorías
            	{
            		newView = new SubcatView(id_cat, nombre_cat, -1, "");
            	}
            	
				$.mobile.jqmNavigator.pushView( newView, { transition: 'slide' } );
            }

        });
        return View;
    });