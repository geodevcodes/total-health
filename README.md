<div align="center">
<h1>Total Health API</h1>
<h6><i>Scalable Backend Infrastructure for Digital Health Management</i></h6>
<hr />
</div>

# 🏗️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [Typescript](https://www.typescriptlang.org/)
- **Auth**: [Auth / JWT / Passport](https://www.passportjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/), [Prisma](https://www.prisma.io/)
- **Cloudinary**: [Cloudinary](https://cloudinary.com/)
- **Swagger**: [Swagger Docs](https://swagger.io/)
- **Postman**: [Postman](https://www.postman.com/)
- **Unit Testing** [Unit Testing](https://nextjs.org/docs/app/guides/testing/jest)

# Project setup

### 1. Clone the Repository

```bash
git clone https://github.com/geodevcodes/total-health.git
cd total-health
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root:

```env
# APP CONFIG
NODE_ENV=development
PORT=8080
APP_NAME="TotalHealthAPI"
FRONTEND_URL=https://total-health.vercel.app
BACKEND_URL=https://total-health-server.vercel.app/api/v1
API_DOCUMENTATION=https://documenter.getpostman.com/view/24857759/2sBXwqqqb6

# DATABASE
DATABASE_URL=your_mongodb_connection_string


# JWT SECRET
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN="15m"


# GOOGLE CREDENTIALS
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_REDIRECT_URI=your_google_redirect_uri

# CLOUDINARY CREDENTIALS
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# PAYSTACK PAYMENT CREDENTIALS
PAYSTACK_TEST_SECRET_KEY=your_paystack_test_secret_key
PAYSTACK_TEST_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_LIVE_SECRET_KEY=your_paystack_live_secret_key
PAYSTACK_LIVE_PUBLIC_KEY=your_paystack_live_public_key

```

### 4. Compile and run the Server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Visit [http://localhost:8080](http://localhost:8080) to see your server running!

## 📦 Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📖 API Documentation

Once the app is running, visit [https://documenter.getpostman.com/view/24857759/2sBXwqqqb6](https://documenter.getpostman.com/view/24857759/2sBXwqqqb6) for the Postman UI documentation.

## Support

Total Health is an MIT-licensed open source project. If you'd like to join, please [read more here](https://documenter.getpostman.com/view/24857759/2sBXwqqqb6).

## 🙏 Acknowledgments

- Author - [https://github.com/geodevcodes](https://github.com/geodevcodes)
- Website - [https://geodevcodes.vercel.app](https://geodevcodes.vercel.app)
- Linkedin - [https://www.linkedin.com/in/rasheed-olatunde](https://www.linkedin.com/in/rasheed-olatunde)

## Built by

- [Rasheed Olatunde](https://github.com/geodevcodes) (Software Developer)
