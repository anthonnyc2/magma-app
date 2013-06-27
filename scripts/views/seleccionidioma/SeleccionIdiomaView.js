/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['languages', 'jquery', 'underscore', 'Backbone', 'text!views/seleccionidioma/SeleccionIdiomaView.tpl'],
    function (lang, $, _, Backbone, ViewTemplate) {
    	var View = Backbone.View.extend({
            events:{
            	'pageshow' : 'redrawView',
            	'pagehide' : 'restoreView',
            	'click .buttons_seleccionidioma .button' : 'btnSeleccionIdioma_clickHandler'
            },
            
            initialize:function() 
            {
            },
            
            redrawView:function()
            {
            	$(".ui-page").css('height', '700px');
            },
            
            restoreView:function()
            {
            	$(".ui-page").css('height', '74%');
            },
            
            render:function () {
                this.$el.html(_.template(ViewTemplate));
                return this;
            },
            
            btnSeleccionIdioma_clickHandler:function (evt) {
            	evt.preventDefault();
            	lang.setLanguage( $(evt.currentTarget).attr('id') );
            	
            	$.mobile.jqmNavigator.popToFirst({ reverse : false });
			}

        });
        return View;
    });