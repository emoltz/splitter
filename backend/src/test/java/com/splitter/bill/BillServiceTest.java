package com.splitter.bill;

import com.splitter.fee.FeeRepository;
import com.splitter.fee.FeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class BillServiceTest {

    private BillService billService;
    private FeeService feeService;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private FeeRepository feeRepository;

    @BeforeEach
    void setUp() {
        feeService = new FeeService(feeRepository, billRepository);
        billService = new BillService(billRepository, feeService);
    }

    @Test
    void getBills() {
        List<Bill> allBills = billService.getBills();
        assertTrue(allBills.isEmpty());
    }

    @Test
    void createBill() {
        ResponseEntity<Bill> newBill = billService.createBill(new NewBillRequest("Test Bill", "2023-01-01", 45.00));
        assertTrue(billService.getBills().contains(newBill.getBody()));
    }

    @Test
    void archiveBill() {
        ResponseEntity<Bill> newBill = billService.createBill(new NewBillRequest("Test Bill", "2023-01-01", 45.00));
        Bill bill = newBill.getBody();
        assert bill != null;
        assertFalse(bill.getArchived());
        billService.archiveBill(bill.getId());
        assertTrue(bill.getArchived());
        assertFalse(billService.getBills().contains(bill));
    }
}
