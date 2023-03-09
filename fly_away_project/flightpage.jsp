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
<title>Flight Details</title>
</head>
<body>

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

  <h3><c:out value="${flight.flight_number}" /> <c:out value="${flight.airline_name}" /></h3>
  <p>Source City: <c:out value="${flight.source_city}" /></p>
  <p>Destination City: <c:out value="${flight.destination_city}" /></p>
  <p>Flight Date: <c:out value="${flight.date_of_travel}" /></p>
  <p>Departure Time: <c:out value="${flight.departure_time}" /></p>
  <p>Arrival time: <c:out value="${flight.arrival_time}" /></p>
  <p>Class: <c:out value="${flight.passenger_class}" /></p>
  <p>Available seats: <c:out value="${flight.seat_availability}" /></p>
	
  <form method="get" action="registerdetails.jsp">
   <input type="hidden" name="flight_number" value="${flight.flight_number}"/>
   <button type="submit" class="btn btn-primary">REGISTER</button>
  </form>
	
</body>

</html>  