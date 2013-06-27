/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/more/MoreView', 'text!views/eventos/CompartirView.tpl' ],
    function (urls, lang, $, _, Backbone, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			detalles_evento: null,
			
            events:{
            	'pageshow' : 'redrawView',
            	'click .more_button' : 'More_clickHandler',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click a[data-rel=back]' : 'btnBack_clickHandler',
                
                'click #compartir_email' : 'btnShare_clickHandler',
                'click #compartir_facebook' : 'btnShare_clickHandler',
                'click #compartir_twitter' : 'btnShare_clickHandler',
                'click #compartir_cancelar' : 'btnBack_clickHandler'
            },
            
            initialize: function(infoEvento)
            {
            	this.detalles_evento = infoEvento;
            },

            render:function () {
            	var data = lang.getStringList();
            	data.detalles_evento = this.detalles_evento;

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
            	$.mobile.jqmNavigator.popView({ transition: 'slideup' });
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            redrawView:function()
            {
            	$(".evento_titulo").html(lang.getString(this.detalles_evento["titulo_" + lang.getString("language_suffix")]));
            	
            	$("#compartir_email div.text").html(lang.getString("eventos_compartir_button_correo"));
            	$("#compartir_facebook div.text").html(lang.getString("eventos_compartir_button_facebook"));
            	$("#compartir_twitter div.text").html(lang.getString("eventos_compartir_button_twitter"));
            	$("#compartir_cancelar div.text").html(lang.getString("eventos_compartir_button_cancelar"));
            },
            
            btnShare_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	
            	var itemHref = $(evt.currentTarget).attr('href');

            	var mensaje = "";
        		var motivo = "";
        		var url = "";
        		
        		if (itemHref == "#compartir_facebook")
        		{
        			mensaje = lang.getString('eventos_compartir_facebook_message')
        					.replaceAll("<evento_titulo>", this.detalles_evento["titulo_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_categoria>", this.detalles_evento["categoria_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_lugar>", this.detalles_evento['lugar'])
        					.replaceAll("<evento_precio>", this.detalles_evento['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", this.detalles_evento['precio']) : lang.getString('eventos_detalle_precio_gratis'))
        					.replaceAll("<evento_fecha>", lang.getPrintableDate(this.detalles_evento['fecha_inicio']))
        					;
            		url = lang.getString('eventos_compartir_facebook_url')
            				.replaceAll("<evento_url>", this.detalles_evento['web'].length > 11 ? this.detalles_evento['web'] : lang.getString('eventos_compartir_default_url'));
            		
            		motivo = lang.getString('eventos_compartir_facebook_title') // Título
            				.replaceAll("<evento_titulo>", this.detalles_evento["titulo_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_categoria>", this.detalles_evento["categoria_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_lugar>", this.detalles_evento['lugar'])
        					.replaceAll("<evento_precio>", this.detalles_evento['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", this.detalles_evento['precio']) : lang.getString('eventos_detalle_precio_gratis'))
        					.replaceAll("<evento_fecha>", lang.getPrintableDate(this.detalles_evento['fecha_inicio']))
        					;
            		
            		window.plugins.shareKit.shareToFacebook(motivo, mensaje, url);
        		}
        		else if (itemHref == "#compartir_twitter")
        		{
        			mensaje = lang.getString('eventos_compartir_twitter_message')
        					.replaceAll("<evento_titulo>", this.detalles_evento["titulo_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_categoria>", this.detalles_evento["categoria_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_lugar>", this.detalles_evento['lugar'])
        					.replaceAll("<evento_precio>", this.detalles_evento['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", this.detalles_evento['precio']) : lang.getString('eventos_detalle_precio_gratis'))
        					.replaceAll("<evento_fecha>", lang.getPrintableDate(this.detalles_evento['fecha_inicio']))
        					;
            		url = lang.getString('eventos_compartir_twitter_url')
            				.replaceAll("<evento_url>", this.detalles_evento['web'].length > 11 ? this.detalles_evento['web'] : lang.getString('eventos_compartir_default_url'));
            		
            		window.plugins.shareKit.shareToTwitter(mensaje, url);
        		}
        		else
        		{
        			mensaje = lang.getString('eventos_compartir_email_message')
        					.replaceAll("<evento_titulo>", this.detalles_evento["titulo_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_categoria>", this.detalles_evento["categoria_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_lugar>", this.detalles_evento['lugar'])
        					.replaceAll("<evento_precio>", this.detalles_evento['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", this.detalles_evento['precio']) : lang.getString('eventos_detalle_precio_gratis'))
        					.replaceAll("<evento_fecha>", lang.getPrintableDate(this.detalles_evento['fecha_inicio']))
        					.replaceAll("<evento_url>", this.detalles_evento['web'].length > 11 ? this.detalles_evento['web'] : lang.getString('eventos_compartir_default_url'))
        					;
        			
        			motivo = lang.getString('eventos_compartir_email_subject')
        					.replaceAll("<evento_titulo>", this.detalles_evento["titulo_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_categoria>", this.detalles_evento["categoria_" + lang.getString('language_suffix')])
        					.replaceAll("<evento_lugar>", this.detalles_evento['lugar'])
        					.replaceAll("<evento_precio>", this.detalles_evento['precio'] > 0 ? lang.getString('eventos_detalle_precio_simple').replace("<precio>", this.detalles_evento['precio']) : lang.getString('eventos_detalle_precio_gratis'))
        					.replaceAll("<evento_fecha>", lang.getPrintableDate(this.detalles_evento['fecha_inicio']))
        					.replaceAll("<evento_url>", this.detalles_evento['web'].length > 11 ? this.detalles_evento['web'] : lang.getString('eventos_compartir_default_url'))
        					;
        			
        			window.plugins.shareKit.shareToMail(motivo, "MAGMA Agenda de Mallorca\n\n" + mensaje);
        		}
            }
        });
        return View;
    });