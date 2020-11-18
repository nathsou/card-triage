import React from 'react';
import App from '../App';
import cards from '../../../server/cards.json';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // clean up
  unmountComponentAtNode(container);
  container.remove();
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null
}))

const simulateCardFetching = () => {
  ///@ts-expect-error - missing properties in fetch response
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(cards),
      status: 200
    })
  );
};

it('renders', async () => {
  await act(async () => {
    simulateCardFetching();
    render(<App/>, container);
  });

  ///@ts-ignore - no types for some reason
  global.fetch.mockRestore();
});

it('filters by status correctly', async () => {
  await act(async () => {
    simulateCardFetching();
    render(<App/>, container);
  });

  const name = container.querySelectorAll('.card-header h2')[0].textContent;

  act(() => {
    // simulate a status change on the first todo card
    (document.querySelectorAll('.status-tag')[0] as HTMLDivElement).click();
  });

  const doneCards = document.querySelectorAll('.card-list')[1];
  const doneCardsNames = [
    ...doneCards.querySelectorAll('.card-header h2')
    .values()
  ].map((h2 => (h2 as HTMLElement).textContent));

  expect(doneCardsNames.includes(name)).toBeTruthy();

  ///@ts-ignore - no types for some reason
  global.fetch.mockRestore();
});