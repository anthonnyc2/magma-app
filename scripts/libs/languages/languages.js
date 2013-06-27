define(['libs/languages/castellano', 'libs/languages/catala'], function(lngCastellano, lngCatala) {
	var avLanguages = {
		esp : lngCastellano,
		cat : lngCatala
	};
	
	var Languages = {
		
		getPrintableDate: function(dateInComputerFormat)
		{
			var dateArray = dateInComputerFormat.split("-");
			dateArray.reverse();
			return dateArray.join("/");
		},
		
		getLanguage: function()
		{
			return window.localStorage.getItem('idioma');
		},
		
		setLanguage: function(_lng)
		{
			window.localStorage.setItem('idioma', _lng);
			window.localStorage.setItem('idioma_seteado', true);
		},
		
		issetLanguage: function()
		{
			return ( this.getLanguage() != null && window.localStorage.getItem('idioma_seteado') != null);
		},
		
		getStringList: function() {
			//var language = this._app_language.length ? eval("avLanguages." + this._app_language) : {};
			var language = this.getLanguage() ? avLanguages[this.getLanguage()] : {};
			language.fecha = this.getDate();
			
			return language;
		},
		
		getString: function(_key) {
			//var word = this._app_language.length ? eval("avLanguages." + this._app_language + "." + _key ) : "";
			var word = avLanguages[this.getLanguage()][_key];
			return word;
		},
		
		getDate: function() {
			var dateObj = new Date();
            	var day = dateObj.getDate();
            	var month = dateObj.getMonth() + 1;
            	
            	day = day < 10 ? "0" + day : "" + day;
            	month = month < 10 ? "0" + month : "" + month;

            	var fecha = day + "/" + month;
            	return fecha;
		},
		
		getCategoryName:function(id_cat, urls)
		{
			var Category = Backbone.Model.extend({
				urlRoot: urls.categorias,
        		defaults: {
        			id : null,
        			categoria_esp : null,
        			categoria_cat : null
        		}
        	});
        	
        	
        	var categoria = new Category();
        	categoria.fetch({ async : false });
        	
        	var lista_cat = categoria.toJSON();
        	var result = null;
        	
        	for (var i in lista_cat)
        	{
        		var obj = lista_cat[i];
        		if ( obj && obj['id'] == id_cat )
        		{
        			result = obj;
        			break;
        		}
        	}
        	
        	return result ? result["categoria_" + this.getString('language_suffix')] : this.getString('categorias_allcategories');
		},
		
		getSubcategoryName:function(id_cat, id_subcat, urls)
		{
			var Subcategory = Backbone.Model.extend({
				urlRoot: urls.subcategorias.replace("<id_cat>", id_cat),
        		defaults: {
        			id : null,
        			subcategoria_esp : null,
        			subcategoria_cat : null
        		}
        	});
        	
        	
        	var subcategoria = new Category();
        	subcategoria.fetch({ async : false });
        	
        	var lista_subcat = subcategoria.toJSON();
        	var result = null;
        	
        	for (var i in lista_subcat)
        	{
        		var obj = lista_subcat[i];
        		if ( obj && obj['id'] == id_subcat )
        		{
        			result = obj;
        			break;
        		}
        	}
        	
        	return result["subcategoria_" + this.getString('language_suffix')];
		}
	};
	
	if (!Languages.issetLanguage())
	{
		window.localStorage.setItem('idioma', 'esp'); // Idioma por defecto, debe existir para que no haya error al cargar
	}
	
	return Languages;
});
