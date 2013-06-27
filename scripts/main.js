/**
 * Created by Piotr Walczyszyn (@pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:20 AM
 */


require.config({
    paths:{
        // RequireJS plugin
        text:'libs/require/text',
        // RequireJS plugin
        domReady:'libs/require/domReady',
        // underscore library
        underscore:'libs/underscore/underscore',
        // Backbone.js library
        Backbone:'libs/backbone/backbone',
        // jQuery
        jquery:'libs/jquery/jquery-1.8.2',
        // jQuery Mobile framework
        jqm:'libs/jquery.mobile/jquery.mobile-1.2.0',
        // jQuery Mobile plugin for Backbone views navigation
        jqmNavigator:'libs/jquery.mobile/jqmNavigator',
        
        // Soporte de idiomas
        languages:'libs/languages/languages',
        // URLs de la API
        urls:'libs/urls/urls'
    },
    shim:{
        Backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
        jqm:{
            deps:['jquery', 'jqmNavigator']
        }
    }
});

require(['urls', 'languages', 'domReady', 'Backbone', 'views/publicidad/PublicidadView', 'views/seleccionidioma/SeleccionIdiomaView', 'views/home/HomeView', 'jqm'],
    function (urls, lang, domReady, Backbone, PublicidadView, SeleccionIdiomaView, HomeView) {
		// domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {

            function onDeviceReady(desktop) {
            	// Hiding splash screen when app is loaded
                // DESHABILITAR CUANDO NO SE UTILIZA PHONEGAP
                //if (desktop !== true) cordova.exec(null, null, 'SplashScreen', 'hide', []);

                // Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
                // I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
                $.mobile.pageContainer = $('#container');

                // Setting default transition to slide
                $.mobile.defaultPageTransition = 'slide';
                
                $.mobile.hashListeningEnabled = true;
		        $.mobile.ajaxEnabled = true;
		        $.mobile.pushStateEnabled = true;
		        
		        // Procesamiento previo a generación de vistas
		        var PublicidadModel = Backbone.Model.extend({
    				urlRoot: urls.publicidad,
    				defaults : {
    					publicidad : false,
    					publicidad_img : '',
    					publicidad_link : ''
    				}
    			});
    			
    			var publicidad = new PublicidadModel();
    			publicidad.fetch({ async : false });
    			var info_publicidad = publicidad.toJSON();
		        
		        // Genera vistas
                var homeView = new HomeView();
                var seleccionIdiomaView = ( !lang.issetLanguage() ) ? new SeleccionIdiomaView() : null;
                var publicidadView = info_publicidad['publicidad'] == true ? new PublicidadView(info_publicidad) : null;
                
                // Insertar vistas en la stack
                $.mobile.jqmNavigator.pushView(homeView, { transition : 'none' });
                if ( seleccionIdiomaView ) $.mobile.jqmNavigator.pushView( seleccionIdiomaView, { transition : 'none' } );
                //if ( publicidadView ) $.mobile.jqmNavigator.pushView( publicidadView, { transition : 'none' } );
            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                // document.addEventListener('deviceready', onDeviceReady, false);
                $(document).ready(onDeviceReady, false);
            } else {
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }

        });

    });