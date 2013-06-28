/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */


// 
define(['require', 'urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/eventos/DetalleEventoView', 'views/more/MoreView', 'text!views/favoritos/FavoritosView.tpl'],
	function (require, urls, lang, $, _, Backbone, DetalleEventoView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			lista_favoritos: [],
			CategoriasView: null,
			FavoritosView: null,
			BuscadorView: null,
			
            events:{
            	'pageshow' : 'redrawView',
            	'click .more_button' : 'More_clickHandler',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'Home_clickHandler',
                'click .ui-content div.destacados_home a' : 'detalleEvento_clickHandler'
            },
            
            initialize:function() // No requiere flag loading, ya que la carga de favoritos desde localStorage no es asincrónica
            {
            	$this = this;
            	
            	var lista_favoritos_json = window.localStorage.getItem('favoritos');
            	$this.lista_favoritos = lista_favoritos_json ? JSON.parse(lista_favoritos_json) : [];
            },

            render:function () {
            	var data = lang.getStringList();
            	data.lista_favoritos = this.lista_favoritos;
            	
            	this.$el.html( _.template( ViewTemplate, data ) );
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
            	
            	var moduleFile = itemHref == "#categorias" ? "views/categorias/CategoriasView" : ( itemHref == "#buscador" ? "views/buscador/BuscadorView" : null );
            	
            	if (moduleFile)
            	{
            		ClaseVista = require(moduleFile);
            		var newView = new ClaseVista();
            		$.mobile.jqmNavigator.popToFirst({ transition : 'none' });
            		$.mobile.jqmNavigator.pushView(newView);
            	}
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
            	$(".barra_titulo_seccion .titulo_seccion").html(lang.getString("favoritos_title"));
            	$(".barra_titulo_seccion .date").html(lang.getDate());
            	
            	// Refrescar la barra de navegación
            	var navBarLinks = $(".ui-footer .ui-navbar ul li a");
            	navBarLinks.each(function() {
            		var hrefText = $(this).attr('href').substring(1, $(this).attr('href').length);
            		var langString = lang.getString("home_navbar_" + hrefText.toLowerCase());
            		
            		$("div.text", this).text(langString);
            	});
            	
				// Actualizar lista de favoritos antes de redibujar
            	var lista_favoritos_json = window.localStorage.getItem('favoritos');
            	this.lista_favoritos = lista_favoritos_json ? JSON.parse(lista_favoritos_json) : [];
            	
            	var container = $("#favoritos-content");
            	var list = this.lista_favoritos;
            	container.html( list.length > 0 ? '' : lang.getString('favoritos_noevents') );
            	
            	for (var i = 0; i < list.length; i++)
            	{
            		var obj = list[i];
            		
            		var id_evento = obj['id'];
            		var categorias = obj["categoria_" + lang.getString('language_suffix')];
            		var titulo = obj["titulo_" + lang.getString('language_suffix')];
            		var lugar = obj['lugar'];
            		
            		/*
			* PRECIO
			*/
            		/*var evento_precio = obj['precio'];
                        var evento_precio_string;
			if (evento_precio == 0) // Evento gratuito
			{
                            evento_precio_string = lang.getString('eventos_detalle_precio_gratis').replace('<precio>', evento_precio);
			}
			else // Evento pagado
			{
                            evento_precio_string = lang.getString('eventos_detalle_precio_simple').replace('<precio>', evento_precio);
			}*/
                        
                        
            		
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
            		
            		container.append(HTML);
            	}
            },
            
            detalleEvento_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var id_DOM = $(evt.currentTarget).attr('id');
            	var index_evento = id_DOM.substring(7, id_DOM.length);
            	
            	var info_evento = this.lista_favoritos[index_evento];
            	
            	var detalleEventoView = new DetalleEventoView(info_evento);
            	$.mobile.jqmNavigator.pushView(detalleEventoView, { transition : 'slide' });
            }
            
        });
        return View;
    });