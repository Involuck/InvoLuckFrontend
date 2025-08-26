import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackDemoPage from '@/app/demo/feedback/page';

// --- KEY PART ---
// Import the provider you need for the test
import { ToastProvider } from '@/components/pure/feedback/toast';

// This helper function is the solution. It creates a wrapper
// that provides the component under test with the ToastProvider.
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe('FeedbackDemoPage Integration', () => {
  it('should display a success toast when the success button is clicked', async () => {
    // --- CORRECT USAGE ---
    // Instead of using `render(<FeedbackDemoPage />)`, use the new helper function.
    renderWithProviders(<FeedbackDemoPage />);

    // Find the button by its accessible name (case-insensitive)
    const successButton = screen.getByRole('button', {
      name: /show success toast/i
    });
    
    // Simulate a user clicking the button
    await userEvent.click(successButton);

    // Assert that the toast appears in the document.
    // We use `findByText` because the element appears asynchronously.
    const toastTitle = await screen.findByText('Success!');
    const toastMessage = await screen.findByText('Your profile has been updated.');

    expect(toastTitle).toBeInTheDocument();
    expect(toastMessage).toBeInTheDocument();
  });
});