// Success with data
export const successResponse = <T>(
  message: string,
  data: T,
  statusCode = 200,
) => ({
  success: true,
  statusCode,
  message,
  data,
});

// Success without data (e.g. delete, logout)
export const successMessageResponse = (
  message: string,
  statusCode = 200,
) => ({
  success: true,
  statusCode,
  message,
});

// Paginated response (e.g. GET /menus?skip=0&take=10)
export const paginatedResponse = <T>(
  message: string,
  data: T[],
  meta: {
    total: number;
    skip: number;
    take: number;
  },
  statusCode = 200,
) => ({
  success: true,
  statusCode,
  message,
  data,
  meta: {
    total: meta.total,
    skip: meta.skip,
    take: meta.take,
    hasMore: meta.skip + meta.take < meta.total,
  },
});

// Error response (for custom exceptions or filters)
export const errorResponse = (
  message: string,
  statusCode = 400,
  errors?: any,
) => ({
  success: false,
  statusCode,
  message,
  ...(errors && { errors }),
});