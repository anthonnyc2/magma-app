/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['languages', 'jquery', 'underscore', 'Backbone', 'text!views/more/MoreView.tpl'],
    function (lang, $, _, Backbone, ViewTemplate) {
    	var View = Backbone.View.extend({
            events:{
            	'pageshow' : 'redrawView',
            	'pagehide' : 'restoreView',
            	'click .buttons_seleccionidioma .button' : 'btnSeleccionIdioma_clickHandler',
            	'click #close_more_dialog' : 'btnClose_clickHandler',
            	'click .seleccion_tab_dialog .tab a' : 'btnTab_clickHandler'
            },
            
            initialize:function() 
            {
            },
            
            render:function () {
                this.$el.html( _.template( ViewTemplate, lang.getStringList() ) );
                return this;
            },
            
            btnSeleccionIdioma_clickHandler:function (evt) {
            	evt.preventDefault();
            	lang.setLanguage( $(evt.currentTarget).attr('id') );
            	
            	this.btnClose_clickHandler(evt);
			},
			
			btnClose_clickHandler:function(evt)
			{
				evt.preventDefault();
				//$.mobile.jqmNavigator.popView({ transition: 'pop', reverse: true });
				$.mobile.jqmNavigator.popToFirst({ transition : 'pop', reverse : true });
			},
			
			btnTab_clickHandler:function(evt)
			{
				evt.preventDefault();
				var button_id = $(evt.currentTarget).attr('id');
				var seleccion_idioma = $(".background_seleccionidioma .buttons_seleccionidioma");
				var info_app = $(".background_seleccionidioma .info_app");
				
				if (button_id == "seleccion_idioma")
				{
					seleccion_idioma.show(0);
					info_app.hide(0);
				}
				else
				{
					info_app.show(0);
					seleccion_idioma.hide(0);
				}
			},
            
            redrawView: function()
            {
            	$(".ui-page").css('height', '700px');
            },
            
            restoreView: function()
            {
            	$(".ui-page").css('height', '74%');
            }

        });
        return View;
    });