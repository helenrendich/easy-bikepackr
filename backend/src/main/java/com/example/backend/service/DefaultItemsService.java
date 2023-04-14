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
    private static final String CATEGORY_BIKE_GEAR = "Bike Gear";
    private static final String CATEGORY_FOOD_DRINKS = "Food & Drinks";
    private static final String CATEGORY_CLOTHING = "Clothing";
    private static final String CATEGORY_HYGIENE = "Hygiene/Toiletries";
    private static final String CATEGORY_ADDITIONAL = "Additional Items";
    private static final String CATEGORY_CAMPING = "Camping";

    public List<Item> getDefaultItems() {
        List<Item> defaultItems = new ArrayList<>();

        defaultItems.add(new Item(idService.generateId(), "Helmet", false, CATEGORY_BIKE_GEAR));
        defaultItems.add(new Item(idService.generateId(), "Cycle Glasses", false, CATEGORY_BIKE_GEAR));
        defaultItems.add(new Item(idService.generateId(), "Bikepacking Bags", false, CATEGORY_BIKE_GEAR));
        defaultItems.add(new Item(idService.generateId(), "Lightweight Lock", false, CATEGORY_BIKE_GEAR));
        defaultItems.add(new Item(idService.generateId(), "Lights", false, CATEGORY_BIKE_GEAR));

        defaultItems.add(new Item(idService.generateId(), "Water Bottle", false, CATEGORY_FOOD_DRINKS));
        defaultItems.add(new Item(idService.generateId(), "Aquatabs", false, CATEGORY_FOOD_DRINKS));
        defaultItems.add(new Item(idService.generateId(), "Energy Bar", false, CATEGORY_FOOD_DRINKS));
        defaultItems.add(new Item(idService.generateId(), "Snacks", false, CATEGORY_FOOD_DRINKS));

        defaultItems.add(new Item(idService.generateId(), "Cycling Shoes", false, CATEGORY_CLOTHING));
        defaultItems.add(new Item(idService.generateId(), "Cycling Shorts", false, CATEGORY_CLOTHING));
        defaultItems.add(new Item(idService.generateId(), "Jersey or Top", false, CATEGORY_CLOTHING));
        defaultItems.add(new Item(idService.generateId(), "Rain Jacket", false, CATEGORY_CLOTHING));
        defaultItems.add(new Item(idService.generateId(), "Sweater", false, CATEGORY_CLOTHING));

        defaultItems.add(new Item(idService.generateId(), "Sunscreen", false, CATEGORY_HYGIENE));
        defaultItems.add(new Item(idService.generateId(), "Toothbrush & Toothpaste", false, CATEGORY_HYGIENE));
        defaultItems.add(new Item(idService.generateId(), "Soap", false, CATEGORY_HYGIENE));
        defaultItems.add(new Item(idService.generateId(), "Towel", false, CATEGORY_HYGIENE));

        defaultItems.add(new Item(idService.generateId(), "Spare Tubes", false, CATEGORY_ADDITIONAL));
        defaultItems.add(new Item(idService.generateId(), "Headlamp", false, CATEGORY_ADDITIONAL));
        defaultItems.add(new Item(idService.generateId(), "Passport", false, CATEGORY_ADDITIONAL));

        defaultItems.add(new Item(idService.generateId(), "Tent", false, CATEGORY_CAMPING));
        defaultItems.add(new Item(idService.generateId(), "Sleeping Bag", false, CATEGORY_CAMPING));
        defaultItems.add(new Item(idService.generateId(), "Sleeping Pad", false, CATEGORY_CAMPING));
        defaultItems.add(new Item(idService.generateId(), "Pillow", false, CATEGORY_CAMPING));

        return defaultItems;
    }

    public List<String> getValidCategories() {
        List<String> categories = new ArrayList<>();
        categories.add(CATEGORY_BIKE_GEAR);
        categories.add(CATEGORY_FOOD_DRINKS);
        categories.add(CATEGORY_CLOTHING);
        categories.add(CATEGORY_HYGIENE);
        categories.add(CATEGORY_ADDITIONAL);
        categories.add(CATEGORY_CAMPING);
        return categories;
    }
}
