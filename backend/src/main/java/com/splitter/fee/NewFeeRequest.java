package com.splitter.fee;

public record NewFeeRequest(
        String description,
        double price,
        Integer billId
) {
}
