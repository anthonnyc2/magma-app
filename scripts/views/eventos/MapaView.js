/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'text!views/eventos/MapaView.tpl' ],
    function (urls, lang, $, _, Backbone, ViewTemplate) {
		var View = Backbone.View.extend({
			info_evento : [],
			
            events:{
            	'pageshow' : 'redrawView',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler'
            },
            
            initialize: function(infoEvento)
            {
            	this.info_evento = infoEvento;
            },
            
            shadowImage:function()
            {
            	
            },
            
            markerImage:function()
            {
            	
            },
            
            markerShape:function()
            {
            	
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
            
            btnBack_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popView();
            },
            
            redrawView: function()
            {
            	// Redimensionar mapa para que llene la pantalla
            	$(".ui-page").each(function() {
            		var page = $(this);
            		
            		if ( page.html().indexOf("id=\"gmaps-container\"") != -1 )
            		{
            			page.height('74%');
            		}
            	});
            	
            	var $this = this;
            	var geocoder = new google.maps.Geocoder();
            	var direccion = $this.info_evento['direccion'] + ", " + $this.info_evento["municipio_" + lang.getString('language_suffix')] + ", Mallorca";
            	
            	geocoder.geocode({ address : direccion }, function(results, status)
            	{
            		if ( status == google.maps.GeocoderStatus.OK ) // Dirección correcta
            		{
            			var gmaps_LatLng = new google.maps.LatLng( results[0].geometry.location.lat(), results[0].geometry.location.lng() );
						var gmaps_options = {
							zoom		: 14,
							center		: gmaps_LatLng,
							mapTypeId	: google.maps.MapTypeId.ROADMAP
						};
						var gmaps_container = $("#gmaps-container").get(0);
						//var gmaps_container = document.getElementById('gmaps-container');
						var gmaps_canvas = new google.maps.Map( gmaps_container, gmaps_options );
						
						var gmaps_marker = new google.maps.Marker({
							position	: gmaps_LatLng,
							map			: gmaps_canvas
						});
            		}
            		else // Dirección incorrecta
            		{
            			if (navigator.notification) // Corriendo sobre PhoneGap
	           			{
	           				navigator.notification.alert( lang.getString('eventos_mapa_nodisponible'), (function() {}), lang.getString('eventos_mapa_nodisponible_title') );
	           			}
	           			else // Corriendo en navegador
	           			{
		           			alert( lang.getString('eventos_mapa_nodisponible') );
	           			}
	           			
	           			$.mobile.jqmNavigator.popView({ transition : 'slide', reverse : true });
            		}
            	});
            }
        });
        return View;
    });