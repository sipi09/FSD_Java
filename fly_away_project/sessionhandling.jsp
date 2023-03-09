<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%
  // Get session object
  session = request.getSession();

  // Check if session attribute "username" exists
  String username = (String) session.getAttribute("username");
  if (username == null) {
    // User is not logged in, redirect to login.jsp
    response.sendRedirect("login.jsp");
  }
%>




