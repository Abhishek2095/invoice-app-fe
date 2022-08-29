export const itemsBeforeCreateNewItem = {
  items: [
    {
      Id: "21b53653-64db-4f63-9793-f9cffbad45e0",
      Name: "laptop",
      Stock: 196,
      Price: 400000,
      IsActive: false,
      Description: "windows",
      CreatedAt: 1660297277,
      UpdatedAt: 1661114139,
    },
    {
      Id: "880462c9-ea80-41a9-ae14-22ae5ae64145",
      Name: "phone",
      Stock: 20,
      Price: 400,
      IsActive: false,
      Description: "to play and talk",
      CreatedAt: 1660629676,
      UpdatedAt: 1660629676,
    },
  ],
};

export const itemToAdd = {
  Id: "21b53653-64db-4f63-9793-f9cffbad05e0",
  Name: "headphones",
  Stock: 200,
  Price: 10000,
  IsActive: true,
  Description: "to listen to songs",
  CreatedAt: 1660297277,
  UpdatedAt: 1660297277,
};

export const itemsAfterCreateNewItem = {
  items: [
    ...itemsBeforeCreateNewItem.items,
    itemToAdd,
    // ...itemsBeforeCreateNewItem.items,
    // ...itemsBeforeCreateNewItem.items,
    // ...itemsBeforeCreateNewItem.items,
    // ...itemsBeforeCreateNewItem.items,
    // ...itemsBeforeCreateNewItem.items,
  ],
};
