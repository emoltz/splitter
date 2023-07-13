package com.splitter.item;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://www.splitterproject.com/"})
@RequestMapping("api/v1/splitter/bill/{billId}/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getItemsByBillId(@PathVariable Integer billId) {
        return itemService.getItemsByBillId(billId);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody NewItemRequest newItemRequest) {
        return itemService.createItem(newItemRequest);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable Integer itemId, @RequestBody NewItemRequest newItemRequest) {
        return itemService.updateItem(itemId, newItemRequest);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable Integer itemId) {
        itemService.deleteItem(itemId);
    }
}
