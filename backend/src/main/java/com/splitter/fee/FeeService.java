package com.splitter.fee;

import com.splitter.bill.Bill;
import com.splitter.bill.BillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    private final FeeRepository feeRepository;
    private final BillRepository billRepository;

    public FeeService(FeeRepository feeRepository, BillRepository billRepository) {
        this.feeRepository = feeRepository;
        this.billRepository = billRepository;
    }

    public List<Fee> getFeesByBillId(@PathVariable Integer billId) {
        return feeRepository.findByBillId(billId);
    }

    public ResponseEntity<Fee> createFee(NewFeeRequest newFeeRequest) {
        Fee fee = new Fee();
        Optional<Bill> billOptional = billRepository.findById(newFeeRequest.billId());
        if (billOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Bill id %d not found", newFeeRequest.billId()));
        }
        Bill bill = billOptional.get();
        fee.setBill(bill);
        updateFeeDetails(newFeeRequest, fee, bill);
        feeRepository.save(fee);
        return new ResponseEntity<>(fee, HttpStatus.CREATED);
    }

    public ResponseEntity<Fee> updateFee(Integer id, NewFeeRequest newFeeRequest) {
        Fee fee = findExistingFee(id);
        Bill bill = fee.getBill();
        bill.setTotal(bill.getTotal() - fee.getPrice());
        updateFeeDetails(newFeeRequest, fee, bill);
        return new ResponseEntity<>(fee, HttpStatus.OK);
    }

    public void deleteFee(Integer id) {
        Fee fee = findExistingFee(id);
        Bill bill = fee.getBill();
        bill.setTotal(bill.getTotal() - fee.getPrice());
        feeRepository.deleteById(id);
        billRepository.save(bill);
    }

    private void updateFeeDetails(NewFeeRequest newFeeRequest, Fee fee, Bill bill) {
        fee.setDescription(newFeeRequest.description());
        fee.setPrice(newFeeRequest.price());
        feeRepository.save(fee);
        bill.setTotal(bill.getTotal() + fee.getPrice());
        billRepository.save(bill);
    }

    public Fee findExistingFee(Integer id) {
        Optional<Fee> feeOptional = feeRepository.findById(id);
        if (feeOptional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fee not found");
        return feeOptional.get();
    }
}
