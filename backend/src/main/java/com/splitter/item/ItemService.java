package com.splitter.item;

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
        Optional<Bill> billOptional = billRepository.findById(newItemRequest.billId());
        if (billOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Bill id %d not found", newItemRequest.billId()));
        }
        Bill bill = billOptional.get();
        item.setBill(bill);
        updateItemDetails(newItemRequest, item, bill);
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    public ResponseEntity<Item> updateItem(Integer id, NewItemRequest newItemRequest) {
        Item item = findExistingItem(id);
        Bill bill = item.getBill();
        bill.setTotal(bill.getTotal() - (item.getPrice() * item.getQuantity()));
        updateItemDetails(newItemRequest, item, bill);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    public void deleteItem(Integer id) {
        Item item = findExistingItem(id);
        Bill bill = item.getBill();
        bill.setTotal(bill.getTotal() - (item.getPrice() * item.getQuantity()));
        itemRepository.deleteById(id);
        billRepository.save(bill);
    }

    private void updateItemDetails(NewItemRequest newItemRequest, Item item, Bill bill) {
        item.setDescription(newItemRequest.description());
        item.setPrice(newItemRequest.price());
        item.setQuantity(newItemRequest.quantity());
        itemRepository.save(item);
        bill.setTotal(bill.getTotal() + (item.getPrice() * item.getQuantity()));
        billRepository.save(bill);
    }

    private Item findExistingItem(Integer id) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        return itemOptional.get();
    }
}
