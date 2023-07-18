package com.splitter.fee;

import com.splitter.bill.Bill;
import jakarta.persistence.*;

@Entity
public class Fee {
    @Id
    @SequenceGenerator(
            name = "fee_id_sequence",
            sequenceName = "fee_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "fee_id_sequence"
    )
    private Integer id;
    private String description;
    private double price;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    public Fee(Integer id, String description, double price, Bill bill) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.bill = bill;
    }

    public Fee() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
