/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/categorias/EventResultsView', 'views/more/MoreView', 'text!views/categorias/SubcatView.tpl'],
    function (urls, lang, $, _, Backbone, EventResultsView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			subcategoriasList: [],
			nombreCat : null,
			idCat: null,
			
            events:{
            	'pageshow' : 'redrawView',
            	'click .more_button' : 'More_clickHandler',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                'click div.subcat a' : 'subcat_clickHandler'
            },
            
            initialize: function(id_cat, nombre_cat)
            {
            	$this = this;
            	$this.subcategoriasList = [];
            	$this.nombreCat = nombre_cat;
            	$this.idCat = id_cat;
            	
            	var Subcategory = Backbone.Model.extend({
            		defaults: {
            			id: null,
            			categoriasId: null,
            			subcategoria_esp: null,
            			subcategoria_cat: null
            		}
            	});
            	
            	var id_cat_api = id_cat > 0 ? id_cat : 0;
            	var url = urls.subcategorias.replace("<id_cat>", id_cat_api);
            	
            	var Subcategories = Backbone.Collection.extend({
            		model: Subcategory,
            		url: url,
            		
            		parse:function(resp)
            		{
            			$this.subcategoriasList = resp;
            			$this.subcategoriasList.sort(function(a,b) {
            				var text = "subcategoria_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Agregar elemento "Todas las subcategorías" al inicio
            			var allSubcatsEl = {
            				id: -1
            			};
            			allSubcatsEl["subcategoria_" + lang.getString('language_suffix')] = lang.getString('subcategorias_allsubcategories');
            			$this.subcategoriasList.unshift(allSubcatsEl);
            			
            			$this.redrawView();
            		}
            	});
            	
            	var subcats = new Subcategories();
            	subcats.fetch();
            },

            render:function () {
            	var stringList = lang.getStringList();
            	stringList.nombre_subcategoria = this.nombreCat;
            	
            	
            	this.$el.html( _.template( ViewTemplate, stringList ) );
                return this;
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

            btnBack_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popView();
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
            
            redrawView: function()
            {
            	// Refrescar el título y fecha de la sección
            	$(".barra_titulo_seccion .titulo_seccion").html(lang.getCategoryName(this.idCat, urls));
            	$(".barra_titulo_seccion .date").html(lang.getDate());
            	
            	// Refrescar la barra de navegación
            	var navBarLinks = $(".ui-footer .ui-navbar ul li a");
            	navBarLinks.each(function() {
            		var hrefText = $(this).attr('href').substring(1, $(this).attr('href').length);
            		var langString = lang.getString("home_navbar_" + hrefText.toLowerCase());
            		
            		$("div.text", this).text(langString);
            	});
            	
            	var list = this.subcategoriasList;
            	var content = $("#subcategorias-content");
            	content.html('');
            	
            	if ( this.subcategoriasList[0] ) this.subcategoriasList[0]["subcategoria_" + lang.getString('language_suffix')] = lang.getString('subcategorias_allsubcategories');
            	
            	for (subcat in list)
            	{
            		var id = list[subcat].id;
            		var nombre = list[subcat]["subcategoria_" + lang.getString('language_suffix')];
            		content.append("<div class=\"subcat\"><a href=\"#subcategoriaDetalle\" class=\"ui-btn\" id=\"subcategoria_id-" + id + "\"><img src=\"images/navigation/forward.jpg\" alt=\"\" /><h4>" + nombre + "</h4></a>");
            	}
            },
            
            subcat_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var id_attr = $(evt.currentTarget).attr('id');
            	var id_cat = this.idCat;
            	var nombre_cat = this.nombreCat;
            	
            	var id_subcat = id_attr.substring(16, id_attr.length);
            	var nombre_subcat = $("h4", evt.currentTarget).text();
            	
				var eventResultsView = new EventResultsView(id_cat, nombre_cat, id_subcat, nombre_subcat);
            	$.mobile.jqmNavigator.pushView(eventResultsView, { transition: 'slide' });
            }

        });
        return View;
    });