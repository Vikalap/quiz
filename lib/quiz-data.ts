export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimit: number;
  questions: Question[];
  gradient: string;
}

export const quizData: Record<string, QuizCategory> = {
  physics: {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    description: "Test your knowledge of physics principles and laws",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-blue-600 to-cyan-600",
    questions: [
      {
        id: 1,
        question: "What is the speed of light in a vacuum?",
        options: [
          "300,000 km/s",
          "150,000 km/s",
          "450,000 km/s",
          "200,000 km/s"
        ],
        correctAnswer: 0,
        explanation: "The speed of light in a vacuum is approximately 299,792,458 meters per second, which is approximately 300,000 km/s. This is a fundamental constant in physics."
      },
      {
        id: 2,
        question: "What is Newton's first law of motion?",
        options: [
          "F = ma",
          "An object at rest stays at rest, and an object in motion stays in motion",
          "For every action, there is an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: 1,
        explanation: "Newton's first law, also known as the law of inertia, states that an object at rest will remain at rest, and an object in motion will continue in motion at a constant velocity, unless acted upon by an external force."
      },
      {
        id: 3,
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 2,
        explanation: "The unit of electrical resistance is the Ohm (Ω), named after German physicist Georg Simon Ohm. It measures how much a material opposes the flow of electric current."
      },
      {
        id: 4,
        question: "What is the first law of thermodynamics?",
        options: [
          "Energy cannot be created or destroyed, only transformed",
          "Entropy always increases",
          "Temperature is proportional to kinetic energy",
          "Pressure and volume are inversely proportional"
        ],
        correctAnswer: 0,
        explanation: "The first law of thermodynamics states that energy cannot be created or destroyed, only converted from one form to another. This is also known as the law of conservation of energy."
      },
      {
        id: 5,
        question: "What force keeps planets in orbit around the sun?",
        options: ["Magnetic force", "Gravitational force", "Electric force", "Nuclear force"],
        correctAnswer: 1,
        explanation: "Gravitational force, as described by Newton's law of universal gravitation and Einstein's general theory of relativity, keeps planets in orbit around the sun."
      }
    ]
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    description: "Explore chemical reactions and molecular structures",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-green-600 to-emerald-600",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum' meaning gold. Ag is silver (argentum)."
      },
      {
        id: 2,
        question: "How many protons does a carbon atom have?",
        options: ["6", "12", "14", "8"],
        correctAnswer: 0,
        explanation: "A carbon atom has 6 protons in its nucleus. The atomic number of carbon is 6, which determines the number of protons."
      },
      {
        id: 3,
        question: "What is the pH of pure water at 25°C?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "Pure water at 25°C has a pH of 7, which is considered neutral. pH values below 7 are acidic, and above 7 are basic."
      },
      {
        id: 4,
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2,
        explanation: "Nitrogen is the most abundant gas in Earth's atmosphere, making up approximately 78% of the air we breathe. Oxygen makes up about 21%."
      },
      {
        id: 5,
        question: "What is the molecular formula for water?",
        options: ["H2O", "H2O2", "CO2", "NaCl"],
        correctAnswer: 0,
        explanation: "The molecular formula for water is H2O, meaning it consists of two hydrogen atoms bonded to one oxygen atom."
      }
    ]
  },
  science: {
    id: "science",
    name: "Science",
    icon: "🔬",
    description: "General science knowledge across multiple disciplines",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-purple-600 to-pink-600",
    questions: [
      {
        id: 1,
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Lungs", "Skin", "Intestines"],
        correctAnswer: 2,
        explanation: "The skin is the largest organ in the human body, covering the entire external surface and accounting for about 15% of total body weight."
      },
      {
        id: 2,
        question: "How many bones are in an adult human body?",
        options: ["196", "206", "216", "226"],
        correctAnswer: 1,
        explanation: "An adult human body typically has 206 bones. Babies are born with around 270 bones, but many fuse together as they grow."
      },
      {
        id: 3,
        question: "What process do plants use to convert sunlight into energy?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        correctAnswer: 1,
        explanation: "Photosynthesis is the process by which plants convert light energy, usually from the sun, into chemical energy stored in glucose molecules."
      },
      {
        id: 4,
        question: "What is the closest planet to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correctAnswer: 2,
        explanation: "Mercury is the closest planet to the Sun in our solar system, with an average distance of about 58 million kilometers."
      },
      {
        id: 5,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Quartz"],
        correctAnswer: 1,
        explanation: "Diamond is the hardest natural substance on Earth, rating 10 on the Mohs scale of mineral hardness."
      }
    ]
  },
  history: {
    id: "history",
    name: "History",
    icon: "🏛️",
    description: "Journey through significant historical events",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-amber-600 to-orange-600",
    questions: [
      {
        id: 1,
        question: "Which ancient wonder of the world was located in Alexandria?",
        options: [
          "Hanging Gardens",
          "Colossus of Rhodes",
          "Lighthouse of Alexandria",
          "Temple of Artemis"
        ],
        correctAnswer: 2,
        explanation: "The Lighthouse of Alexandria, also known as the Pharos of Alexandria, was one of the Seven Wonders of the Ancient World and was located in Alexandria, Egypt."
      },
      {
        id: 2,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        explanation: "World War II ended in 1945. The war in Europe ended on May 8, 1945 (V-E Day), and the war in the Pacific ended on September 2, 1945 (V-J Day)."
      },
      {
        id: 3,
        question: "Who was the first person to walk on the moon?",
        options: [
          "Buzz Aldrin",
          "Neil Armstrong",
          "Michael Collins",
          "John Glenn"
        ],
        correctAnswer: 1,
        explanation: "Neil Armstrong was the first person to walk on the moon on July 20, 1969, during the Apollo 11 mission. His famous words were: 'That's one small step for man, one giant leap for mankind.'"
      },
      {
        id: 4,
        question: "Which empire was ruled by Julius Caesar?",
        options: [
          "Greek Empire",
          "Roman Empire",
          "Byzantine Empire",
          "Ottoman Empire"
        ],
        correctAnswer: 1,
        explanation: "Julius Caesar was a key figure in the Roman Empire. He was a military general and statesman who played a critical role in the events that led to the demise of the Roman Republic and the rise of the Roman Empire."
      },
      {
        id: 5,
        question: "When did the Renaissance period begin?",
        options: [
          "12th century",
          "14th century",
          "16th century",
          "18th century"
        ],
        correctAnswer: 1,
        explanation: "The Renaissance period began in the 14th century in Italy and spread throughout Europe, marking a cultural rebirth and the transition from the Middle Ages to modernity."
      }
    ]
  },
  math: {
    id: "math",
    name: "Math",
    icon: "📐",
    description: "Challenge your mathematical skills",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-red-600 to-pink-600",
    questions: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.15", "3.16", "3.13"],
        correctAnswer: 0,
        explanation: "Pi (π) is approximately 3.14159, which rounds to 3.14 when expressed to two decimal places. Pi is the ratio of a circle's circumference to its diameter."
      },
      {
        id: 2,
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correctAnswer: 1,
        explanation: "25% of 80 is calculated as (25/100) × 80 = 0.25 × 80 = 20."
      },
      {
        id: 3,
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        explanation: "The square root of 144 is 12, because 12 × 12 = 144."
      },
      {
        id: 4,
        question: "What is the result of 15 × 8?",
        options: ["100", "110", "120", "130"],
        correctAnswer: 2,
        explanation: "15 × 8 = 120. This can be calculated as (10 × 8) + (5 × 8) = 80 + 40 = 120."
      },
      {
        id: 5,
        question: "What is the area of a circle with radius 5? (Use π = 3.14)",
        options: ["78.5", "31.4", "15.7", "62.8"],
        correctAnswer: 0,
        explanation: "The area of a circle is π × r². With radius 5, the area is 3.14 × 5² = 3.14 × 25 = 78.5 square units."
      }
    ]
  },
  "general-knowledge": {
    id: "general-knowledge",
    name: "General Knowledge",
    icon: "🌍",
    description: "Test your knowledge across various topics",
    difficulty: "Medium",
    timeLimit: 15,
    gradient: "from-teal-600 to-blue-600",
    questions: [
      {
        id: 1,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2,
        explanation: "Canberra is the capital city of Australia. It was chosen as the capital in 1908 as a compromise between Sydney and Melbourne, the two largest cities."
      },
      {
        id: 2,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, South America, and Australia/Oceania."
      },
      {
        id: 3,
        question: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean"
        ],
        correctAnswer: 3,
        explanation: "The Pacific Ocean is the largest ocean on Earth, covering approximately 63.8 million square miles, which is larger than all the land on Earth combined."
      },
      {
        id: 4,
        question: "In which time zone is New York City located?",
        options: [
          "Pacific Time",
          "Mountain Time",
          "Central Time",
          "Eastern Time"
        ],
        correctAnswer: 3,
        explanation: "New York City is located in the Eastern Time Zone (ET), which is UTC-5 during standard time and UTC-4 during daylight saving time."
      },
      {
        id: 5,
        question: "What is the most spoken language in the world?",
        options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
        correctAnswer: 2,
        explanation: "Mandarin Chinese is the most spoken language in the world by number of native speakers, with over 1 billion speakers."
      }
    ]
  }
};

export const categories = Object.values(quizData);

