import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Define public routes that don't require authentication
// const publicRoutes = ['/', '/login', '/register', '/about'];

export default defineEventHandler(async (event) => {
  // const currentPath = getRequestURL(event).pathname;

  // Bypass authentication for public routes
  // if (publicRoutes.includes(currentPath)) {
  //   return;
  // }

  const authHeader = getHeader(event, 'authorization');
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      event.context.user = decoded;
      return;
    } catch (err) {
      return err;
    }
  }
  else{
    event.context.user = null;
    return;
  }
});
