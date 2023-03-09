<%@ page import="java.sql.*" %>
<%@ page language="java" %>
<%

  session.removeAttribute("username");

  out.println("<p>Successful logout</p>");
  
  out.println("<a href='login.jsp'>Log-in again</a>");
  
%>
  