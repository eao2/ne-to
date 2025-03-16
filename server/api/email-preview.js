import ResetPasswordEmail from '../../components/ResetPasswordEmail';
import ReactDOMServer from 'react-dom/server';

export default defineEventHandler(async (event) => {
  try {
    const testData = {
      resetUrl: 'http://localhost:3000/reset-password/test-token',
      userName: 'Test User'
    };

    // Create the React element
    const email = ResetPasswordEmail(testData);
    
    // Render to static markup
    const html = ReactDOMServer.renderToStaticMarkup(email);

    return {
      html,
      success: true
    };
  } catch (error) {
    console.error('Error rendering email template:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to render email template'
    });
  }
}); 