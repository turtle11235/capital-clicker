import { randomValue } from "../utils"

export default class Name {
  static readonly firstNames = [
    "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia",
    "James", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper", "Mason", "Camila",
    "Michael", "Gianna", "Ethan", "Abigail", "Daniel", "Luna", "Jacob", "Ella", "Logan", "Elizabeth", "Jackson", "Sofia",
    "Levi", "Emily", "Sebastian", "Avery", "Mateo", "Mila", "Jack", "Scarlett", "Owen", "Eleanor", "Theodore", "Madison",
    "Aiden", "Layla", "Samuel", "Penelope", "Joseph", "Aria", "John", "Chloe", "David", "Grace", "Wyatt", "Ellie",
    "Matthew", "Nora", "Luke", "Hazel", "Asher", "Zoey", "Carter", "Riley", "Julian", "Victoria", "Grayson", "Lily", "Leo",
    "Aurora", "Jayden", "Violet", "Gabriel", "Nova", "Isaac", "Hannah", "Lincoln", "Emilia", "Anthony", "Zoe", "Hudson",
    "Stella", "Dylan", "Everly", "Ezra", "Isla", "Thomas", "Leah", "Charles", "Lillian", "Christopher", "Addison", "Jax",
    "Willow", "Maverick", "Lucy", "Josiah", "Paisley", "Isaiah", "Natalie", "Andrew", "Naomi", "Elias", "Eliana", "Joshua",
    "Brooklyn", "Nathan", "Elena", "Caleb", "Aubrey", "Ryan", "Claire", "Adrian", "Ivy", "Miles", "Kinsley", "Eli",
    "Audrey", "Nolan", "Maya", "Christian", "Genesis", "Aaron", "Skylar", "Cameron", "Bella", "Ezekiel", "Aaliyah",
    "Colton", "Madelyn", "Luca", "Savannah", "Landon", "Anna", "Hunter", "Delilah", "Jonathan", "Serenity", "Santiago",
    "Caroline", "Axel", "Kennedy", "Emerson", "Valentina", "Cooper", "Ruby", "Jeremiah", "Sophie", "Angel", "Alice", "Roman",
    "Gabriella", "Connor", "Sadie", "Jameson", "Ariana", "Robert", "Allison", "Greyson", "Hailey", "Jordan", "Autumn",
    "Ian", "Nevaeh", "Carson", "Natalia", "Jaxson", "Quinn", "Leonardo", "Josephine", "Nicholas", "Sarah", "Dominic",
    "Cora", "Austin", "Emery", "Everett", "Samantha", "Brooks", "Piper", "Xavier", "Leilani", "Kai", "Eva", "Jose",
    "Everleigh", "Parker", "Madeline", "Adam", "Lydia", "Jace", "Jade", "Wesley", "Peyton", "Kayden", "Brielle", "Silas",
    "Adeline", "Emrys"
  ]

  static readonly lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark",
    "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott",
    "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips",
    "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan",
    "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray",
    "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson",
    "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons",
    "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes"
  ]

  static getName() {
    return randomValue(Name.firstNames) + " " + randomValue(Name.lastNames)
  }
}