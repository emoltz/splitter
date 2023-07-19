package com.splitter.fee;

import com.splitter.bill.Bill;
import com.splitter.bill.BillRepository;
import com.splitter.bill.BillService;
import com.splitter.bill.NewBillRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class FeeServiceTest {

    private BillService billService;
    private FeeService feeService;
    private Bill bill;
    private Integer billId;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private FeeRepository feeRepository;

    @BeforeEach
    void setUp() {
        feeService = new FeeService(feeRepository, billRepository);
        billService = new BillService(billRepository, feeService);

        ResponseEntity<Bill> newBill = billService.createBill(new NewBillRequest("Test Bill", "2023-01-01", 0.0));
        this.bill = newBill.getBody();
        assert this.bill != null;
        this.billId = bill.getId();
    }

    @Test
    void testGetFeesByBillId() {
        List<Fee> feesList = feeService.getFeesByBillId(this.billId);

        // Tax and Tip should be automatically created on Bill creation
        assertThat(feesList.size()).isEqualTo(2);
    }

    @Test
    void testCreateFee() {
        ResponseEntity<Fee> newFee = feeService.createFee(new NewFeeRequest(
                "Tip",
                22.50,
                this.billId
        ));
        assertTrue(feeService.getFeesByBillId(this.billId).contains(newFee.getBody()));
        assertThat(billService.getBillById(this.billId).getTotal()).isEqualTo(22.50);
    }

    @Test
    void testUpdateFee() {
        String oldDescription = "Tip";
        double oldPrice = 22.50;
        String newDescription = "Tax";
        double newPrice = 44.15;

        ResponseEntity<Fee> newFee = feeService.createFee(new NewFeeRequest(
                oldDescription,
                oldPrice,
                this.billId
        ));
        assertTrue(feeService.getFeesByBillId(this.billId).contains(newFee.getBody()));
        assertThat(billService.getBillById(this.billId).getTotal()).isEqualTo(oldPrice);

        ResponseEntity<Fee> updatedFee = feeService.updateFee(newFee.getBody().getId(), new NewFeeRequest(
                newDescription,
                newPrice,
                this.billId
        ));
        List<Fee> feesList = feeService.getFeesByBillId(this.billId);
        assertThat(feesList.size()).isEqualTo(3);
        assertTrue(feesList.contains(updatedFee.getBody()));
        assertThat(feeService.findExistingFee(updatedFee.getBody().getId()).getDescription()).isEqualTo(newDescription);
        assertThat(billService.getBillById(this.billId).getTotal()).isEqualTo(newPrice);
    }

    @Test
    void testDeleteFee() {
        ResponseEntity<Fee> newFee = feeService.createFee(new NewFeeRequest(
                "Tip",
                22.50,
                this.billId
        ));
        assertTrue(feeService.getFeesByBillId(this.billId).contains(newFee.getBody()));
        assertThat(billService.getBillById(this.billId).getTotal()).isEqualTo(22.50);

        feeService.deleteFee(newFee.getBody().getId());
        assertThat(feeService.getFeesByBillId(this.billId).size()).isEqualTo(2);
        assertThat(billService.getBillById(this.billId).getTotal()).isEqualTo(0.0);
    }
}
