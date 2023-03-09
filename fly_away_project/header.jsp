<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
	<meta charset="UTF-8">
	<title>Register for Flight</title>
	<style>
		header {
			background-color: #f2f2f2;
			padding: 4px;
			text-align: center;
		}
	</style>
</head>
<body>
	<header>
		<h3>Flight Booking Portal</h3>
		<% if (request.getSession().getAttribute("username") != null) { %>
			<p>Welcome, <%= request.getSession().getAttribute("username") %>! <a href="logout.jsp">Logout</a>&nbsp<a href="admin.jsp">Change Password</a></p>
		<% } else { %>
			<p><a href="login.jsp">Login</a></p>
		<% } %>
	</header>
</body>
</html>




