package com.rit.component;

public record ProductRequest(String name,
        String category,
        String description,
        Double price,
        Double quantity,
        String unit,
        String image,
        Long farmerId) {

}
