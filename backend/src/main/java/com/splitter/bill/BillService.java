package com.splitter.bill;

import com.splitter.fee.FeeService;
import com.splitter.fee.NewFeeRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BillService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BillService.class);

    private final BillRepository billRepository;
    private final FeeService feeService;
    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    public BillService(BillRepository billRepository, FeeService feeService) {
        this.billRepository = billRepository;
        this.feeService = feeService;
    }

    public List<Bill> getBills() {
        return billRepository.findByArchivedFalse();
    }

    public Bill getBillById(Integer id) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bill not found");
        return billOptional.get();
    }

    public ResponseEntity<Bill> createBill(NewBillRequest newBillRequest) {
        LOGGER.info("New Bill Request {}", newBillRequest);
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
            LOGGER.error("Could not create New Bill", e);
            return new ResponseEntity<>(null, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        // Automatically create Tax and Tip Fees
        feeService.createFee(new NewFeeRequest("Tax", 0.0, bill.getId()));
        feeService.createFee(new NewFeeRequest("Tip", 0.0, bill.getId()));

        LOGGER.info("New Bill created {}", bill);
        return new ResponseEntity<>(bill, HttpStatus.CREATED);
    }

    public void archiveBill(Integer id) {
        Bill bill = billRepository.findById(id).orElseThrow(() -> new IllegalStateException("Bill with id " + id + " does not exist"));
        bill.setArchived(true);
        billRepository.save(bill);
        LOGGER.info("Bill {} archived successfully", bill);
    }
}
