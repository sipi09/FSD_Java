<%@ page language="java" %>
<html>
<head>
  <title>Change Password</title>
</head>
<body>
  <h1>Change Password</h1>
  <form action="change_password.jsp" method="post">
    <label for="old_password">Old Password:</label>
    <input type="password" name="old_password" id="old_password" required>
    <br>
    <label for="new_password">New Password:</label>
    <input type="password" name="new_password" id="new_password" required>
    <br>
    <label for="password_again">Confirm Password:</label>
    <input type="password" name="password_again" id="password_again" required>
    <br>
    <input type="submit" value="Change password">
    <input type="hidden" name="username" id="username" 
    value="<%= request.getSession().getAttribute("username") %>">

  </form>
</body>
</html>