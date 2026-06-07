import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getApiInfo(): any {
    const appName = this.configService.get<string>('APP_NAME');
    return {
      createdBy: 'Rasheed Olatunde (geodevcodes)',
      api: appName,
      status: 'operational',
      docs: {
        postman: 'https://documenter.getpostman.com/view/24857759/2sBXwjxET6',
        'API Health Check': `${process.env.BACKEND_URL}/health`,
      },
      environment: process.env.NODE_ENV,
      version: '1.0.0',
      uptime: process.uptime(),
      message:
        'Hey there! 👋 Welcome to Total Health API. You are not lost — this is the root endpoint.',
    };
  }

  getWelcomeMessage(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Total Health API</title>

      <style>
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          background: #0b0f19;
          color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container {
          max-width: 800px;
          padding: 40px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 6px 12px;
          background: #1f2937;
          border-radius: 999px;
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        p {
          color: #9ca3af;
          font-size: 16px;
          margin-bottom: 30px;
        }

        .buttons a {
          display: inline-block;
          margin: 8px;
          padding: 12px 18px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
        }

        .primary {
          background: #3b82f6;
          color: white;
        }

        .secondary {
          background: #111827;
          border: 1px solid #374151;
          color: #e5e7eb;
        }

        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="badge">🚀 API v1 • Operational</div>

        <h1>Total Health API</h1>

        <p>
          Welcome to the official Total Health API. You are not lost — this is the root endpoint.
          Everything starts here.
        </p>

        <div class="buttons">
          <a class="primary" href="https://documenter.getpostman.com/view/24857759/2sBXwjxET6">View Postman Docs</a>
          <a class="secondary" href="/api/v1/info">API Base</a>
        </div>

        <div class="footer">
          Environment: ${process.env.NODE_ENV ?? 'development'} •
          Uptime: ${process.uptime().toFixed(2)}s
        </div>
      </div>
    </body>
    </html>
    `;
  }
}
