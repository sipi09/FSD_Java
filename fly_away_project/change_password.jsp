<%@ page import="java.sql.*" %>
<%@ page language="java" %>

<% 

out.println("<p>changing password..</p>");

String username = request.getParameter("username");
String old_password = request.getParameter("old_password");
String new_password = request.getParameter("new_password");
String password_again = request.getParameter("password_again");

out.println(username);
out.println(new_password);
out.println(password_again);

String url = "jdbc:mysql://localhost:3306/db_world"; // Change this to your MySQL database URL
String dbUsername = "root"; // Change this to your MySQL username
String dbPassword = "root"; // Change this to your MySQL password

Connection conn = null;
PreparedStatement pstmt = null;

if (new_password.equals(password_again)) {
	try {
	  Class.forName("com.mysql.jdbc.Driver");
	  conn = DriverManager.getConnection(url, dbUsername, dbPassword);
	  String sql = "UPDATE fbp_user SET password =  ? WHERE username = ? AND password = ?;";
	  pstmt = conn.prepareStatement(sql);
	  pstmt.setString(1, new_password);
	  pstmt.setString(2, username);
	  pstmt.setString(3, old_password);
	  pstmt.executeUpdate();
	} catch (ClassNotFoundException | SQLException e) {
	  e.printStackTrace();
	} finally {
	  try { pstmt.close(); } catch (Exception e) { /* ignored */ }
	  try { conn.close(); } catch (Exception e) { /* ignored */ }
	}
	response.sendRedirect("searchflights.jsp");
} else {
	response.sendRedirect("admin.jsp");
}

%> 