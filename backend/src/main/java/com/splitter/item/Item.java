package com.splitter.item;
import com.splitter.bill.Bill;
import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @SequenceGenerator(
            name = "item_id_sequence",
            sequenceName = "item_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "item_id_sequence"
    )
    private Integer id;
    private String description;
    private double price;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    public Item() {

    }

    public Item(Integer id, String description, double price, Integer quantity, Bill bill) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.bill = bill;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Bill getBill() { return bill; }
    public void setBill(Bill bill) { this.bill = bill; }

}
