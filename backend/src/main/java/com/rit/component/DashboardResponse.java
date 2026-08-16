package com.rit.component;

public class DashboardResponse {
	private long totalFarmers;
	private long totalBuyers;
	private long totalProducts;
	private long pendingApprovals;
	private long totalOrders;
	private double totalRevenue;
	public DashboardResponse(long totalFarmers, long totalBuyers, long totalProducts, long pendingApprovals,
			long totalOrders, double totalRevenue) {
		this.totalFarmers = totalFarmers;
		this.totalBuyers = totalBuyers;
		this.totalProducts = totalProducts;
		this.pendingApprovals = pendingApprovals;
		this.totalOrders = totalOrders;
		this.totalRevenue = totalRevenue;
	}
	public long getTotalFarmers() {
		return totalFarmers;
	}
	public long getTotalBuyers() {
		return totalBuyers;
	}
	public long getTotalProducts() {
		return totalProducts;
	}
	public long getPendingApprovals() {
		return pendingApprovals;
	}
	public long getTotalOrders() {
		return totalOrders;
	}
	public double getTotalRevenue() {
		return totalRevenue;
	}
}