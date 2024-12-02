import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

function Login () {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, formState: {errors, isValid}, } = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'admin'
    },
    mode: 'onChange'
  })
  
  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }
  if (isAuth) {
    return <Navigate to='/'></Navigate>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error = {Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Укажите почту'})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          error = {Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: 'Укажите пароль'})}
          fullWidth
           />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
export default Login