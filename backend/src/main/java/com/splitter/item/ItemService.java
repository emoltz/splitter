package com.splitter.item;

import com.splitter.bill.Bill;
import com.splitter.bill.BillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final BillRepository billRepository;

    public ItemService(ItemRepository itemRepository, BillRepository billRepository) {
        this.itemRepository = itemRepository;
        this.billRepository = billRepository;
    }

    public List<Item> getItemsByBillId(@PathVariable Integer billId) {
        return itemRepository.findByBillId(billId);
    }

    public ResponseEntity<Item> createItem(NewItemRequest newItemRequest) {
        Item item = new Item();
        Optional<Bill> bill = billRepository.findById(newItemRequest.billId());
        if (bill.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        item.setBill(bill.get());
        item.setDescription(newItemRequest.description());
        item.setPrice(newItemRequest.price());
        item.setQuantity(newItemRequest.quantity());
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }
}
