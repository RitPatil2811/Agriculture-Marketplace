package com.rit.entity;
import com.rit.util.Role;
import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String mobile;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String city;
    private String state;
    private String pincode;
    private String address;
    private String farmName;
    private Integer experience;
    private LocalDate joined;
    private String status;
    public User() {
    }
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getFarmName() {
	    return farmName;
	}

	public void setFarmName(String farmName) {
	    this.farmName = farmName;
	}

	public Integer getExperience() {
	    return experience;
	}

	public void setExperience(Integer experience) {
	    this.experience = experience;
	}

	public LocalDate getJoined() {
	    return joined;
	}

	public void setJoined(LocalDate joined) {
	    this.joined = joined;
	}
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", mobile=" + mobile + ", password="
				+ password + ", role=" + role + ", city=" + city + ", state=" + state + ", pincode=" + pincode
				+ ", address=" + address + ", farmName=" + farmName + ", experience=" + experience + ", joined="
				+ joined + ", status=" + status + "]";
	}
	

    // getters and setters
    
    
}