import classicBurger from "./assets/images/Simply-Classic-Burger.jpg";
import bbq from "./assets/images/BBQ-Bacon-Burgers-RCSQ.jpg";
import vegBurger from "./assets/images/Spicy-Miso-Portobello-Burger-215.jpg";
import peperPizza from "./assets/images/peppizza.jpg";
import margPizza from "./assets/images/Margherita-pizza-2.jpg";
import vegPizza from "./assets/images/vegPizza.jpg";
import supPizza from "./assets/images/pizza_supersupreme.jpg";
import friedChicken from "./assets/images/friedChicken.jpg";
import spicy from "./assets/images/Spicy-Honey.jpg";
import honeyChicken from "./assets/images/honey-mustard-chicken-wings.jpg";
import garlic from "./assets/images/Crispy-Honey-Garlic-Chicken-Wings.jpg";

const data = [
  // Burgers
  {
    id: 1,
    title: "Classic Burger",
    description:
      "A juicy beef patty with lettuce, tomato, onions, pickles, and special sauce on a toasted bun.",
    price: 5.99,
    img: classicBurger,
  },
  {
    id: 2,
    title: "BBQ Bacon Burger",
    description:
      "Grilled beef patty topped with crispy bacon, melted cheddar cheese, BBQ sauce, lettuce, and tomato.",
    price: 6.99,
    img: bbq,
  },
  {
    id: 3,
    title: "Vegetarian Portobello Burger",
    description:
      "A delicious veggie patty made with black beans, corn, and spices, served with lettuce, tomato, and avocado mayo.",
    price: 5.49,
    img: vegBurger,
  },
  // Pizzas
  {
    id: 4,
    title: "Pepperoni Pizza",
    description:
      "Classic pizza topped with pepperoni slices and melted mozzarella cheese.",
    price: 8.99,
    img: peperPizza,
  },
  {
    id: 5,
    title: "Margherita Pizza",
    description:
      "Traditional pizza topped with tomato sauce, fresh mozzarella cheese, and basil leaves.",
    price: 7.99,
    img: margPizza,
  },
  {
    id: 6,
    title: "Vegetarian Pizza",
    description:
      "Delicious pizza topped with tomato sauce, mozzarella cheese, bell peppers, onions, olives, and mushrooms.",
    price: 10.99,
    img: vegPizza,
  },
  {
    id: 7,
    title: "Supreme Pizza",
    description:
      "Loaded with pepperoni, sausage, mushrooms, onions, green peppers, and black olives.",
    price: 10.99,
    img: supPizza,
  },
  // Fried Chickens
  {
    id: 8,
    title: "Crispy Fried Chicken",
    description:
      "Juicy chicken pieces coated in a crispy seasoned breading, served with fries and coleslaw.",
    price: 9.99,
    img: friedChicken,
  },
  {
    id: 9,
    title: "Spicy Chicken Tenders",
    description:
      "Tender chicken strips marinated in spicy seasoning, deep-fried to perfection.",
    price: 8.49,
    img: spicy,
  },
  {
    id: 10,
    title: "Honey Mustard Chicken Wings",
    description:
      "Succulent chicken wings tossed in a sweet and tangy honey mustard sauce.",
    price: 7.99,
    img: honeyChicken,
  },
  {
    id: 11,
    title: "Honey Garlic Fried Chicken",
    description:
      "Succulent chicken pieces coated in a sweet and tangy honey garlic sauce, breaded and fried until crispy.",
    price: 10.99,
    img: garlic,
  },
];

export default data;
