package com.app.repository;

// import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.app.model.Shoe;
import com.app.model.User;

public interface ShoeRepository extends CrudRepository<Shoe, Integer>{
    
    public List<Shoe> findBySeason(String season);
    public List<Shoe> findByBrand(String brand);
    public List<Shoe> findByCategory(String category);
    public List<Shoe> findByColor(String color);
	
    @Query("SELECT s FROM Shoe s WHERE "
    		+ "s.created_date > DATEADD(day, -15, CURRENT_DATE) "
    	    + "ORDER BY created_date desc"
    		+ "")
    public List<Shoe> findLatestShoes();
    
    @Query("SELECT s FROM Shoe s WHERE "
    		// + "(s.id = :id OR :id IS NULL) AND "
    	    + "(s.season = :season OR :season IS NULL) AND "
    	    + "(s.brand = :brand OR :brand IS NULL) AND "
    	    + "(s.category = :category OR :category IS NULL) AND "
    	    + "(s.color = :color OR :color IS NULL) "
    	    + "ORDER BY CASE :sortOrder WHEN 'asc' THEN s.price END ASC, "
            + "CASE :sortOrder WHEN 'desc' THEN s.price END DESC"
    		+ "")
    public List<Shoe> findShoesByAttributes(
    		// @Param("id") int id,
    		@Param("season") String season,
    		@Param("brand") String brand,
    		@Param("category") String category,
    		@Param("color") String color,
    		@Param("sortOrder") String sortOrder);
    
    
    // reports
    @Query("SELECT u FROM User u")
    public List<User> findAllUsers();
    
    @Query(value = "SELECT u.*, s.*, o.* FROM shoe_product_order o " +
            "JOIN shoe_user u ON o.user_id = u.user_id " +
            "JOIN shoe_product s ON o.product_id = s.product_id", nativeQuery = true)
    List<Object[]> findAllOrders();
    
}
