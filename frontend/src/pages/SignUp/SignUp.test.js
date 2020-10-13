import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Button, TextField } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';

import { SignUp } from './SignUp';
import { rootReducer } from '../../store/reducers/index';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
    jest.clearAllMocks();
  });

  it('should render inputs on first load', () => {
    const mockStore = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );

    const textField = wrapper.find(TextField);
    expect(textField.find({ label: 'Email' }).exists()).toBe(true);
    expect(textField.find({ label: 'Nome' }).exists()).toBe(true);
    expect(textField.find({ label: 'CPF' }).exists()).toBe(true);
    expect(textField.find({ label: 'Celular' }).exists()).toBe(true);
  });

  it('should show invalid if any input is empty', () => {
    const mockStore = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );
    wrapper.find(Button).simulate('submit');

    expect(wrapper.find(TextField).at(0).props().helperText).toBe(
      'Email inválido!',
    );
    expect(wrapper.find(TextField).at(1).props().helperText).toBe(
      'Nome inválido!',
    );
    expect(wrapper.find(TextField).at(2).props().helperText).toBe(
      'CPF inválido!',
    );
    expect(wrapper.find(TextField).at(3).props().helperText).toBe(
      'Telefone Celular inválido!',
    );
  });

  it('should show invalid email if input has invalid email', () => {
    const mockStore = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );

    wrapper.find(TextField).at(0).props().value = 'otavio@otavio';
    expect(wrapper.find(TextField).at(0).props().value).toBe('otavio@otavio');
    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).at(0).props().helperText).toBe(
      'Email inválido!',
    );
  });

  it('should show invalid name if input has less than 5 chars', () => {
    const mockStore = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );

    wrapper.find(TextField).at(1).props().value = 'qwer';
    expect(wrapper.find(TextField).at(1).props().value).toBe('qwer');

    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).at(1).props().helperText).toBe(
      'Nome inválido!',
    );
  });

  it('should show invalid document if input has less than 14 chars', () => {
    const mockStore = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );

    wrapper.find(TextField).at(2).props().value = '111.111.111';
    expect(wrapper.find(TextField).at(2).props().value).toBe('111.111.111');

    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).at(2).props().helperText).toBe(
      'CPF inválido!',
    );
  });

  it('should show invalid phone if input has less than 15 chars', () => {
    const mockStore = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>,
    );

    wrapper.find(TextField).at(2).props().value = '(11) 11111-111';
    expect(wrapper.find(TextField).at(2).props().value).toBe('(11) 11111-111');

    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).at(3).props().helperText).toBe(
      'Telefone Celular inválido!',
    );
  });
});

// describe('<SignUp /> Password', () => {
//   const initialState = {
//     auth: {
//       error: null,
//       loading: false,
//       token: null,
//       registered: true,
//       authenticated: false,
//     },
//   };
//   let mount;

//   beforeEach(() => {
//     mount = createMount();
//   });

//   afterEach(() => {
//     mount.cleanUp();
//   });

//   it('should render password input on user entered valid email', () => {
//     const mockStore = createStore(rootReducer, { ...initialState });

//     const wrapper = mount(
//       <Provider store={mockStore}>
//         <SignUp />
//       </Provider>,
//     );

//     expect(wrapper.find(TextField).find({ label: 'Email' }).exists()).toBe(
//       false,
//     );
//     expect(wrapper.find(TextField).find({ label: 'Senha' }).exists()).toBe(
//       true,
//     );
//   });

//   it('should show invalid password if input empty or less than 5 chars', () => {
//     const mockStore = createStore(rootReducer, { ...initialState });
//     const wrapper = mount(
//       <Provider store={mockStore}>
//         <SignUp />
//       </Provider>,
//     );

//     expect(
//       wrapper.find(TextField).find({ helperText: 'Senha inválida!' }).exists(),
//     ).toBe(false);
//     wrapper.find(Button).simulate('submit');
//     expect(
//       wrapper.find(TextField).find({ helperText: 'Senha inválida!' }).exists(),
//     ).toBe(true);
//   });
// });
