import { PasteleriaFrontendPage } from './app.po';

describe('pasteleria-frontend App', () => {
  let page: PasteleriaFrontendPage;

  beforeEach(() => {
    page = new PasteleriaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
