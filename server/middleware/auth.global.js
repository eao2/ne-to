// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// // Pages that require login
// const protectedPages = ['/dashboard', '/profile', '/settings']; 
// // Pages that are public
// const publicPages = ['/login', '/register', '/'];

// export default defineEventHandler(async (event) => {
//   const currentPath = getRequestURL(event).pathname;

//   // Skip JWT check for public pages
//   if (publicPages.includes(currentPath)) {
//     return;
//   }

//   // Only run JWT check for protected pages
//   if (protectedPages.includes(currentPath)) {
//     const authHeader = getHeader(event, 'authorization');
//     const { res } = event.node;

//     if (authHeader) {
//       try {
//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, JWT_SECRET);

//         // Save decoded user in context
//         event.context.user = decoded;
//         return;
//       } catch (err) {
//         // Invalid token → redirect to login
//         res.statusCode = 302;
//         res.setHeader('Location', '/login');
//         res.end();
//         return;
//       }
//     } else {
//       // No token → redirect to login
//       res.statusCode = 302;
//       res.setHeader('Location', '/login');
//       res.end();
//       return;
//     }
//   }

//   // Non-protected pages → just pass through
//   event.context.user = null;
// });


import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// API paths that require login
const protectedApiPrefixes = [
  '/api/account',
  '/api/cargo',
  '/api/delivery',
  '/api/delivery-address'
];

export default defineEventHandler((event) => {
  const currentPath = getRequestURL(event).pathname;

  // Only protect matching API routes
  const isProtectedApi = protectedApiPrefixes.some(prefix =>
    currentPath === prefix || currentPath.startsWith(prefix + '/')
  );

  if (!isProtectedApi) {
    // Not a protected route → skip
    return;
  }

  const authHeader = getHeader(event, 'authorization');

  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Save user in context
      event.context.user = decoded;
      return;
    } catch (err) {
      return { status: 401, success: false, message: 'Unauthorized' };
    }
  } else {
    return { status: 401, success: false, message: 'Unauthorized' };
  }
});
