package com.example.backend.service;

import com.example.backend.model.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DefaultItemsService {
    private final IdService idService;

    public List<Item> getDefaultItems() {
        List<Item> defaultItems = new ArrayList<>();
        String categoryBikeGear = "Bike Gear";
        String categoryFoodDrinks = "Food & Drinks";
        String categoryClothing = "Clothing";
        String categoryHygiene = "Hygiene/Toiletries";
        String categoryAdditional = "Additional Items";

        defaultItems.add(new Item(idService.generateId(), "Helmet", false, categoryBikeGear));
        defaultItems.add(new Item(idService.generateId(), "Cycle Glasses", false, categoryBikeGear));
        defaultItems.add(new Item(idService.generateId(), "Bikepacking Bags", false, categoryBikeGear));
        defaultItems.add(new Item(idService.generateId(), "Lightweight Lock", false, categoryBikeGear));
        defaultItems.add(new Item(idService.generateId(), "Lights", false, categoryBikeGear));

        defaultItems.add(new Item(idService.generateId(), "Water Bottle", false, categoryFoodDrinks));
        defaultItems.add(new Item(idService.generateId(), "Aquatabs", false, categoryFoodDrinks));
        defaultItems.add(new Item(idService.generateId(), "Energy Bar", false, categoryFoodDrinks));
        defaultItems.add(new Item(idService.generateId(), "Snacks", false, categoryFoodDrinks));

        defaultItems.add(new Item(idService.generateId(), "Cycling Shoes", false, categoryClothing));
        defaultItems.add(new Item(idService.generateId(), "Cycling Shorts", false, categoryClothing));
        defaultItems.add(new Item(idService.generateId(), "Jersey or Top", false, categoryClothing));
        defaultItems.add(new Item(idService.generateId(), "Rain Jacket", false, categoryClothing));
        defaultItems.add(new Item(idService.generateId(), "Sweater", false, categoryClothing));

        defaultItems.add(new Item(idService.generateId(), "Sunscreen", false, categoryHygiene));
        defaultItems.add(new Item(idService.generateId(), "Toothbrush & Toothpaste", false, categoryHygiene));
        defaultItems.add(new Item(idService.generateId(), "Soap", false, categoryHygiene));
        defaultItems.add(new Item(idService.generateId(), "Towel", false, categoryHygiene));

        defaultItems.add(new Item(idService.generateId(), "Spare Tubes", false, categoryAdditional));
        defaultItems.add(new Item(idService.generateId(), "Headlamp", false, categoryAdditional));
        defaultItems.add(new Item(idService.generateId(), "Passport", false, categoryAdditional));

        return defaultItems;
    }
}
