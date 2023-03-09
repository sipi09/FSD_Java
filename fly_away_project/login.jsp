<%@ page language="java" %>
<html>
<head>
  <title>Login Page</title>
</head>
<body>
  <h1>Login Page</h1>
  <form action="authentication.jsp" method="post">
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" required>
    <br>
    <input type="submit" value="Login">
  </form>
</body>
</html>