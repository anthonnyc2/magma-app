define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'text!views/publicidad/PublicidadView.tpl'],
    function (urls, lang, $, _, Backbone, ViewTemplate) {
    	var View = Backbone.View.extend({
    		info_publicidad : [],
    		timer : null,
    		timer_ticks : 0, // Cuando llega a timer_ticks_max, se cierra la publicidad (1 tick = 1 segundo)
    		timer_ticks_max : 4, // Segundos máximos para cerrar la publicidad, se cuenta desde que la imagen termina de cargar
    		
    		events : {
    			'pageshow' : 'timer_waitForImage',
    			'click a#publicidad' : 'publicidad_clickHandler'
    		},
    		
    		initialize : function(_info_publicidad)
    		{
    			this.info_publicidad = _info_publicidad;
    		},
    		
    		render : function()
    		{
    			var data = lang.getStringList();
    			data.info_publicidad = this.info_publicidad;
    			
    			this.$el.html( _.template( ViewTemplate, data ) );
    			
    			return this;
    		},
    		
    		publicidad_clickHandler : function(evt)
    		{
    			evt.preventDefault();
    			var url = $(evt.currentTarget).attr('href');
    			
    			if ( url.length > 11 ) // Mínimo 11 caracteres para la URL: http://a.es
    			{
    				/*
    				if (navigator.app) navigator.app.loadUrl( url, { openExternal : true } ); // En PhoneGap
    				else window.location.href = url; // En navegador de escritorio
    				*/
    				window.open(url, '_system'); // Funciona en PhoneGap y en escritorio
    			}
    		},
    		
    		resizePage:function()
    		{
    			// Redimensionar para que llene la pantalla
            	$(".ui-page").each(function() {
            		var page = $(this);
            		
            		if ( page.html().indexOf("id=\"publicidad-content\"") != -1 )
            		{
            			page.height('100%');
            		}
            	});
    		},
    		
    		timer_waitForImage : function(evt)
    		{
    			var $this = this;
    			$this.resizePage();
    			
    			$("a#publicidad img").load(function() {
    				$this.timer_startTimer();
    			});
    		},
    		
    		timer_startTimer : function()
    		{
    			var $this = this;
    			this.timer_setTicks(0);
    			$("#timer_count").html( lang.getString('publicidad_willclosein').replace( '<timeleft>', parseInt($this.timer_getMaxTicks() - $this.timer_getTicks(), 10) ) );
    			
    			this.timer = window.setInterval( ( function() { $this.timer_verifyTimer(); } ), 1000 );
    		},
    		
    		timer_verifyTimer : function()
    		{
    			var $this = this;
    			
    			this.timer_increaseTicks();
    			
    			if ( this.timer_getTicks() == this.timer_getMaxTicks() )
    			{
    				this.timer_stopTimer();
    			}
    			else
    			{
    				$("#timer_count").html( lang.getString('publicidad_willclosein').replace( '<timeleft>', parseInt($this.timer_getMaxTicks() - $this.timer_getTicks(), 10) ) );
    			}
    		},
    		
    		timer_stopTimer : function()
    		{
    			window.clearInterval( this.timer );
    			$.mobile.jqmNavigator.popView({ transition : 'fade', reverse : true });
    		},
    		
    		timer_setTicks : function(ticks)
    		{
    			this.timer_ticks = parseInt(ticks, 10);
    		},
    		
    		timer_increaseTicks : function(increment)
    		{
    			increment = typeof increment == 'undefined' ? 1 : parseInt(increment, 10);
    			this.timer_setTicks( this.timer_getTicks() + increment );
    		},
    		
    		timer_getTicks : function()
    		{
    			return parseInt(this.timer_ticks, 10);
    		},
    		
    		timer_getMaxTicks : function()
    		{
    			return parseInt(this.timer_ticks_max, 10);
    		}
    	});
    	
    	return View;
	}
);