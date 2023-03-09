<%@ page import="java.sql.*" %>
<%@ page language="java" %>
<%

  out.println("<p>authenticating..</p>");

  String username = request.getParameter("username");
  String password = request.getParameter("password");
  
  String url = "jdbc:mysql://localhost:3306/db_world"; // Change this to your MySQL database URL
  String dbUsername = "root"; // Change this to your MySQL username
  String dbPassword = "root"; // Change this to your MySQL password
  Connection conn = null;
  PreparedStatement pstmt = null;
  ResultSet rs = null;
  try {
    Class.forName("com.mysql.jdbc.Driver");
    conn = DriverManager.getConnection(url, dbUsername, dbPassword);
    String sql = "SELECT COUNT(*) AS count_record FROM fbp_user WHERE username = ? AND password = ?";
    pstmt = conn.prepareStatement(sql);
    pstmt.setString(1, username);
    pstmt.setString(2, password);
    rs = pstmt.executeQuery();
    rs.next();
    int count = rs.getInt("count_record");
    if (count == 1) {
      session.setAttribute("username", username);
      response.sendRedirect("searchflights.jsp"); // Redirect to search.jsp if username and password are correct
    } else {
      response.sendRedirect("invalid.jsp"); // Redirect to invalid.jsp if username and password are incorrect
    }
  } catch (ClassNotFoundException | SQLException e) {
    e.printStackTrace();
  } finally {
    try { rs.close(); } catch (Exception e) { /* ignored */ }
    try { pstmt.close(); } catch (Exception e) { /* ignored */ }
    try { conn.close(); } catch (Exception e) { /* ignored */ }
  }
%>
  