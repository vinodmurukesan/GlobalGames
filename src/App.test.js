import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./components/data/automation.json', () => ({
  data: {
    oneClickAutomations: {
      items: [
        {
          id: 1,
          slug: 'example-slug-1',
          sites: [{ logoSmall2x: 'path/to/logo.png', title: 'Example Site 1' }],
          title: 'Example Title 1',
          shortDescription: 'Example Description 1',
          categories: [{ title: 'Category1' }]
        }
      ]
    }
  }
}));

test('renders App component with default filters and mock automations', () => {
  render(<App />);

  expect(screen.getByText('Example Title 1')).toBeInTheDocument();
});
