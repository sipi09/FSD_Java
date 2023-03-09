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
<title>Register for Flight</title>
</head>
<body>

<style>
.span_detail {
font-size: 12px;
font-weight: normal;
}
</style>

<!-- sql:setDataSource tag -->
<sql:setDataSource var="db" driver="com.mysql.jdbc.Driver"  
     url="jdbc:mysql://localhost:3306/db_world"  
     user="root"  password="root"/>  

<jsp:include page="header.jsp"></jsp:include>

<% 
String flight_number_str = request.getParameter("flight_number");
int flight_number = Integer.parseInt(flight_number_str);
%>
 
<sql:query dataSource="${db}" var="rs">  
	SELECT * FROM fbp_flight WHERE flight_number = ?;
	<sql:param value="<%=flight_number%>" />
    <%-- Print the SQL query with the parameter value --%>
</sql:query>  


<c:set var="flight" value="${rs.rows[0]}" />

<!-- Display the flight details using JSTL core tags -->

  <h3><c:out value="${flight.flight_number}" /> <c:out value="${flight.airline_name}" />
  <br>
  <span class='span_detail'>From: <c:out value="${flight.source_city}" /></span>
  <span class='span_detail'>To: <c:out value="${flight.destination_city}" /></span>
  <span class='span_detail'>Date: <c:out value="${flight.date_of_travel}" /></span>
  </h3>


<h4>REGISTRATION
<small style="font-weight: normal"><br>Please fill the form to book the flight.</small>
</h4>
	
	<form action="reviewdetails.jsp" method="POST">
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" required>
		<br>
		<label for="full_name">Full Name:</label>
		<input type="text" name="full_name" id="full_name" required>
		<br>
		<label for="address">Address:</label>
		<textarea name="address" id="address" required></textarea>
		<br>
		<label for="age">Age:</label>
		<input type="number" name="age" id="age" required>
		<br>
		<label for="phone">Phone:</label>
		<input type="tel" name="phone" id="phone" required>
		<br>
		<label for="identity_card_type">Identity Card Type:</label>
		
		<select name="identity_card_type" id="identity_card_type" required>
			<option value="">Please Select..</option>
			<option value="Aadhaar Card">Aadhaar Card</option>
			<option value="SSN">SSN</option>
			<option value="Passport">Passport</option>
			<option value="Voter ID">Voter ID</option>
			<option value="Driving license">Driving license</option>
		</select>
		
		<br>
		<label for="identity_card_number">Identity Card Number:</label>
		<input type="text" name="identity_card_number" id="identity_card_number" required>
		<br>
		<label for="country">Country of Nationality:</label>
		<input type="text" name="country" id="country" required>
		<br>
		<input type="hidden" name="flight_number" value="${flight.flight_number}">
		<input type="submit" value="Save">
	</form>
	
</body>

</html>  