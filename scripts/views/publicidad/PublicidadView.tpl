<%
	var forceReloadImage = "?" + (new Date()).getTime();
	var hasLink = info_publicidad['publicidad_link'] != -1;
%>
<!-- PUBLICIDAD - content -->
<div data-role="content" id="publicidad-content" style="padding: 0; margin: 0;">
	<div id="timer_count" style="position: absolute; top: 0; right: 0; color: #ffffff; text-shadow: 0.1em 0.1em #000000;"><%= publicidad_loading %></div>
	
	<div style="width: 100%; height: 100%; overflow: hidden; text-align: center;">
		
		<%
			if (hasLink) {
		%>
			<a href="<%= info_publicidad['publicidad_link'] %>" id="publicidad">
		<% } %>
			<img src="<%= info_publicidad['publicidad_img'] + forceReloadImage %>" alt="" style="width: auto; height: auto; max-width: 100%; max-height: 100%;" />
		<%
			if (hasLink) {
		%>
			</a>
		<% } %>
	</div>
	
</div>
<!-- FIN: PUBLICIDAD - content -->