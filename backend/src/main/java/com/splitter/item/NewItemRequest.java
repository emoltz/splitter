package com.splitter.item;

public record NewItemRequest(
        String description,
        double price,
        Integer quantity,
        Integer billId
) {
}
