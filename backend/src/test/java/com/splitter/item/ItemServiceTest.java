package com.splitter.item;

import com.splitter.bill.Bill;
import com.splitter.bill.BillRepository;
import com.splitter.bill.BillService;
import com.splitter.bill.NewBillRequest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class ItemServiceTest {

    private BillService billService;
    private ItemService itemService;
    private Bill bill;
    private Integer billId;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ItemRepository itemRepository;

    @BeforeEach
    void setUp() {
        billService = new BillService(billRepository);
        itemService = new ItemService(itemRepository, billRepository);

        ResponseEntity<Bill> newBill = billService.createBill(new NewBillRequest("Test Bill", "2023-01-01", 0.0));
        bill = newBill.getBody();
        assert bill != null;
        billId = bill.getId();
    }

    @Test
    void testGetItemsByBillId() {
        List<Item> itemsList = itemService.getItemsByBillId(billId);
        assertTrue(itemsList.isEmpty());
    }

    @Test
    void testCreateItem() {
        ResponseEntity<Item> newItem = itemService.createItem(new NewItemRequest(
                "Hamburger",
                16.0,
                1,
                billId
        ));
        assertTrue(itemService.getItemsByBillId(billId).contains(newItem.getBody()));
        assertThat(billService.getBillById(billId).getTotal()).isEqualTo(16.0);
    }

    @Test
    void testUpdateItem() {
        double oldPrice = 16.0;
        int oldQuantity = 1;
        double newPrice = 20.0;
        int newQuantity = 2;

        ResponseEntity<Item> newItem = itemService.createItem(new NewItemRequest(
                "Hamburger",
                oldPrice,
                oldQuantity,
                billId
        ));
        assertTrue(itemService.getItemsByBillId(billId).contains(newItem.getBody()));
        assertThat(billService.getBillById(billId).getTotal()).isEqualTo(oldPrice * oldQuantity);

        ResponseEntity<Item> updatedItem = itemService.updateItem(newItem.getBody().getId(), new NewItemRequest(
                "Hamburger",
                newPrice,
                newQuantity,
                billId
        ));
        assertThat(itemService.getItemsByBillId(billId).size()).isEqualTo(1);
        assertTrue(itemService.getItemsByBillId(billId).contains(updatedItem.getBody()));
        assertThat(billService.getBillById(billId).getTotal()).isEqualTo(newPrice * newQuantity);
    }

    @Test
    void testDeleteItem() {
        ResponseEntity<Item> newItem = itemService.createItem(new NewItemRequest(
                "Hamburger",
                16.0,
                1,
                billId
        ));
        assertTrue(itemService.getItemsByBillId(billId).contains(newItem.getBody()));
        assertThat(billService.getBillById(billId).getTotal()).isEqualTo(16.0);

        itemService.deleteItem(newItem.getBody().getId());
        assertThat(itemService.getItemsByBillId(billId).size()).isEqualTo(0);
        assertFalse(itemService.getItemsByBillId(billId).contains(newItem.getBody()));
        assertThat(billService.getBillById(billId).getTotal()).isEqualTo(0.0);
    }
}
