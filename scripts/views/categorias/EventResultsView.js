/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/eventos/DetalleEventoView', 'text!views/categorias/EventResultsView.tpl'],
    function (urls, lang, $, _, Backbone, DetalleEventoView, ViewTemplate) {
		var View = Backbone.View.extend({
			idSubcat: -1,
			nombreSubcat: null,
			idCat: -1,
			nombreCat: null,
			eventosList: [],
			loading: true,
			
            events:{
            	'pageshow' : 'redrawView',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                'click div.destacados_home a' : 'subcat_clickHandler'
            },
            
            initialize: function(id_cat, nombre_cat, id_subcat, nombre_subcat)
            {
            	var $this = this;
            	
            	$this.loading = true;
            	
            	$this.idCat = id_cat;
            	$this.nombreCat = nombre_cat;
            	$this.idSubcat = id_subcat;
            	$this.nombreSubcat = nombre_subcat;
            	
            	$this.eventosList = [];
            	
            	var EventosModel = Backbone.Model.extend({
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
            	
            	var url_peticion;
            	if (id_cat == -1)
            	{
            		url_peticion = urls.eventos; // URL de todos los eventos
            		$this.nombreSubcat = lang.getString('categorias_allcategories'); // Mostrar "Todas las categorías"
            	}
            	else if (id_subcat == -1) // Todas las subcategorías de la categoría
            	{
            		url_peticion = urls.eventos_cat.replace("<id_cat>", id_cat);
            	}
            	else // Eventos de la subcategoría especificada
            	{
            		url_peticion = urls.eventos_subcat.replace("<id_subcat>", id_subcat);
            	}
            	
            	var EventosCollection = Backbone.Collection.extend({
            		model	: EventosModel,
            		url		: url_peticion,
            		
            		parse:function(resp)
            		{
            			$this.eventosList = resp;
            			
            			$this.eventosList.sort(function(a,b) {
            				var A = new Date(a.fecha_inicio + " " + a.hora_inicio);
            				var B = new Date(b.fecha_inicio + " " + b.hora_inicio);
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Cargar lista de eventos en el HTML
            			$this.loading = false;
            			$this.redrawView();
            		}
            	});            	
            	
            	var eventosCollection = new EventosCollection();
            	eventosCollection.fetch();
            },

            render:function () {
            	var stringList = lang.getStringList();
            	stringList.nombre_subcategoria = this.nombreSubcat;
            	
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
            
            redrawView: function()
            {
            	$(".ui-header .barra_titulo_seccion .titulo_seccion").html(this.nombreSubcat || this.nombreCat);
            	$(".barra_titulo_seccion .date").html(lang.getDate());
            	
            	var no_events = this.idCat == -1 ? lang.getString('categorias_noevents') : lang.getString('categorias_subcategoria_noevents');
            	var content = $("#eventresults-content");
            	content.html( this.loading ? lang.getString('loading') : ( this.eventosList.length > 0 ? '' : no_events ) );
            	
            	for (var i = 0; i < this.eventosList.length; i++)
            	{
            		var obj = this.eventosList[i];
            		var nombre = obj["titulo_" + lang.getString('language_suffix')];
            		var categorias = obj["categoria_" + lang.getString('language_suffix')];
            		var titulo = obj["titulo_" + lang.getString('language_suffix')];
            		var lugar = obj['lugar'];
            		//var precio = obj['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", obj['precio']) : lang.getString('eventos_detalle_precio_gratis');
            		
                        // Formatear precio del evento
            		var precio_raw = obj['precio'];
                        var precio_raw=Math.round(precio_raw*100);
                        
            		var precio = precio_raw == 0 ?
            			lang.getString('eventos_detalle_precio_gratis') // Evento gratuito
            			:
            			lang.getString('eventos_detalle_precio_simple').replace('<precio>', precio_raw) // Evento pagado
            		;
                        
                        if(precio_raw != 0){
                            var decimal = precio.substring(precio.length-4,precio.length);
                            var entero = precio.substring(0,precio.length-4);
                            precio = entero+","+decimal;
                        }
                        precio = precio.replace(/ /g,'');
                        
            		// Formatear fecha de la forma DD/MM/AAAA
            		var fechaTempInicio = obj['fecha_inicio'].split("-");
            		var fecha = fechaTempInicio[2] + "/" + fechaTempInicio[1] + "/" + fechaTempInicio[0];
            		var fechaTempFin = obj['fecha_fin'].split("-");
            		var fechaFin = fechaTempFin[2] + "/" + fechaTempFin[1] + "/" + fechaTempFin[0];
            		
            		var HTML = "<div class=\"destacados_home\"><a href=\"#detalleEvento\" class=\"ui-btn\" id=\"evento-" + i + "\">";
            		HTML += "<div class=\"categorias\">" + lang.getString('eventos_title_categoria') + ": <div class=\"lista_categorias\">" + categorias + "</div></div>";
            		HTML += "<div class=\"titulo\">" + titulo + "</div>";
            		HTML += "<img src=\"images/navigation/forward.jpg\" alt=\"\" />";
            		HTML += "<div class=\"lugar\">" + lang.getString('eventos_title_lugar') + ": " + lugar + "</div>"
                        if(fecha != fechaFin)
                            HTML += "<div class=\"fecha\">" + lang.getString('eventos_title_varios_dias_1') + " " + fecha + " " + lang.getString('eventos_title_varios_dias_2') + " " + fechaFin + "</div>"
                        else
                            HTML += "<div class=\"fecha\">" + lang.getString('eventos_title_dia') + ": " + fecha + "</div>"
            		HTML += "<div class=\"precio\">" + lang.getString('eventos_title_precio') + ": " + precio + "</div>"
            		HTML += "</a></div>";
            		
            		content.append(HTML);
            	}
            },
            
            subcat_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var id_attr = $(evt.currentTarget).attr('id');
            	var index_evento = id_attr.substring(7, id_attr.length);
            	
            	var info_evento = this.eventosList[index_evento];
            	
				var detalleEventoView = new DetalleEventoView(info_evento);
            	$.mobile.jqmNavigator.pushView(detalleEventoView, { transition: 'slide' });
            }

        });
        return View;
    });