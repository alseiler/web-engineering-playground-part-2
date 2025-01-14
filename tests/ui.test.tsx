import { render, screen, fireEvent } from '@testing-library/react';
import Comments from '../src/Comments';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Comments component', () => {
  it('should toggle comments visibility when the button is clicked', () => {
    render(<Comments />);

    const toggleButton = screen.getByText(/show comments/i);
    expect(toggleButton).toBeInTheDocument();

    // Initially, comments should not be visible
    const commentsSection = screen.queryByText(/add comment/i);
    expect(commentsSection).not.toBeInTheDocument();

    // Click to show comments
    fireEvent.click(toggleButton);

    const addCommentHeading = screen.getByText(/add comment/i);
    expect(addCommentHeading).toBeInTheDocument();

    // Click to hide comments
    fireEvent.click(toggleButton);

    expect(screen.queryByText(/add comment/i)).not.toBeInTheDocument();
  });

  it('should add a comment when the form is submitted', () => {
    render(<Comments />);

    // Show the comment section
    fireEvent.click(screen.getByText(/show comments/i));

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const commentInput = screen.getByPlaceholderText(/enter your comment/i);
    const submitButton = screen.getByText(/submit comment/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(commentInput, {
      target: { value: 'This is a test comment.' },
    });
    fireEvent.click(submitButton);

    // Check if the comment is added
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a test comment\./i)).toBeInTheDocument();
  });
});