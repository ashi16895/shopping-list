export const CATEGORIES = {
  'Dairy': ['Milk', 'Eggs', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
  'Bakery': ['Bread', 'Pastries', 'Cakes', 'Muffins', 'Rolls'],
  'Vegetables': ['Tomatoes', 'Carrots', 'Potatoes', 'Onions', 'Lettuce', 'Spinach'],
  'Meat': ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey'],
  'Fruits': ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Berries'],
  'Grains': ['Rice', 'Pasta', 'Cereal', 'Oats', 'Quinoa'],
  'Snacks': ['Chips', 'Cookies', 'Crackers', 'Nuts', 'Candy'],
  'Beverages': ['Water', 'Juice', 'Soda', 'Coffee', 'Tea'],
  'Frozen': ['Ice Cream', 'Frozen Vegetables', 'Frozen Meals', 'Frozen Fruits'],
  'Household': ['Detergent', 'Paper Towels', 'Toilet Paper', 'Cleaning Supplies'],
  'Personal Care': ['Shampoo', 'Soap', 'Toothpaste', 'Deodorant']
};

export const getCategoryOptions = () => {
  return Object.keys(CATEGORIES).map(category => ({
    label: category,
    value: category
  }));
};

export const getSubCategoryOptions = (category: string) => {
  return CATEGORIES[category as keyof typeof CATEGORIES]?.map(subCategory => ({
    label: subCategory,
    value: subCategory
  })) || [];
};