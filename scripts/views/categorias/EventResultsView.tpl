<!-- HOME - header -->
<div data-role="header" data-id="categorias-header" id="categorias-header" data-position="fixed">
	<a data-rel="back" href="#categorias"><img src="images/navigation/back.jpg" alt="" /></a>
	<a data-transition="slide" href="#more"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt=""></a>
	
		<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion"><%= nombre_subcategoria %></div></div>
</div>
<!-- FIN: HOME - header -->









<!-- HOME - content -->
<div data-role="content" id="eventresults-content">
	<%= loading %>
</div>
<!-- FIN: HOME - content -->











<!-- HOME - footer -->
<div data-role="footer" data-id="home-footer" id="home-footer" data-position="fixed">
	<div data-role="navbar" data-iconpos="top">
		<ul>
			<li>
				<a href="#categorias" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_categorias %></a>
			</li>
			
			<li>
				<a href="#favoritos" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_favoritos %></a>
			</li>
			
			<li>
				<a href="#buscador" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_buscador %></a>
			</li>
		</ul>
	</div>
</div>
<!-- FIN: HOME - footer -->
