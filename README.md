# Course Gen - AI Masterclass Platform

A professional course-selling platform designed to help users become creators and start earning through AI education. Built with Next.js, TypeScript, and a modern dark red gradient theme.

## 🚀 Features

### User Features
- **Authentication**: Secure signup/login with email/password and Google OAuth
- **Course Browsing**: Browse AI courses with search and filtering
- **Enrollment & Payment**: Secure payment processing and course enrollment
- **Learning Dashboard**: Track progress, access course materials, and view certificates
- **Responsive Design**: Mobile-first design with modern UI/UX

### Admin Features
- **Course Management**: Create, edit, and manage courses
- **User Management**: View and manage user accounts
- **Analytics**: Track sales, enrollments, and revenue
- **Content Management**: Upload videos, documents, and course materials

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS with custom dark red gradient theme
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course-gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/course_gen"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # JWT
   JWT_SECRET="your-jwt-secret-here"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   # Payment Gateway (Stripe)
   STRIPE_SECRET_KEY=""
   STRIPE_PUBLISHABLE_KEY=""
   STRIPE_WEBHOOK_SECRET=""
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
course-gen/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   └── auth/
│   │   │       ├── register/       # User registration
│   │   │       └── [...nextauth]/  # NextAuth configuration
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── courses/                # Course browsing
│   │   ├── dashboard/              # User dashboard
│   │   ├── admin/                  # Admin panel (future)
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Homepage
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   ├── auth/                   # Authentication components
│   │   ├── course/                 # Course-related components
│   │   └── admin/                  # Admin components
│   ├── lib/
│   │   ├── prisma.ts               # Prisma client
│   │   └── auth.ts                 # NextAuth configuration
│   ├── types/
│   │   ├── index.ts                # TypeScript interfaces
│   │   └── next-auth.d.ts          # NextAuth type extensions
│   ├── utils/
│   │   └── index.ts                # Utility functions
│   └── hooks/                      # Custom React hooks
├── prisma/
│   └── schema.prisma               # Database schema
├── public/                         # Static assets
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary**: Dark red gradient (`#dc2626` to `#991b1b`)
- **Background**: Dark gray gradient (`#111827` to `#7f1d1d`)
- **Text**: White and gray variations
- **Accents**: Red, yellow, green for status indicators

### Components
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Gradient Text**: Animated gradient text effects
- **Hover Effects**: Smooth transitions and scale animations
- **Loading States**: Custom spinner with brand colors

## 🔐 Authentication

The platform uses NextAuth.js for authentication with:
- Email/password authentication
- Google OAuth (optional)
- JWT tokens
- Protected routes
- Role-based access control (User/Admin)

## 📊 Database Schema

### Core Models
- **User**: User accounts with roles and profiles
- **Course**: Course information, pricing, and metadata
- **Lesson**: Individual lessons within courses
- **Enrollment**: User course enrollments and progress
- **Progress**: Lesson completion tracking
- **Payment**: Payment records and transactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Railway**: Easy PostgreSQL + Node.js deployment
- **Render**: Free tier available for testing
- **Heroku**: Traditional deployment option

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Database Commands
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Create and run migrations
```

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Course browsing and filtering
- ✅ User dashboard
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Admin dashboard
- 🔄 Payment integration (Stripe)
- 🔄 Video player integration
- 🔄 Course enrollment system

### Phase 3 (Future)
- 📋 Advanced analytics
- 📋 Referral system
- 📋 AI chatbot assistant
- 📋 Mobile app
- 📋 Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/course-gen/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- TailwindCSS for the utility-first CSS framework
- All contributors and beta testers

---

**Course Gen** - Empowering creators through AI education 🚀
