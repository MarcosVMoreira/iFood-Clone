import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Logo } from '../../../components/Shared/Logo/Logo';
import { Toast } from '../../../components/Shared/Toast/Toast';
import {
  validateDocument,
  validateEmail,
  validateName,
  validatePhone,
} from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './SignUp.module.scss';

export const SignUp = props => {
  /* Redux Selectors */
  const signUpMail = useSelector(state => state.auth.signUpMail);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);
  const success = useSelector(state => state.signUp.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCustomerSignUp = form => dispatch(actions.customerSignUp(form));
  const onErrorReset = () => dispatch(actions.errorReset());
  const onAuthReset = () => dispatch(actions.authReset());

  /* React State Hooks (if the user tried to Login using a non-existing mail
    we initialize the form with the attempted mail) */
  const [form, setForm] = useState({
    email: signUpMail || '',
    name: '',
    phone: '',
    document: '',
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
  });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      document: validateDocument(form.document),
    });
  }, [form]);

  // On Logo click redirect to login page
  const handleReset = () => {
    onErrorReset();
    props.history.push('/customer/login');
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      onAuthReset() &&
      onCustomerSignUp(form);
  };

  // Set Toast
  const setToast = message => {
    return (
      <Snackbar
        open={true}
        autoHideDuration={10000}
        onClose={() => (toast = '')}
      >
        <Toast onClose={() => (toast = '')} severity="error">
          {message}
        </Toast>
      </Snackbar>
    );
  };

  let toast;
  let redirect;
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (toast = setToast('Erro de de formulário, preencha todos os campos!'));
  // If we get a 403 error, it means the user is trying to access something it doesn't have access
  error === 403 &&
    (toast = setToast(
      'Erro de permissão, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 404 error, it means the user reached a null pointer!
  error === 404 &&
    (toast = setToast(
      'Erro de acesso, contate um administrador caso continue vendo este erro!',
    ));
  // If we get 500, 503 or 504 redirects the user to not found page
  (error === 500 || error === 503 || error === 504) &&
    (redirect = <Redirect to="/not-found" />);
  // If register was successful redirects to home!
  redirect = success && <Redirect to="/customer/login" />;

  return (
    <div className={classes.container}>
      {redirect}
      {toast}

      <Grid container className={classes.container_body}>
        <Grid item xs={12} sm={5} className={classes.container_body__wrapper}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Logo handleClick={handleReset} />

                <Grid container item justify="center">
                  <span className={classes.card_title}>
                    Cadastre-se para acessar
                  </span>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.email}
                      error={(!valid.email && submitted) || error === 422}
                      onChange={handleChange}
                      helperText={
                        (!valid.email && submitted && 'Email inválido!') ||
                        (error === 422 && 'Email já cadastrado!')
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <TextField
                      name="name"
                      label="Nome"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.name}
                      error={!valid.name && submitted}
                      onChange={handleChange}
                      helperText={!valid.name && submitted && 'Nome inválido!'}
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <InputMask
                      mask="999.999.999-99"
                      value={form.document}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="document"
                          label="CPF"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.document && submitted}
                          helperText={
                            !valid.document && submitted && 'CPF inválido!'
                          }
                        />
                      )}
                    </InputMask>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={form.phone}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="phone"
                          label="Celular"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.phone && submitted}
                          helperText={
                            !valid.phone &&
                            submitted &&
                            'Telefone Celular inválido!'
                          }
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions className={classes.card_actions}>
                <Grid container item justify="center" xs={12} sm={9}>
                  <Button
                    type="submit"
                    size="large"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    className={classes.card_actions__button}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      'Enviar'
                    )}
                  </Button>
                </Grid>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
