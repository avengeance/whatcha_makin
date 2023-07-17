// Validation constants
export const MIN_NAME_LENGTH = 3;
export const MIN_INGREDIENT_NAME_LENGTH = 3;

// Name validation
export const validateName = (name) => {
  return name.length >= MIN_NAME_LENGTH && /^[a-zA-Z\s]+$/.test(name);
};

// Ingredient name validation
export const validateIngredientName = (name) => {
  return name.length >= MIN_INGREDIENT_NAME_LENGTH && /^[a-zA-Z]+$/.test(name);
};

// Ingredient quantity
export const validateIngredientQuantity = (qty) => {
  const num = Number(qty);
  return !Number.isNaN(num) && num % 1 === 0 && num > 0;
};

// Direction step info
export const validateStepInfo = (info) => {
  return info.length > 0;
};

// Prep time
export const validatePrepTime = (hours, mins) => {
  return hours > 0 || mins > 0;
};

// Cook time
export const validateCookTime = (hours, mins) => {
  return hours > 0 || mins > 0;
};

// Servings
export const validateServings = (servings) => {
  return servings > 0;
};
