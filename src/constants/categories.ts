export const CATEGORIES = {
  'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
  'Vegetables': ['Tomatoes', 'Carrots', 'Onions', 'Potatoes', 'Lettuce', 'Spinach'],
  'Meat': ['Chicken', 'Beef', 'Pork', 'Fish', 'Turkey'],
  'Snacks': ['Chips', 'Cookies', 'Crackers', 'Nuts', 'Candy'],
  'Beverages': ['Water', 'Juice', 'Soda', 'Coffee', 'Tea'],
  'Grains': ['Bread', 'Rice', 'Pasta', 'Cereal', 'Oats'],
  'Fruits': ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Berries'],
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