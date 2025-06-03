import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
  Typography,
  SelectChangeEvent,
  Box,
} from '@mui/material';

const SampleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
    message?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      role?: string;
      message?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Form is valid, handle submission
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        message: '',
      });
    }
  };

  return (
    <Card className="transition-all duration-300">
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Contact Form
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate className="space-y-4">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            margin="normal"
          />
          
          <FormControl fullWidth error={!!errors.role} required margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleSelectChange}
              label="Role"
            >
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="designer">Designer</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>
          
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            required
            margin="normal"
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="mt-4 w-full sm:w-auto"
          >
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SampleForm;