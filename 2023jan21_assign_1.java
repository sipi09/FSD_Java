package sample.jdbc.program;

import java.sql.Connection; 
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet; 
import java.sql.SQLException; 
import java.sql.Statement;
import java.util.Scanner;

public class assignment_jdbc {

	// JDBC URL, username and password of MySQL server
    private static final String url = "jdbc:mysql://localhost:3306/db_world";
    private static final String user = "root";
    private static final String password = "XXXXXXXX";
    
    Connection con;
    PreparedStatement prSt;
    Statement stmt;
    
    private static ResultSet rs;
	
	public static void main(String[] args) {
		
		assignment_jdbc pse = new assignment_jdbc();
    	
        Scanner input = new Scanner(System.in);
    	
        System.out.println("=============PREPARED STATEMENT MENU=================");
        System.out.println("1. Insert the new customer Record"); 
        System.out.println("2. Update the customer Record");
        System.out.println("3. Delete the customer Record");
        System.out.println("4. Count the number of Records");
        System.out.println("5. Fetch all the Records");
        System.out.println("====================================================");
    	System.out.println("Enter your choice from (1-5): ");
    	
    	int number = input.nextInt();
    	System.out.println("You entered option" + number);
    	
    	switch(number)
    	{
    	case 1: pse.insertPSRecord();
    	        break;
    	
    	case 2: pse.updatePSRecord();
    	        break;
    	        
    	case 3: pse.deletePSRecord();
    	        break;
    	        
    	case 4: pse.countPSRecord();
        		break;

    	case 5: pse.fetchPSRecord();
				break;
    	}	
        	
	}
	
	//-------------------------- Inserting The Record-----------------------------//
	public void insertPSRecord()
    {  
		String query = "insert into customer(custid,custname,orderNo,city) values(?,?,?,?)";
		
	      try {
	            Class.forName("com.mysql.jdbc.Driver");
	            con = DriverManager.getConnection(url, user, password);
	           
	            prSt = con.prepareStatement(query);
	            
	            // Take user input for insertion
	            Scanner input = new Scanner(System.in);	
	            
	            System.out.print("Enter the customer id:  ");
	            int cid = input.nextInt();
	            System.out.println();
	            
	            System.out.print("Enter the customer name:  ");
	            String cname = input.next();
	            System.out.println();
	            
	            System.out.print("Enter the orderNo:  ");
	            int ordern = input.nextInt();
	            System.out.println();
	            
	            System.out.print("Enter the city:  ");
	            String cit = input.next();
	            System.out.println();
	            
	            prSt.setInt(1, cid);
	            prSt.setString(2, cname);
	            prSt.setInt(3, ordern);
	            prSt.setString(4, cit);
	            
	            int count = prSt.executeUpdate();
	            
	            //show the number of records
	            stmt = con.createStatement();
	            
	            String query1 = "select * from customer";
	            ResultSet rs =  stmt.executeQuery(query1);
	            System.out.println("Id    Name    OrderNo    City");
	            
	            while (rs.next()) {
	               int id = rs.getInt("custid");
	               String name = rs.getString("custname");
	               int ordn = rs.getInt("orderNo");
	               String ct = rs.getString("city");
	               System.out.println(id + "    " + name+"    "+ ordn+"    "+ ct);
	            }    
	            
	        } catch (ClassNotFoundException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        } catch (SQLException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        } finally{
	            try{
	                if(prSt != null) prSt.close();
	                if(con != null) con.close();
	            } catch(Exception ex){}
	        }
	}
	
	//-------------------------- Updating The Record-----------------------------//
	public void updatePSRecord()
    { 
		String sqlUpdate = "UPDATE customer SET city = ? WHERE custid = ?";
		
		try {
            try {
				Class.forName("com.mysql.jdbc.Driver");
				con = DriverManager.getConnection(url, user, password);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
            prSt = con.prepareStatement(sqlUpdate);
            
            // Take user input for insertion
            Scanner input = new Scanner(System.in);	
            
            System.out.print("Enter the custid:  ");
            int cid = input.nextInt();
            System.out.println();
            
            System.out.print("Enter the new city:  ");
            String cit = input.next();
            System.out.println();
            
            prSt.setString(1, cit);
            prSt.setInt(2, cid);
 
            int rowAffected = prSt.executeUpdate();
            System.out.println(String.format("Row affected %d", rowAffected));
            
            sqlUpdate = "UPDATE customer SET name = ? WHERE custid = ?";
            
            // update another record -reuse the prepared statement
            System.out.print("Enter the custid:  ");
            int cid1 = input.nextInt();
            System.out.println();
            
            System.out.print("Enter the new name:  ");
            String name1 = input.next();
            System.out.println();
            
            prSt.setString(1, name1);
            prSt.setInt(2, cid1);
 
            rowAffected = prSt.executeUpdate();
            System.out.println(String.format("Row affected %d", rowAffected));
 
		}
		catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }		
    }
	
	//-------------------------- Deleting The Record-----------------------------//
		public void deletePSRecord()
	    { 
			String sqlUpdate = "DELETE from customer where custid=?";
			
			try {
	            try {
					Class.forName("com.mysql.jdbc.Driver");
					con = DriverManager.getConnection(url, user, password);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
	            prSt = con.prepareStatement(sqlUpdate);
	            
	            // Take user input for insertion
	            Scanner input = new Scanner(System.in);	
	            
	            System.out.print("Enter the custid:  ");
	            int cid = input.nextInt();
	            System.out.println();
	            
	            prSt.setInt(1, cid);
	            prSt.executeUpdate();
	            
	            System.out.println("Record deleted successfully");
			}
			catch (SQLException ex) {
	            System.out.println(ex.getMessage());
	        }				
	    }
		
		//-------------------------- Count The Records-----------------------------//
		public void countPSRecord()
	    {  
			String query = "select count(*) from customer";
		      try {
		            Class.forName("com.mysql.jdbc.Driver");
		            con = DriverManager.getConnection(url, user, password);
		           
		            
		            // getting Statement object to execute query
		            stmt = con.createStatement();

		            // executing SELECT query
		            rs = stmt.executeQuery(query);

		            while (rs.next()) {
		                int count = rs.getInt(1);
		                System.out.println("Total number of customers : " + count);
		            }  
		            
		        } catch (ClassNotFoundException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } catch (SQLException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } finally{
		            try{
		                if(prSt != null) prSt.close();
		                if(con != null) con.close();
		            } catch(Exception ex){}
		        }
		}
		
		//-------------------------- Fetch The Records-----------------------------//
		public void fetchPSRecord()
	    {  
		
		      try {
		            Class.forName("com.mysql.jdbc.Driver");
		            con = DriverManager.getConnection(url, user, password);
		            
		            //show the number of records
		            stmt = con.createStatement();
		            
		            String query1 = "select * from customer";
		            ResultSet rs =  stmt.executeQuery(query1);
		            System.out.println("Id    Name    OrderNo    City");
		            
		            while (rs.next()) {
		               int id = rs.getInt("custid");
		               String name = rs.getString("custname");
		               int ordn = rs.getInt("orderNo");
		               String ct = rs.getString("city");
		               System.out.println(id + "    " + name+"    "+ ordn+"    "+ ct);
		            }    
		            
		        } catch (ClassNotFoundException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } catch (SQLException e) {
		            // TODO Auto-generated catch block
		            e.printStackTrace();
		        } finally{
		            try{
		                if(prSt != null) prSt.close();
		                if(con != null) con.close();
		            } catch(Exception ex){}
		        }
		}
		
}
