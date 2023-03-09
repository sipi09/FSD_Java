<%@ include file="sessionhandling.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*, com.mysql.jdbc.Driver"%>  
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Search</title>
</head>
<body>

<!-- sql:setDataSource tag -->
<sql:setDataSource var="db" driver="com.mysql.jdbc.Driver"  
     url="jdbc:mysql://localhost:3306/db_world"  
     user="root"  password="root"/>  

<jsp:include page="header.jsp"></jsp:include>

<sql:query dataSource="${db}" var="rs">  
	SELECT * from fbp_flight WHERE seat_availability > 0;  
</sql:query>  

<table border="2" width="95%">  
<tr>  
<th>flight no</th>  
<th>airline</th>  
<th>from</th>  
<th>to</th>
<th>departure</th>  
<th>arrival</th>
<th>available seats</th>
<th>class</th>
<th>price</th>
<th>options</th>
</tr>  
	<c:forEach var="table" items="${rs.rows}">  
		<tr>  
			<td><c:out value="${table.flight_number}"/></td>
			<td><c:out value="${table.airline_name}"/></td>
			<td><c:out value="${table.source_city}"/></td>
			<td><c:out value="${table.destination_city}"/></td>
			<td><c:out value="${table.departure_time}"/></td>
			<td><c:out value="${table.arrival_time}"/></td>
			<td><c:out value="${table.seat_availability}"/></td>
			<td><c:out value="${table.passenger_class}"/></td>
			<td>$<c:out value="${table.price}"/></td>
			<td>
			  <form method="get" action="flightpage.jsp">
			    <input type="hidden" name="flight_number" value="${table.flight_number}"/>
			    <button type="submit" class="btn btn-primary">Details</button>
			  </form>
			</td>
		</tr>  
	</c:forEach>  
</table>  

</body>  
</html>  