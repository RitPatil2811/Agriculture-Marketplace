package com.rit.component;

public record CartResponse(Long cartId,Long userId,Long productId,Long farmerId,String name,String category,String image,Double price,Double quantity,String unit)
{
}