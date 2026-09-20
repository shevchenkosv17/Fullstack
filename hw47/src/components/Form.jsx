import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

export default function Form() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Ім\'я має бути не менше 2 символів')
        .required('Це поле є обов\'язковим'),
      email: Yup.string()
        .email('Некоректний формат електронної пошти')
        .required('Це поле є обов\'язковим'),
      password: Yup.string()
        .min(6, 'Пароль має містити не менше 6 символів')
        .required('Це поле є обов\'язковим')
    }),
    onSubmit: (values, { resetForm }) => {
      alert(`Форму успішно відправлено!\nІм'я: ${values.name}\nEmail: ${values.email}`);
      resetForm();
    }
  });

  return (
    <div className="form-container">
      <h2>Реєстрація користувача Iveco Green Power</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input
          id="formik-name"
          label="Ваше ім'я:"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
        />

        <Input
          id="formik-email"
          label="Електронна пошта:"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <Input
          id="formik-password"
          label="Пароль:"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <button type="submit" className="submit-btn">
          Зареєструватися
        </button>
      </form>
    </div>
  );
}
