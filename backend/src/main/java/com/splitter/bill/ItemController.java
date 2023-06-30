package com.splitter.bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/splitter/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/bill/{billId}")
    @CrossOrigin(origins = "http://localhost:5173")
    public List<Item> getItemsByBillId(@PathVariable Integer billId){
        return itemRepository.findByBillId(billId);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Item> createItem(@RequestBody Item item){
        Item savedItem = itemRepository.save(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    // other mappings go below (PUT, DELETE, etc...


}
