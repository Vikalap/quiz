# 🧪 QuizHub - Interactive Quiz Platform

A modern, feature-rich quiz application built with Next.js 15 and React. QuizHub provides an engaging platform for users to take quizzes across multiple categories, track their progress, and challenge their knowledge.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Quiz Categories](#quiz-categories)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

## 🎯 Overview

QuizHub is a comprehensive quiz platform that allows users to:

- Take quizzes across 6 different categories
- Track their performance with detailed results
- Experience real-time quiz taking with timers
- Search and filter quiz categories
- View detailed answer explanations
- Enjoy a beautiful, modern dark-themed UI

## ✨ Features

### Core Features

- **📚 Multiple Quiz Categories**: Physics, Chemistry, Science, History, Math, and General Knowledge
- **⏱️ Real-time Timer**: Countdown timer for each quiz with visual warnings
- **📊 Detailed Results**: Comprehensive score breakdown with answer review
- **🔍 Search Functionality**: Search and filter quiz categories
- **📱 Responsive Design**: Fully responsive across all devices
- **🎨 Modern UI**: Beautiful dark theme with gradient accents
- **⚡ Fast Performance**: Built with Next.js 15 for optimal performance
- **🎯 Progress Tracking**: Visual progress indicators during quiz taking
- **💡 Answer Explanations**: Detailed explanations for each question

### User Interface Features

- **Sidebar Navigation**: Collapsible sidebar with smooth animations
- **Header with Search**: Global search bar in the header
- **Category Cards**: Interactive category cards with hover effects
- **Quiz Interface**: Clean, focused quiz-taking interface
- **Results Dashboard**: Comprehensive results page with statistics

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15.4.6**: React framework with App Router
- **React 18.3**: Latest stable React version
- **TypeScript 5.0**: Type-safe development

### Styling & UI

- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Intelligent Tailwind class merging

### Additional Libraries

- **React Hook Form**: Form state management
- **Sonner**: Toast notifications (ready for use)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quiz
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- **`npm run dev`**: Start development server
- **`npm run build`**: Build for production
- **`npm run start`**: Start production server
- **`npm run lint`**: Run ESLint

## 📚 Quiz Categories

### 1. Physics ⚡
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Speed of light, Newton's laws, electrical resistance, thermodynamics, gravity

### 2. Chemistry 🧪
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Chemical symbols, atomic structure, pH, atmospheric composition, molecular formulas

### 3. Science 🔬
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Human anatomy, biology, photosynthesis, astronomy, geology

### 4. History 🏛️
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Ancient wonders, world wars, space exploration, empires, Renaissance

### 5. Math 📐
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Pi, percentages, square roots, algebra, geometry

### 6. General Knowledge 🌍
- **Difficulty**: Medium
- **Time Limit**: 15 minutes
- **Questions**: 5 questions
- **Topics**: Geography, capitals, time zones, countries, languages

## 📁 Project Structure

```
quiz/
├── app/
│   ├── components/
│   │   ├── home/           # Home page components
│   │   ├── layout/         # Layout components
│   │   ├── quiz/           # Quiz-related components
│   │   ├── providers/      # Context providers
│   │   └── ui/             # UI components
│   ├── about/              # About page
│   ├── categories/         # Categories page
│   ├── contact/            # Contact page
│   ├── news/               # News page
│   ├── quiz/               # Quiz pages
│   │   └── [category]/     # Dynamic quiz category routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── lib/                    # Utility functions and data
│   ├── utils.ts            # Utility functions
│   └── quiz-data.ts        # Quiz database
├── public/                 # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

### Environment Variables

Currently, no environment variables are required. Future features may require:
- API keys for external services
- Database connection strings
- Authentication secrets

---

**Built with ❤️ using Next.js 15**
"# Quiz" 
