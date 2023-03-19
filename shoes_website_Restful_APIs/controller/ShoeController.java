package com.app.controller;

// import java.util.ArrayList;
// import java.util.Calendar;
// import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Shoe;
import com.app.model.User;
import com.app.repository.ShoeRepository;

@RestController
@RequestMapping("shoes")
public class ShoeController {
	
	@Autowired
	ShoeRepository shoerepository;
	
	// insert new shoe into database
	@PostMapping("add")
	public Shoe addShoe(@RequestBody Shoe shoe_product)
	{
		return shoerepository.save(shoe_product);
	}
	
	// delete particular shoe from database
	@DeleteMapping("delete/{id}")
	public void deleteShoe(@PathVariable int id)
	{
		shoerepository.deleteById(id);
	}
	
//	// update existing shoe 
//	@PutMapping("update/{id}")
//	public Shoe updateShoe(@RequestBody Shoe shoe_product)
//	{
//		return shoerepository.save(shoe_product);
//	}
	
	@PutMapping("update/{id}")
	public Shoe updateShoe(@PathVariable int id, @RequestBody Shoe shoe_product)
	{
	    Shoe existingShoe = shoerepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid shoe id: " + id));
	    existingShoe.setProduct_name(shoe_product.getProduct_name());
	    existingShoe.setSeason(shoe_product.getSeason());
	    existingShoe.setBrand(shoe_product.getBrand());
	    existingShoe.setCategory(shoe_product.getCategory());
	    existingShoe.setPrice(shoe_product.getPrice());
	    existingShoe.setColor(shoe_product.getColor());
	    existingShoe.setCreated_date(shoe_product.getCreated_date());
	    existingShoe.setDiscount(shoe_product.getDiscount());
	    existingShoe.setQuantity(shoe_product.getQuantity());

	    return shoerepository.save(existingShoe);
	}
	
	// get particular shoe by its ID
	@GetMapping("shoe/{id}")
	public Optional<Shoe> getShoeId(@PathVariable int id)
	{
		return shoerepository.findById(id);
	}
	
	// get shoes by their season
	@GetMapping("season")
	public List<Shoe> getShoesBySeason(@RequestParam String season) {
	    return shoerepository.findBySeason(season);
	}
	
	// get shoes by their brand
	@GetMapping("brand")
	public List<Shoe> getShoesByBrand(@RequestParam String brand) {
	    return shoerepository.findByBrand(brand);
	}
	
	// get shoes by their category
	@GetMapping("category")
	public List<Shoe> getShoesByCategory(@RequestParam String category) {
	    return shoerepository.findByCategory(category);
	}
	
	// get shoes by their color
	@GetMapping("color")
	public List<Shoe> getShoesByColor(@RequestParam String color) {
	    return shoerepository.findByColor(color);
	}
	
	// get the latest created shoes
	@GetMapping("latest_shoes")
	public List<Shoe> getLatestShoes() 
	{
	    List<Shoe> shoes = shoerepository.findLatestShoes();
	    return shoes;
	}
	
	// search with optional parameters
	@GetMapping("search")
	public List<Shoe> getFilteredShoes(
			//@RequestParam(required = false) int id,
			@RequestParam(required = false) String season, 
			@RequestParam(required = false) String brand,
			@RequestParam(required = false) String category, 
			@RequestParam(required = false) String color,
			@RequestParam(required = false, defaultValue = "asc") String sortOrder
			) 
	{
	    List<Shoe> shoes = shoerepository.findShoesByAttributes(season, brand, category, color, sortOrder);
	    return shoes;
	}
	
	// reports	
	// all orders	
	@GetMapping("reports/orders")
	public List<Object[]> findAllOrders() {
	    return shoerepository.findAllOrders();
	}
	
	// retrieve all shoe from database
	@GetMapping("reports/all_shoes")
	public List<Shoe> getAllShoe()
	{
		List<Shoe> shoes=(List<Shoe>) shoerepository.findAll();
		return shoes;
	}
	
	// enrolled users
	@GetMapping("reports/users_enrolled")
	public List<User> getAllUsers() {
	    List<User> users = shoerepository.findAllUsers();
	    return users;
	}
	
}
