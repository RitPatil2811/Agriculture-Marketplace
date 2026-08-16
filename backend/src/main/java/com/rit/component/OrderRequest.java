package com.rit.component;

public record OrderRequest(Long buyerId,Long farmerId,Long productId,String customer,Double quantity) {
}