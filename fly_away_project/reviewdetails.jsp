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
<title>Review Details</title>
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

<!-- sql:setDataSource tag -->
<sql:setDataSource var="db" driver="com.mysql.jdbc.Driver"  
     url="jdbc:mysql://localhost:3306/db_world"  
     user="root"  password="root"/>  

<jsp:include page="header.jsp"></jsp:include>

<% 
// flight
String flight_number_str = request.getParameter("flight_number");
int flight_number = Integer.parseInt(flight_number_str);

// customer
String email = request.getParameter("email");
String full_name = request.getParameter("full_name");
String address = request.getParameter("address");
String age_str = request.getParameter("age");
int age = Integer.parseInt(age_str);
String mobile = request.getParameter("phone");
String identity_card_type = request.getParameter("identity_card_type");
String identity_card_number = request.getParameter("identity_card_number");
String country = request.getParameter("country");

Class.forName("com.mysql.jdbc.Driver");
String url = "jdbc:mysql://localhost:3306/db_world"; // Change this to your MySQL database URL
String dbUsername = "root"; // Change this to your MySQL username
String dbPassword = "root"; // Change this to your MySQL password

Connection conn = null;
PreparedStatement pstmt = null;
try {
  Class.forName("com.mysql.jdbc.Driver");
  conn = DriverManager.getConnection(url, dbUsername, dbPassword);
  String sql = "INSERT INTO fbp_customer (email, full_name, address, age, mobile, identity_card_type, identity_card_number, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  pstmt = conn.prepareStatement(sql);
  pstmt.setString(1, email);
  pstmt.setString(2, full_name);
  pstmt.setString(3, address);
  pstmt.setInt(4, age);
  pstmt.setString(5, mobile);
  pstmt.setString(6, identity_card_type);
  pstmt.setString(7, identity_card_number);
  pstmt.setString(8, country);
  pstmt.executeUpdate();
} catch (ClassNotFoundException | SQLException e) {
  e.printStackTrace();
} finally {
  try { pstmt.close(); } catch (Exception e) { /* ignored */ }
  try { conn.close(); } catch (Exception e) { /* ignored */ }
}

%>
  

<sql:query dataSource="${db}" var="rs">  
	SELECT * FROM fbp_flight WHERE flight_number = ?;
	<sql:param value="<%=flight_number%>" />
    <%-- Print the SQL query with the parameter value --%>
</sql:query>  


<c:set var="flight" value="${rs.rows[0]}" />

<!-- Display the flight details using JSTL core tags -->

<h4 style="padding:0px;margin-bottom:0px;">VIEW DETAIL
<small style="font-weight: normal">Please view customer and flight details carefully.</small>
</h4>

  <h3 style="padding:0px;margin-bottom:0px;"><c:out value="${flight.flight_number}" /> <c:out value="${flight.airline_name}" /></h3>
  <span class='span_detail'>From: <c:out value="${flight.source_city}" /></span><br>
  <span class='span_detail'>To: <c:out value="${flight.destination_city}" /></span><br>
  <span class='span_detail'>Date: <c:out value="${flight.date_of_travel}" /></span><br>
  <span class='span_detail'>Departure time: <c:out value="${flight.departure_time}" /></span><br>
  <span class='span_detail'>Arrival time: <c:out value="${flight.arrival_time}" /></span><br>
  <span class='span_detail'>Passenger class: <c:out value="${flight.passenger_class}" /></span><br>
  <span class='span_detail'>Price: $<c:out value="${flight.price}" /></span><br>

<sql:query dataSource="${db}" var="rs2">  
	SELECT * FROM fbp_customer WHERE email = ?;
	<sql:param value="<%=email%>" />
    <%-- Print the SQL query with the parameter value --%>
</sql:query>  


<c:set var="customer" value="${rs2.rows[0]}" />
	
<h3 style="padding:0px;margin-bottom:0px;">Customer Details</h3>
<span class='span_detail'>Email: <c:out value="${customer.email}" /></span><br>
<span class='span_detail'>Full Name: <c:out value="${customer.full_name}" /></span><br>
<span class='span_detail'>Address: <c:out value="${customer.address}" /></span><br>
<span class='span_detail'>Age: <c:out value="${customer.age}" /></span><br>
<span class='span_detail'>Phone: <c:out value="${customer.mobile}" /></span><br>
<span class='span_detail'>Identity Card Type: <c:out value="${customer.identity_card_type}" /></span><br>
<span class='span_detail'>Identity Card Number: <c:out value="${customer.identity_card_number}" /></span><br>
<span class='span_detail'>Country of origin: <c:out value="${customer.country}" /></span><br>
	
	
<form action="confirmation.jsp" method="POST">
	<input type="hidden" name="customer_email" value="${customer.email}">
	<input type="hidden" name="flight_number" value="${flight.flight_number}">
	<input type="submit" value="Confirm">
</form>

	
</body>

</html>  