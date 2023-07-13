package com.splitter.bill;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class BillService {

    private final BillRepository billRepository;
    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> getBills() {
        return billRepository.findByArchivedFalse();
    }

    public ResponseEntity<Bill> createBill(NewBillRequest newBillRequest) {
        Bill bill = new Bill();
        bill.setTitle(newBillRequest.title());
        try {
            bill.setDate(simpleDateFormat.parse(newBillRequest.date()));
        } catch (ParseException e) {
            // need to add a different handle for this
            bill.setDate(new Date());
        }
        bill.setTotal(newBillRequest.total());
        try {
            billRepository.save(bill);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(bill, HttpStatus.CREATED);
    }

    public void archiveBill(Integer id) {
        Bill bill = billRepository.findById(id).orElseThrow(() -> new IllegalStateException("Bill with id " + id + " does not exist"));
        bill.setArchived(true);
        billRepository.save(bill);
    }
}
