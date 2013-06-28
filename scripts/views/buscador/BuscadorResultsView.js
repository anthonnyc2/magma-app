/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/eventos/DetalleEventoView', 'views/more/MoreView', 'text!views/buscador/BuscadorResultsView.tpl'],
    function (urls, lang, $, _, Backbone, DetalleEventoView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			lista_resultados: [],
			loading: true,
			string_busqueda : '',
			idCategoria : -1,
			municipio : -1,
			dias : '',
			rango_precio : '',
			
            events:{
            	//'pageshow' : 'redrawView',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .more_button' : 'More_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                'click div.destacados_home a' : 'subcat_clickHandler'
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            initialize: function(_string_busqueda, _id_cat, _municipio, _dias, _rango_precio)
            {
            	var $this = this;
            	
            	$this.loading = true;
            	
            	$this.string_busqueda = encodeURI(encodeURIComponent(_string_busqueda));
            	$this.idCategoria = _id_cat;
            	$this.municipio = _municipio;
            	$this.dias = _dias;
            	$this.rangoPrecio = _rango_precio;
            	$this.lista_resultados = [];
                
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
            			municipiosId : '',
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
            			fecha_publicado: '0000-00-00 00:00:00',
            			municipio_cat: '',
            			municipio_esp: '',
            			categoria_esp: '',
            			categoria_cat: '',
            			subcategoria_cat: '',
            			subcategoria_esp: ''
            		}
            	});
            	
            	var url_peticion = urls.busqueda.replace('<string_busqueda>', $this.string_busqueda);

                var EventosCollection = Backbone.Collection.extend({
            		model	: EventosModel,
            		url	: url_peticion,
            		parse:function(resp)
            		{
            			$this.lista_resultados = [];
                                
				for (var i in resp)
            			{
            				var obj = resp[i];
            				
            				// Para filtro por categor’as (sin seleccionar categor’a = todas las categor’as = -1)
            				var categorias_match = $this.idCategoria == "categoria" || $this.idCategoria == -1 || obj['categoriasId'] == $this.idCategoria;
            				 
            				// Para filtro por d’as
            				var dias = obj['dias_semana'].split(",");
            				var dias_match = $this.dias == "todos" || $this.dias == "fecha"; // Sin seleccionar d’a = todos los d’as
            				for (var j = 0; !dias_match && j < dias.length; j++) // No entra si dia_match = true
            				{
            					if ( dias[j] == $this.dias ) dias_match = true; // Hay match de d’as
            				}
            				
            				// Para filtro por precios (sin seleccionar precio = todos los precios)
            				var precio_gratis = $this.rangoPrecio == "gratis" && obj['precio'] == 0;
            				var precio_menosde10 = $this.rangoPrecio == "10-" && obj['precio'] < 10 && obj['precio'] > 0;
            				var precio_10a25 = $this.rangoPrecio == "10-25" && obj['precio'] >= 10 && obj['precio'] <= 25;
            				var precio_masde25 = $this.rangoPrecio == "25+" && obj['precio'] > 25;
            				var precios_match = $this.rangoPrecio == "precio" || $this.rangoPrecio == "todos" || precio_gratis || precio_menosde10 || precio_10a25 || precio_masde25;
            				
            				// Para filtro por municipio (sin seleccionar municipio = todos los municipios)
            				var municipios_match = $this.municipio == "municipio" || $this.municipio == "todos" || $this.municipio == obj['municipiosId'];
            				
            				// Agregar a lista de resultados si cumple con todos los filtros
            				if ( categorias_match && precios_match && dias_match && municipios_match )
            				{
            					$this.lista_resultados.push(obj);
            				}
            			}
            			
            			// Ordenar por fecha y hora de inicio, m‡s cercanos primero
            			$this.lista_resultados.sort(function(a,b) {
            				var A = new Date(a.fecha_inicio + " " + a.hora_inicio);
            				var B = new Date(b.fecha_inicio + " " + b.hora_inicio);
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Cargar lista de eventos en el HTML
            			$this.loading = false; // Desactivar mensaje "cargando"
            			$this.redrawView();
            		}
            	});            	
            	
            	var eventosCollection = new EventosCollection();
            	eventosCollection.fetch();
            },

            render:function () {
            	this.$el.html( _.template( ViewTemplate, lang.getStringList() ) );
                return this;
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
            	var content = $("#eventresults-content");
            	content.html( this.loading ? lang.getString('loading') : ( this.lista_resultados.length > 0 ? '' : lang.getString('buscador_resultados_busqueda_noevents') ) );
            	
            	for (var i = 0; i < this.lista_resultados.length; i++)
            	{
            		var obj = this.lista_resultados[i];
            		var nombre = obj["titulo_" + lang.getString('language_suffix')];
            		var categorias = obj["categoria_" + lang.getString('language_suffix')];
            		var titulo = obj["titulo_" + lang.getString('language_suffix')];
            		var lugar = obj['lugar'];
            		
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
                        
                        
            		//var precio = obj['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", obj['precio']) : lang.getString('eventos_detalle_precio_gratis');
            		
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
            	
            	var info_evento = this.lista_resultados[index_evento];
            	
				var detalleEventoView = new DetalleEventoView(info_evento);
            	$.mobile.jqmNavigator.pushView(detalleEventoView, { transition: 'slide' });
            }

        });
        return View;
    });