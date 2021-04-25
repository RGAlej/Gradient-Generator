import {
  fireEvent,
  renderWithRouter,
  screen,
  waitFor,
} from './utils/testing_library_utils';
import userEvent from '@testing-library/user-event';

import { RouteModel } from '../models/ManagementState.model';
import App from '../App';

describe('App base functionality', () => {
  test('render App at Home Route and check Title, Toggle Theme and Home components', () => {
    renderWithRouter(<App />, { route: RouteModel.HOME });

    const title = screen.getByRole('link', { name: 'gradient generator' });
    expect(title).toBeInTheDocument();

    const sun = screen.getByTestId('sun');
    const moon = screen.getByTestId('moon');
    expect(sun).toBeInTheDocument();
    expect(moon).toBeInTheDocument();

    const startBtn = screen.getByRole('link', { name: 'start' });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    expect(window.location.pathname).toBe(RouteModel.GRADIENT);
  });

  test('render App at Gradient Route and check Gradient Box, Header, Navigation and Toggle theme components', () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const title = screen.getByRole('link', { name: 'gradient generator' });
    expect(title).toBeInTheDocument();

    const sun = screen.getByTestId('sun');
    const moon = screen.getByTestId('moon');
    expect(sun).toBeInTheDocument();
    expect(moon).toBeInTheDocument();

    const list = screen.getByRole('list');
    const navigation = screen.getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(navigation).toHaveLength(6);

    const gradientBox = screen.getByTestId('box');
    expect(gradientBox).toBeInTheDocument();
  });
});

describe('App functionality', () => {
  test('check add colors and remove color functions', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');
    // make sure that navigation4 is the add color button
    const addColorBtn = navigation[4];
    userEvent.hover(addColorBtn);
    const addColorTooltip = await screen.findByRole('complementary');
    expect(addColorTooltip).toHaveTextContent('add color');

    // appearance of AnglePopup Popup
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(2);

    // add color
    userEvent.click(addColorBtn);
    const colorListUpdatedWithAddColor = await screen.findAllByTestId('color');
    expect(colorListUpdatedWithAddColor).toHaveLength(3);

    // remove 3th color
    userEvent.dblClick(colorListUpdatedWithAddColor[2]);
    const colorListUpdatedWithRemoveColor = await screen.findAllByTestId(
      'color'
    );
    expect(colorListUpdatedWithRemoveColor).toHaveLength(2);
  });

  test('remove colors dragging', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });
    const colorList = screen.getAllByTestId('color');
    const color1 = colorList[0] as HTMLInputElement;
    expect(color1).toHaveAttribute('draggable', 'false');

    // trash should be hidden in the document
    const trash = await screen.findByTestId('trash');
    expect(trash).toHaveClass('trash');

    const navigation = screen.getAllByRole('listitem');
    // make sure that navigation4 is the add color button
    const addColorBtn = navigation[4];
    userEvent.hover(addColorBtn);
    const addColorTooltip = await screen.findByRole('complementary');
    expect(addColorTooltip).toHaveTextContent('add color');

    // add color
    userEvent.click(addColorBtn);
    const colorListUpdated = screen.getAllByTestId('color');
    expect(colorListUpdated).toHaveLength(3);
    expect(color1).toHaveAttribute('draggable', 'true');
  });

  test('check if touch move event works to remove color', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });
    // make sure that navigation4 is the add color button
    const navigation = screen.getAllByRole('listitem');
    const addColorBtn = navigation[4];
    userEvent.hover(addColorBtn);
    const addColorTooltip = await screen.findByRole('complementary');
    expect(addColorTooltip).toHaveTextContent('add color');

    // add color
    userEvent.click(addColorBtn);
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(3);
    const color3 = colorList[2];

    fireEvent.touchMove(color3);
    expect(color3).toHaveClass('removing');
    await waitFor(() => expect(color3).not.toBeInTheDocument(), {
      timeout: 1000,
    });

    const colorListUpdated = screen.getAllByTestId('color');
    expect(colorListUpdated).toHaveLength(2);
  });

  test('check angle input functionality', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');

    // make sure that navigation1 is the modify angle button
    const angleNavBtn = navigation[1];
    userEvent.hover(angleNavBtn);
    const tooltip = await screen.findByRole('complementary');
    expect(tooltip).toHaveTextContent('modify angle');

    // display popup
    userEvent.click(angleNavBtn);
    const anglePopupTitle = screen.getByRole('heading', {
      level: 3,
      name: 'what is the angle which you want for your gradient?',
    });
    expect(anglePopupTitle).toBeInTheDocument();

    // check default value of angle input
    const input = await screen.findByRole('spinbutton');
    expect(input).toHaveValue(90);

    // check that works
    userEvent.type(input, '34');

    const codeTextArea = screen.getByRole('textbox');
    expect(codeTextArea).toHaveTextContent('34deg');

    // check that text area doesn't display a value higher than 360 degrees
    userEvent.clear(input);
    userEvent.type(input, '370');
    expect(codeTextArea).toHaveTextContent('10deg');
  });

  test('check code copied alert', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');
    // make sure that navigation3 is the copy button
    const copyNavBtn = navigation[3];
    userEvent.hover(copyNavBtn);
    const tooltip = await screen.findByRole('complementary');
    expect(tooltip).toHaveTextContent('copy code');

    // display popup
    userEvent.click(copyNavBtn);

    const popupTitle = screen.getByRole('heading', {
      level: 1,
      name: 'copied to clipboard!',
    });
    expect(popupTitle).toBeInTheDocument();

    // wait for a timeout of 3000ms
    await waitFor(() => expect(popupTitle).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  });

  test('hint popup', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');

    // make sure that navigation5 is the hint button
    const hintBtn = navigation[5];
    userEvent.hover(hintBtn);
    const tooltip = await screen.findByRole('complementary');
    expect(tooltip).toHaveTextContent('hint');

    // display popup
    userEvent.click(hintBtn);

    const popupTitle = screen.getByRole('heading', {
      level: 3,
      name: 'Gradient Generator by AlejRG',
    });
    expect(popupTitle).toBeInTheDocument();

    // close popup
    const exitBtn = screen.getByTestId('exit-btn');
    userEvent.click(exitBtn);

    expect(popupTitle).not.toBeInTheDocument();
  });

  test('limit colors popup', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');

    // make sure that navigation 4 is the add color button
    const addColorBtn = navigation[4];
    userEvent.hover(addColorBtn);
    const addColorTooltip = await screen.findByRole('complementary');
    expect(addColorTooltip).toHaveTextContent('add color');

    // increase colors to 8
    for (let i = 8; i >= 2; i--) {
      userEvent.click(addColorBtn);
    }
    const colorList = await screen.findAllByTestId('color');
    expect(colorList).toHaveLength(8);

    // display limit color popup and check that color list maintain length equal to 8
    userEvent.click(addColorBtn);
    const colorListUpdated = await screen.findAllByTestId('color');
    expect(colorListUpdated).toHaveLength(8);

    const colorLimitPopupTitle = screen.getByRole('heading', {
      level: 3,
      name: '8 colors are no enough?',
    });
    expect(colorLimitPopupTitle).toBeInTheDocument();

    // close popup
    const exitBtn = colorLimitPopupTitle.parentElement!.children.item(1);
    userEvent.click(exitBtn!);
    expect(colorLimitPopupTitle).not.toBeInTheDocument();
  });

  test('toggle radial/linear gradient', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });
    const navigation = screen.getAllByRole('listitem');
    const convertToRadialBtn = navigation[0];

    // make sure that navigation0 is convert to radial button
    userEvent.hover(convertToRadialBtn);
    const radialTooltip = await screen.findByRole('complementary');
    expect(radialTooltip).toHaveTextContent('convert to radial');

    // toggle to radial gradient
    userEvent.click(convertToRadialBtn);
    const codeTextArea = screen.getByRole('textbox');
    expect(codeTextArea).toHaveTextContent('radial-gradient');

    // toggle to linear gradient again
    const navigationUpdated = screen.getAllByRole('listitem');
    const convertToLinearBtn = navigationUpdated[0];

    userEvent.hover(convertToLinearBtn);
    const linearTooltip = await screen.findByRole('complementary');
    expect(linearTooltip).toHaveTextContent('convert to linear');

    userEvent.click(convertToLinearBtn);
    expect(codeTextArea).toHaveTextContent('linear-gradient');
  });

  test('length popup functionality', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });
    const navigation = screen.getAllByRole('listitem');
    const lengthBtn = navigation[2];

    // make sure that navigation 2 is modify length button
    userEvent.hover(lengthBtn);
    const tooltip = await screen.findByRole('complementary');
    expect(tooltip).toHaveTextContent('modify length of each colo');

    // display popup
    userEvent.click(lengthBtn);

    const popupTitle = screen.getByRole('heading', {
      level: 3,
      name: 'what length do you want for each color?',
    });
    expect(popupTitle).toBeInTheDocument();

    // check if there are four inputs with two colors
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(4);

    // check default values
    const input0 = inputs[0] as HTMLInputElement;
    const input1 = inputs[1] as HTMLInputElement;
    expect(input0.value).toBe('');
    expect(input1.value).toBe('');

    // type percentages and check their values
    userEvent.type(input0, '33');
    userEvent.type(input1, '66');

    expect(input0.value).toBe('33');
    expect(input1.value).toBe('66');

    // check that should be written input0 and input2 or input1 and input3 as minimum requirement
    // TODO: improve this functionality to allow a single percentage
    const input2 = inputs[2] as HTMLInputElement;
    userEvent.type(input2, '66');

    const codeTextArea = screen.getByRole('textbox');
    expect(codeTextArea).toHaveTextContent(`33% 66%, #FAFFD1 66%`);

    // close popup
    const exitBtn = screen.getByTestId('exit-btn');
    userEvent.click(exitBtn);

    expect(popupTitle).not.toBeInTheDocument();
  });

  test('position functionality', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    // make sure that navigation 0 is radial button
    const navigation = screen.getAllByRole('listitem');
    const radialBtn = navigation[0];

    userEvent.hover(radialBtn);
    const radialTooltip = await screen.findByRole('complementary');
    expect(radialTooltip).toHaveTextContent('convert to radial');

    // convert gradient to radial to find position button
    userEvent.click(radialBtn);

    // make sure that navigation 1 is position button
    const navigationUpdated = screen.getAllByRole('listitem');
    const positionBtn = navigationUpdated[1];

    // make sure that navigationUpdated 1 is position Button
    userEvent.hover(positionBtn);
    const positionTooltip = await screen.findByRole('complementary');
    expect(positionTooltip).toHaveTextContent('change position');

    // open position popup
    userEvent.click(positionBtn);
    const title = screen.getByRole('heading', {
      level: 3,
      name: 'what is the position which you want for your gradient?',
    });
    expect(title).toBeInTheDocument();

    // modify sliders values
    const allSliders = screen.getAllByRole('slider');
    expect(allSliders).toHaveLength(4);

    const slidersY = screen.getAllByLabelText('axis y');
    const slidersX = screen.getAllByLabelText('axis x');
    expect(slidersY).toHaveLength(2);
    expect(slidersX).toHaveLength(2);

    const sliderLengthY = slidersY[0];
    const sliderLengthX = slidersX[0];
    const sliderPositionY = slidersY[1];
    const sliderPositionX = slidersX[1];

    fireEvent.change(sliderLengthX, { target: { value: 56 } });
    fireEvent.change(sliderLengthY, { target: { value: 99 } });
    fireEvent.change(sliderPositionX, { target: { value: 10 } });
    fireEvent.change(sliderPositionY, { target: { value: 33 } });

    expect(sliderLengthX).toHaveValue('56');
    expect(sliderLengthY).toHaveValue('99');
    expect(sliderPositionX).toHaveValue('10');
    expect(sliderPositionY).toHaveValue('33');

    // check position in code text area
    const codeTextArea = screen.getByRole('textbox');
    expect(codeTextArea).toHaveTextContent('radial-gradient(');
    expect(codeTextArea).toHaveTextContent('56% 99% at');
    expect(codeTextArea).toHaveTextContent('at 10% 33%');

    // close popup
    const exitBtn = screen.getByTestId('exit-btn');
    userEvent.click(exitBtn);
    expect(title).not.toBeInTheDocument();
  });

  test('only once popup at the same time', async () => {
    renderWithRouter(<App />, { route: RouteModel.GRADIENT });

    const navigation = screen.getAllByRole('listitem');
    const radialBtn = navigation[0];
    const angleBtn = navigation[1];
    const lengthBtn = navigation[2];
    const copyBtn = navigation[3];
    const addBtn = navigation[4];
    const hintBtn = navigation[5];

    // display any popup
    userEvent.click(angleBtn);
    const anglePopup = screen.getByRole('heading', {
      level: 3,
      name: 'what is the angle which you want for your gradient?',
    });
    expect(anglePopup).toBeInTheDocument();

    // display another popup and check previous popup is missing
    userEvent.click(lengthBtn);
    const lengthPopup = screen.getByRole('heading', {
      level: 3,
      name: 'what length do you want for each color?',
    });
    expect(anglePopup).not.toBeInTheDocument();
    expect(lengthPopup).toBeInTheDocument();

    userEvent.click(copyBtn);
    const copyPopup = screen.getByRole('heading', {
      level: 1,
      name: 'copied to clipboard!',
    });
    expect(lengthPopup).not.toBeInTheDocument();
    expect(copyPopup).toBeInTheDocument();

    userEvent.click(hintBtn);
    const hintPopup = screen.getByRole('heading', {
      level: 3,
      name: 'Gradient Generator by AlejRG',
    });
    expect(hintPopup).toBeInTheDocument();

    userEvent.click(addBtn);
    for (let i = 3; i <= 9; i++) {
      userEvent.click(addBtn);
    }
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(8);
    expect(hintPopup).not.toBeInTheDocument();
    const limitColorsPopup = screen.getByRole('heading', {
      level: 3,
      name: '8 colors are no enough?',
    });
    expect(limitColorsPopup).toBeInTheDocument();

    userEvent.click(radialBtn);
    const navigationUpdated = screen.getAllByRole('listitem');
    const positionBtn = navigationUpdated[1];
    const hintBtn2 = navigationUpdated[5];

    userEvent.click(hintBtn2);
    const hintPopup2 = screen.getByRole('heading', {
      level: 3,
      name: 'Gradient Generator by AlejRG',
    });
    expect(hintPopup2).toBeInTheDocument();

    userEvent.click(positionBtn);
    const positionPopup = screen.getByRole('heading', {
      level: 3,
      name: 'what is the position which you want for your gradient?',
    });
    expect(positionPopup).toBeInTheDocument();
  });
});
