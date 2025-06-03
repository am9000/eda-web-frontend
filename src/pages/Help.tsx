import React from 'react';
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import { ChevronDown, MessageCircle, Book, FileQuestion } from 'lucide-react';

const Help = () => {
  const theme = useTheme();

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
    },
    {
      question: 'How can I update my profile information?',
      answer: 'Go to Settings > Profile and click on the Edit button to update your information. Don\'t forget to save your changes.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For business accounts, we also support wire transfers.',
    },
    {
      question: 'How do I export my data?',
      answer: 'Navigate to Settings > Data & Privacy > Export Data. You can select what data you want to export and in what format.',
    },
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Help Center
      </Typography>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Paper
          className="p-6 flex flex-col items-center text-center"
          sx={{ borderRadius: 2 }}
        >
          <MessageCircle size={32} className="mb-4" style={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" gutterBottom>
            Contact Support
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-4">
            Get in touch with our support team for personalized help
          </Typography>
          <Button variant="contained" color="primary">
            Open Support Ticket
          </Button>
        </Paper>

        <Paper
          className="p-6 flex flex-col items-center text-center"
          sx={{ borderRadius: 2 }}
        >
          <Book size={32} className="mb-4" style={{ color: theme.palette.secondary.main }} />
          <Typography variant="h6" gutterBottom>
            Documentation
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-4">
            Browse our detailed documentation and guides
          </Typography>
          <Button variant="outlined" color="secondary">
            View Documentation
          </Button>
        </Paper>
      </div>

      <Paper className="p-6 mb-8" sx={{ borderRadius: 2 }}>
        <div className="flex items-center gap-2 mb-6">
          <FileQuestion size={24} style={{ color: theme.palette.primary.main }} />
          <Typography variant="h5">Frequently Asked Questions</Typography>
        </div>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0}>
            <AccordionSummary expandIcon={<ChevronDown />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="textSecondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Paper className="p-6" sx={{ borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Can't find what you're looking for?
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          Send us a message and we'll get back to you as soon as possible.
        </Typography>
        <div className="space-y-4">
          <TextField
            fullWidth
            label="Your Question"
            multiline
            rows={4}
            variant="outlined"
          />
          <Button variant="contained" color="primary">
            Submit Question
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Help;