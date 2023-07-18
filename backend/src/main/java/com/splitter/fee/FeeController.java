package com.splitter.fee;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "${splitter.api.origin}")
@RequestMapping("api/v1/splitter/bill/{billId}/fee")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @GetMapping
    public List<Fee> getFeesByBillId(@PathVariable Integer billId) {
        return feeService.getFeesByBillId(billId);
    }

    @PostMapping
    public ResponseEntity<Fee> createFee(@RequestBody NewFeeRequest newFeeRequest) {
        return feeService.createFee(newFeeRequest);
    }

    @PutMapping("/{feeId}")
    public ResponseEntity<Fee> updateFee(@PathVariable Integer feeId, @RequestBody NewFeeRequest newFeeRequest) {
        return feeService.updateFee(feeId, newFeeRequest);
    }

    @DeleteMapping("/{feeId}")
    public void deleteFee(@PathVariable Integer feeId) {
        feeService.deleteFee(feeId);
    }
}
