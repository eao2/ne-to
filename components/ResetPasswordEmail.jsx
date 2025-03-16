import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';


const ResetPasswordEmail = ({ resetUrl = '', userName = 'User' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Нууц үг сэргээх | NE-TO cargo</Heading>
          <Text style={paragraph}>Сайн уу, {userName}</Text>
          <Text style={paragraph}>
            Та нууц үг сэргээх хүсэлт илгээсэн байна. Доорх товч дээр дарж нууц үгээ сэргээнэ үү:
          </Text>
          <Section style={btnContainer}>
            <Button href={resetUrl} style={button}>
              Нууц үг сэргээх
            </Button>
          </Section>
          <Text style={paragraph}>
            Хэрэв та энэ хүсэлтийг илгээгээгүй бол бидэнд хандана уу.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © {currentYear} NE-TO cargo. Бүх эрх хуулиар хамгаалагдсан.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  margin: '30px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#333',
};

const btnContainer = {
  textAlign: 'center',
  margin: '30px 0',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 20px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center',
};

export default ResetPasswordEmail;
