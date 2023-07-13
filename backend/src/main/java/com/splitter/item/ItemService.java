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
        Optional<Bill> bill = billRepository.findById(newItemRequest.billId());
        if (bill.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Bill id %d not found", newItemRequest.billId()));
        }
        item.setBill(bill.get());
        item.setDescription(newItemRequest.description());
        item.setPrice(newItemRequest.price());
        item.setQuantity(newItemRequest.quantity());
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    public ResponseEntity<Item> updateItem(Integer id, NewItemRequest newItemRequest) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
        Item item = itemOptional.get();
        item.setDescription(newItemRequest.description());
        item.setPrice(newItemRequest.price());
        item.setQuantity(newItemRequest.quantity());
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    public void deleteItem(Integer id) {
        if (itemRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
        itemRepository.deleteById(id);
    }
}
