<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*, com.mysql.jdbc.Driver"%>  
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Confirmation</title>
</head>
<body>

<style>
.span_detail {
font-size: 12px;
font-weight: normal;
line-height:2px;
padding:0px;
margin:0px;
}
</style>

<% 
// flight
String flight_number_str = request.getParameter("flight_number");
int flight_number = Integer.parseInt(flight_number_str);

// customer
String email = request.getParameter("customer_email");

Class.forName("com.mysql.jdbc.Driver");
String url = "jdbc:mysql://localhost:3306/db_world"; // Change this to your MySQL database URL
String dbUsername = "root"; // Change this to your MySQL username
String dbPassword = "root"; // Change this to your MySQL password

Connection conn = null;
PreparedStatement pstmt = null;
try {
  Class.forName("com.mysql.jdbc.Driver");
  conn = DriverManager.getConnection(url, dbUsername, dbPassword);
  String sql = "INSERT INTO fbp_booking (flight_number, email) VALUES (?, ?);";
  pstmt = conn.prepareStatement(sql);
  pstmt.setInt(1, flight_number);
  pstmt.setString(2, email);
  pstmt.executeUpdate();
} catch (ClassNotFoundException | SQLException e) {
  e.printStackTrace();
} finally {
  try { pstmt.close(); } catch (Exception e) { /* ignored */ }
  try { conn.close(); } catch (Exception e) { /* ignored */ }
}

%>


<p>Successful booking!</p>

<p>Thank you for <%= email %> booking with us!</p>		

<br>
<form action="searchflights.jsp" method="GET">
	<input type="submit" value="Back to search">
</form>

	
</body>

</html>  