# 🏥 Arogya Mitra AI - Healthcare AI Assistant

An intelligent healthcare application powered by AI to provide medical insights, diagnoses, first aid guidance, and health outbreak information.

---

## 🎥 Demo Video

Watch our application in action:

[![Demo Video](https://img.youtube.com/vi/GS0ia4vj7R0/maxresdefault.jpg)](https://www.youtube.com/watch?v=GS0ia4vj7R0)

[**Watch Full Demo on YouTube**](https://www.youtube.com/watch?v=GS0ia4vj7R0)

---

## 🚀 Live Application

The application is fully deployed and live:

🔗 **[https://arogya-mitra-ai-drab.vercel.app/](https://arogya-mitra-ai-drab.vercel.app/)**

---

## ✨ Features

- **📋 Medical Report Analysis** - AI-powered analysis of medical reports and symptoms
- **🔬 Disease Diagnosis** - Intelligent diagnosis system based on symptoms
- **🆘 First Aid Guidelines** - Quick first aid instructions for common medical emergencies
- **🌍 Health Outbreaks** - Track and monitor ongoing health outbreaks globally
- **🏥 Hospital Locator** - Find nearby hospitals and medical facilities
- **👤 User Profile** - Personalized user profiles with medical history
- **📊 Health History** - Keep track of past diagnoses and health records
- **🌐 Multi-language Support** - Support for multiple languages (i18n)
- **📱 Responsive Design** - Mobile-friendly and accessible interface
- **🎨 Modern UI** - Beautiful animations and intuitive user experience

---

## 🛠 Tech Stack

- **Frontend Framework:** [Next.js 14](https://nextjs.org/) with TypeScript
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Styling:** Tailwind CSS with PostCSS
- **Animation:** Custom animations and modal components
- **AI Integration:** OpenAI/Claude API for intelligent analysis
- **Build Tool:** TypeScript, ESLint for code quality
- **Deployment:** Vercel

---

## 📁 File Structure

```
sehat-ai/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles
│   │   ├── api/                      # Backend API routes
│   │   │   ├── analyze-report/       # Medical report analysis endpoint
│   │   │   ├── diagnose/             # Diagnosis endpoint
│   │   │   └── first-aid/            # First aid endpoint
│   │   └── app/                      # Main application pages
│   │       ├── layout.tsx            # App layout
│   │       ├── page.tsx              # Dashboard
│   │       ├── report/               # Medical report submission
│   │       ├── result/               # Analysis results
│   │       ├── diagnose/             # Diagnosis tool
│   │       ├── first-aid/            # First aid guidance
│   │       ├── hospitals/            # Hospital finder
│   │       ├── outbreaks/            # Health outbreak tracker
│   │       ├── history/              # User health history
│   │       └── profile/              # User profile
│   ├── components/
│   │   ├── LandingPage.tsx           # Landing page component
│   │   ├── Appsidebar.tsx            # Navigation sidebar
│   │   ├── DeveloperCard.tsx         # Developer info card
│   │   └── ui/                       # Reusable UI components
│   │       ├── animated-modal.tsx    # Animated modal component
│   │       ├── button.tsx            # Button component
│   │       ├── input.tsx             # Input field component
│   │       ├── textarea.tsx          # Text area component
│   │       ├── badge.tsx             # Badge component
│   │       └── separator.tsx         # Separator component
│   ├── lib/
│   │   ├── ai.ts                     # AI integration utilities
│   │   ├── conditions.ts             # Medical conditions database
│   │   ├── outbreaks.ts              # Outbreak data utilities
│   │   ├── utils.ts                  # General utilities
│   │   └── i18n.ts                   # Internationalization
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── public/                           # Static assets
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/sehat-ai.git
cd sehat-ai
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with your API keys:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
OPENAI_API_KEY=your_api_key_here
# Add other environment variables as needed
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your application running.

---

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint to check code quality

---

## 🔌 API Routes

### Analyze Report

- **Endpoint:** `/api/analyze-report`
- **Method:** POST
- **Description:** Analyzes medical reports and provides AI-powered insights

### Diagnose

- **Endpoint:** `/api/diagnose`
- **Method:** POST
- **Description:** Provides diagnosis suggestions based on symptoms

### First Aid

- **Endpoint:** `/api/first-aid`
- **Method:** POST
- **Description:** Provides first aid instructions for medical emergencies

---

## 🎨 Components Overview

### UI Components (`src/components/ui/`)

- **animated-modal.tsx** - Modal component with smooth animations
- **button.tsx** - Reusable button component with variants
- **input.tsx** - Input field with styling and validation
- **textarea.tsx** - Text area for longer text input
- **badge.tsx** - Badge component for labels and tags
- **separator.tsx** - Visual separator component

### Main Components (`src/components/`)

- **LandingPage.tsx** - Hero section and feature showcase
- **Appsidebar.tsx** - Navigation sidebar with menu items
- **DeveloperCard.tsx** - Developer information cards

---

## 🌍 Internationalization (i18n)

The application supports multiple languages through the i18n configuration in `src/lib/i18n.ts`. Add translations for different languages to support users worldwide.

---

## 🚀 Deployment

The application is deployed on **Vercel** and can be accessed at:
🔗 [https://arogya-mitra-ai-drab.vercel.app/](https://arogya-mitra-ai-drab.vercel.app/)

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy with a single click

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)

---

## 👥 Team & Contributors

See [developers page](/developers) for information about the development team.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💬 Support

For issues, suggestions, or feedback, please open an issue on GitHub or contact the development team.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com/)
- AI powered by OpenAI

---

**Made with ❤️ for healthcare innovation**
