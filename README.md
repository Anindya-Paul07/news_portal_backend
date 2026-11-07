# News Portal Backend API

A modern, production-ready REST API for a bilingual (English & Bangla) news portal built with
Express.js and PostgreSQL. This backend powers a full-featured news platform with advanced content
management, user roles, analytics, and advertisement tracking.

## 🚀 Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control (RBAC)
- 📰 **Article Management** - Full CRUD with bilingual support, featured/breaking/trending flags
- 📂 **Category Management** - Hierarchical category structure with parent-child relationships
- 📢 **Advertisement System** - Complete ad management with impression/click tracking
- 📁 **Media Management** - File upload system with metadata and organization
- 📊 **Dashboard Analytics** - Real-time statistics and insights
- 🌐 **Bilingual Content** - Native support for English and Bangla
- 🔒 **Enterprise Security** - Helmet, rate limiting, input sanitization, SQL injection protection
- 📱 **RESTful API** - Clean, well-documented endpoints with consistent response format
- 🎯 **Advanced Querying** - Filtering, sorting, pagination, and search capabilities

## 👥 User Roles & Permissions

| Role            | Permissions                                                        |
| --------------- | ------------------------------------------------------------------ |
| **Super Admin** | Full system access, user management, system settings               |
| **Admin**       | Manage all content, users (except super admins), and site settings |
| **Journalist**  | Create and manage own articles, view analytics                     |
| **Reader**      | Public access (no authentication required)                         |

## 🛠️ Tech Stack

| Category             | Technology                  |
| -------------------- | --------------------------- |
| **Runtime**          | Node.js v22.x               |
| **Framework**        | Express.js 4.x              |
| **Database**         | PostgreSQL 18+              |
| **ORM**              | Prisma 5.x                  |
| **Authentication**   | JWT (JSON Web Tokens)       |
| **File Upload**      | Multer                      |
| **Validation**       | Express-validator           |
| **Security**         | Helmet, CORS, Rate Limiting |
| **Containerization** | Docker & Docker Compose     |

## 📁 Project Structure

```text
backend/
├── prisma/
│   ├── schema.prisma              # Database schema with all models
│   └── migrations/                # Database migrations
│       └── 20240701000000_init/
├── src/
│   ├── config/
│   │   ├── database.js            # Prisma client initialization
│   │   ├── constants.js           # App-wide constants
│   │   └── multer.js              # File upload configuration
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication & authorization
│   │   ├── errorHandler.js        # Global error handling
│   │   ├── notFound.js            # 404 handler
│   │   ├── rateLimiter.js         # Rate limiting
│   │   └── validate.js            # Request validation
│   ├── modules/
│   │   ├── auth/                  # Login, logout, token refresh
│   │   ├── users/                 # User management
│   │   ├── articles/              # Article CRUD & queries
│   │   ├── categories/            # Category management
│   │   ├── advertisements/        # Ad management & tracking
│   │   ├── media/                 # File upload & management
│   │   └── dashboard/             # Analytics & statistics
│   ├── database/
│   │   └── seeders/
│   │       └── adminSeeder.js     # Initial super admin creation
│   ├── utils/
│   │   ├── asyncHandler.js        # Async error wrapper
│   │   ├── queryUtils.js          # Query builders
│   │   ├── responseUtils.js       # Standardized responses
│   │   ├── slugUtils.js           # Slug generation
│   │   └── tokenUtils.js          # JWT utilities
│   └── server.js                  # App entry point
├── uploads/                       # User-uploaded files
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── docker-compose.yml            # Docker setup
├── Dockerfile                    # Container image
├── package.json                  # Dependencies
├── postman_collection.json       # API testing collection
└── README.md                     # This file
```

## 🗄️ Database Schema

### Entity Relationship Diagram

```text
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────────┐
│      User       │         │     Article      │         │      Category       │
├─────────────────┤         ├──────────────────┤         ├─────────────────────┤
│ id (PK)         │────────>│ authorId (FK)    │     ┌──>│ id (PK)             │
│ name            │ 1     * │ categoryId (FK)  │─────┘   │ nameEn              │
│ email (unique)  │         │ titleEn          │      *  │ nameBn              │
│ password        │         │ titleBn          │    ┌────│ parentId (FK)       │
│ role (enum)     │         │ contentEn        │    │ 1  │ slug (unique)       │
│ avatar          │         │ contentBn        │    │    │ descriptionEn/Bn    │
│ phone           │         │ slug (unique)    │    │    │ image               │
│ bio             │         │ excerptEn/Bn     │    │    │ order               │
│ isActive        │         │ featuredImage    │    │    │ isActive            │
│ isEmailVerified │         │ gallery          │    │    │ showInMenu          │
│ lastLogin       │         │ tags             │    │    │ metaTitleEn/Bn      │
│ refreshToken    │         │ status (enum)    │    └────│ metaDescriptionEn/Bn│
│ createdAt       │         │ publishedAt      │         └─────────────────────┘
│ updatedAt       │         │ scheduledAt      │                  │
└─────────────────┘         │ isFeatured       │           parent-child
       │                    │ isBreaking       │           self-join (*)
       │ 1                  │ isTrending       │
       │                    │ views            │
       │                    │ likes            │
       │                    │ shares           │
       │                    │ readTime         │
       │                    │ metaTitleEn/Bn   │
       │                    │ allowComments    │
       │                    │ createdAt        │
       │                    │ updatedAt        │
       │                    └──────────────────┘
       │ *
       v
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────────────────┐
│      Media      │         │   Advertisement      │         │   AdvertisementCategory     │
├─────────────────┤         ├──────────────────────┤         ├─────────────────────────────┤
│ id (PK)         │         │ id (PK)              │────┐    │ advertisementId (PK,FK)     │
│ filename        │         │ name                 │    │ *  │ categoryId (PK,FK)          │
│ originalName    │         │ titleEn/titleBn      │    └───>└─────────────────────────────┘
│ url             │         │ descriptionEn/Bn     │              │ (Join Table)
│ type (enum)     │         │ type (enum)          │              │
│ mimeType        │         │ position (enum)      │              v
│ size            │         │ image (json)         │         ┌─────────────────────┐
│ width/height    │         │ linkUrl              │         │      Category       │
│ duration        │         │ openInNewTab         │         └─────────────────────┘
│ altEn/altBn     │         │ startDate            │              * many-to-many
│ captionEn/Bn    │         │ endDate              │
│ uploadedById(FK)│         │ isActive             │
│ folder          │         │ priority             │
│ tags[]          │         │ displayPages[]       │
│ isPublic        │         │ impressions          │
│ cloudinaryId    │         │ clicks               │
│ createdAt       │         │ client (json)        │
│ updatedAt       │         │ createdAt            │
└─────────────────┘         │ updatedAt            │
                            └──────────────────────┘
```

### Models Overview

#### User

Authentication and user management with role-based access.

- **Roles**: `super_admin`, `admin`, `journalist`, `reader`
- **Key Fields**: id, name, email (unique), password (hashed), role, avatar, isActive
- **Relations**: articles (1:many), media (1:many)

#### Category

Hierarchical content organization with unlimited nesting.

- **Features**: Self-referential parent-child relationships, bilingual support
- **Key Fields**: id, nameEn, nameBn, slug (unique), parentId, order, isActive, showInMenu
- **Relations**: parent (many:1), children (1:many), articles (1:many), advertisements (many:many)

#### Article

News content with rich metadata and bilingual support.

- **Status Values**: `draft`, `published`, `archived`, `scheduled`
- **Special Flags**: isFeatured, isBreaking, isTrending
- **Tracking**: views, likes, shares, readTime
- **Key Fields**: titleEn/Bn, contentEn/Bn, slug (unique), featuredImage, gallery, tags, status
- **Relations**: author (many:1 User), category (many:1 Category)

#### Advertisement

Ad management with scheduling and performance tracking.

- **Ad Types**: `banner`, `sidebar`, `in_content`, `popup`
- **Positions**: `top`, `middle`, `bottom`, `sidebar_top`, `sidebar_middle`, `sidebar_bottom`
- **Scheduling**: startDate, endDate (date-range based display)
- **Tracking**: impressions (views), clicks
- **Key Fields**: name, titleEn/Bn, type, position, image, linkUrl, priority, displayPages[]
- **Relations**: categories (many:many via AdvertisementCategory join table)

#### Media

File management with metadata and organization.

- **Media Types**: `image`, `video`, `document`
- **Metadata**: filename, url, mimeType, size, dimensions (width/height), duration
- **Organization**: folder, tags[], isPublic
- **Bilingual**: altEn/Bn, captionEn/Bn
- **Relations**: uploadedBy (many:1 User)

#### AdvertisementCategory (Join Table)

Many-to-many relationship between Advertisements and Categories.

- **Composite Primary Key**: [advertisementId, categoryId]
- **Purpose**: Associates ads with specific content categories for targeted display

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- PostgreSQL >= 18.0
- npm or yarn

### Local Development Setup

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd news-portal/backend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Configure Environment

Create `.env` file in the backend root:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database (PostgreSQL)
DATABASE_URL=postgresql://news_portal_user:d123@localhost:5432/news_portal?schema=public

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Super Admin Credentials (for seeding)
SUPER_ADMIN_EMAIL=admin@newsportal.com
SUPER_ADMIN_PASSWORD=Admin@12345
```

#### Step 4: Setup PostgreSQL Database

Choose one of the following options:

##### Option A: Local PostgreSQL

```powershell
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE news_portal;

# Create user with privileges
CREATE USER news_portal_user WITH PASSWORD 'd123';
GRANT ALL PRIVILEGES ON DATABASE news_portal TO news_portal_user;

# Exit psql
\q
```

##### Option B: Docker PostgreSQL

```bash
docker run --name news-portal-db \
  -e POSTGRES_DB=news_portal \
  -e POSTGRES_USER=news_portal_user \
  -e POSTGRES_PASSWORD=d123 \
  -p 5432:5432 \
  -d postgres:18
```

#### Step 5: Run Database Migrations

Apply the schema to your database:

```bash
npx prisma migrate deploy
```

#### Step 6: Create Uploads Directory

```bash
mkdir uploads
```

#### Step 7: Seed the Database

Creates super admin user and default categories:

```bash
npm run seed
```

**Default Credentials:**

- Email: `admin@newsportal.com`
- Password: `Admin@12345`

#### Step 8: Start Development Server

```bash
npm run dev
```

The API will be available at: `http://localhost:5000`

### Docker Deployment

The project includes Docker support with isolated PostgreSQL container (port 5434 by default).

#### Step 1: Configure Docker Environment

Ensure `.env` has Docker-compatible settings:

```env
DATABASE_URL=postgresql://news_portal_user:d123@localhost:5434/news_portal?schema=public
BACKEND_DB_PORT=5434
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

#### Step 2: Start with Docker Compose

```bash
docker compose up -d --build
```

The production image generates Prisma Client during the build and runs `prisma migrate deploy` on each container startup before starting the API. Only pending migrations are applied; if a migration fails, the API does not start. Seeding remains a manual operation.

For subsequent VPS deployments, push the schema and migration files along with the application code, then run:

```bash
git pull
docker compose up -d --build
docker compose logs --tail=50 app
```

The optional `authorName` and `authorPhoto` migration preserves existing articles, initially leaving both fields `null`. Existing articles can be edited to set or clear these fields; empty values retain the frontend's default author display.

#### Step 3: Seed Database (Optional)

Run seeder inside container:

```bash
docker compose exec app npm run seed
```

The API will be available on `http://localhost:5000` (or the port you set via `PORT`).

### Local-Only Docker Stack

If you just want to spin up the backend plus a database for local development/testing, use the lightweight `Dockerfile.local` + `docker-compose.local.yml` combo:

1. Create/update your `.env` file (same vars as the non-docker workflow). When running commands **on the host**, Prisma should point at `postgresql://news_portal_user:d123@localhost:5434/news_portal?schema=public`. The container automatically overrides this to talk to `backend-db` internally.
2. Start the stack:

   ```bash
   docker compose -f docker-compose.local.yml up --build
   ```

   - API lives on `http://localhost:5000` (override with `PORT` in `.env`).
   - Postgres is forwarded to `localhost:5434`.
   - The codebase is bind-mounted into the container and `npm run dev` is used, so changes on the host hot-reload automatically.
   - On the first boot the container runs `npm ci`, `prisma generate`, and `prisma migrate deploy` before starting.

3. (Optional) Seed the DB once it is healthy:

   ```bash
   docker compose -f docker-compose.local.yml exec backend-app npm run seed
   ```

To stop everything: `docker compose -f docker-compose.local.yml down` (add `-v` if you want to drop the Postgres/node_modules volumes).

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/change-password` - Change password
- `PUT /api/v1/auth/profile` - Update profile

### Users (Admin Only)

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `GET /api/v1/users/stats` - Get user statistics

### Articles

- `GET /api/v1/articles` - Get all articles (public)
- `GET /api/v1/articles/:identifier` - Get single article
- `POST /api/v1/articles` - Create article (Auth required)
- `PUT /api/v1/articles/:id` - Update article (Auth required)
- `DELETE /api/v1/articles/:id` - Delete article (Auth required)
- `GET /api/v1/articles/featured/list` - Get featured articles
- `GET /api/v1/articles/breaking/list` - Get breaking news
- `GET /api/v1/articles/trending/list` - Get trending articles
- `GET /api/v1/articles/latest/list` - Get latest articles
- `GET /api/v1/articles/search/query` - Search articles
- `GET /api/v1/articles/:id/related` - Get related articles

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:identifier` - Get single category
- `POST /api/v1/categories` - Create category (Admin)
- `PUT /api/v1/categories/:id` - Update category (Admin)
- `DELETE /api/v1/categories/:id` - Delete category (Admin)
- `GET /api/v1/categories/tree/all` - Get category tree
- `GET /api/v1/categories/menu/list` - Get menu categories
- `GET /api/v1/categories/:identifier/articles` - Get category articles

### Advertisements

- `GET /api/v1/advertisements` - Get all ads (Admin)
- `GET /api/v1/advertisements/active` - Get active ads (Public)
- `GET /api/v1/advertisements/:id` - Get single ad (Admin)
- `POST /api/v1/advertisements` - Create ad (Admin)
- `PUT /api/v1/advertisements/:id` - Update ad (Admin)
- `DELETE /api/v1/advertisements/:id` - Delete ad (Admin)
- `POST /api/v1/advertisements/:id/impression` - Track impression
- `POST /api/v1/advertisements/:id/click` - Track click

### Media

- `GET /api/v1/media` - Get all media (Auth required)
- `GET /api/v1/media/:id` - Get single media
- `POST /api/v1/media/upload` - Upload single file
- `POST /api/v1/media/upload/multiple` - Upload multiple files
- `PUT /api/v1/media/:id` - Update media metadata
- `DELETE /api/v1/media/:id` - Delete media

### Dashboard (Admin Only)

- `GET /api/v1/dashboard/overview` - Get overview statistics
- `GET /api/v1/dashboard/articles/stats` - Get article statistics
- `GET /api/v1/dashboard/articles/top` - Get top articles
- `GET /api/v1/dashboard/categories/distribution` - Category distribution
- `GET /api/v1/dashboard/users/activity` - User activity
- `GET /api/v1/dashboard/traffic/trends` - Traffic trends

## Default Credentials

After running the seeder:

- **Email**: admin@newsportal.com
- **Password**: Admin@12345

⚠️ **IMPORTANT**: Change the password after first login!

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- Prisma-powered SQL injection protection
- XSS protection

## Development

### Running in Development Mode

```bash
curl http://localhost:5000/api/v1/advertisements/active?type=banner&position=top
```

## 📝 Environment Variables

| Variable             | Description                          | Default                 | Required    |
| -------------------- | ------------------------------------ | ----------------------- | ----------- |
| NODE_ENV             | Environment (development/production) | development             | No          |
| PORT                 | Server port                          | 5000                    | No          |
| DATABASE_URL         | PostgreSQL connection string         | -                       | Yes         |
| JWT_SECRET           | Secret for JWT signing               | -                       | Yes         |
| JWT_EXPIRE           | Token expiration time                | 7d                      | No          |
| FRONTEND_URL         | Frontend URL for CORS                | `http://localhost:3000` | No          |
| SUPER_ADMIN_EMAIL    | Super admin email for seeding        | -                       | For seeding |
| SUPER_ADMIN_PASSWORD | Super admin password for seeding     | -                       | For seeding |
| BACKEND_DB_PORT      | Docker PostgreSQL port               | 5434                    | For Docker  |

## 🔒 Security Features

- **Helmet.js**: HTTP headers security
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Express-validator for request validation
- **SQL Injection Protection**: Prisma parameterized queries
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **Role-Based Access**: Authorization middleware

## 📊 Database Management

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database (dev only - deletes all data!)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Backup & Restore

```bash
# Backup database
pg_dump -U news_portal_user -h localhost -p 5432 news_portal > backup.sql

# Restore database
psql -U news_portal_user -h localhost -p 5432 news_portal < backup.sql
```

## 🚀 Deployment

### Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Change default super admin credentials
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database URL
- [ ] Set up proper CORS origins
- [ ] Configure file upload limits
- [ ] Set up database backups
- [ ] Configure proper logging
- [ ] Set up monitoring (PM2, etc.)
- [ ] Use HTTPS in production
- [ ] Set up rate limiting based on load
- [ ] Review and update security headers

### PM2 Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start src/server.js --name news-portal-api

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## 📚 Project Documentation

| Document                  | Description                                |
| ------------------------- | ------------------------------------------ |
| `README.md`               | Complete setup and usage guide (this file) |
| `API_DOCUMENTATION.md`    | Detailed API endpoint documentation        |
| `DATABASE_SCHEMA.md`      | Database schema with ER diagrams           |
| `ARTICLE_SEEDING.md`      | Article seeding guide                      |
| `CORS_FIX.md`             | CORS configuration and troubleshooting     |
| `postman_collection.json` | Postman collection for API testing         |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Support

For issues and questions:

- Check `API_DOCUMENTATION.md` for detailed API usage
- Review Postman collection for example requests
- Check Prisma schema for database structure

## 🔄 Changelog

### v1.0.0 (Current)

- Initial release
- Complete CRUD operations for all entities
- JWT authentication with role-based access
- Bilingual support (English & Bangla)
- File upload system
- Dashboard analytics
- Advertisement tracking
- PostgreSQL with Prisma ORM
- Docker support
