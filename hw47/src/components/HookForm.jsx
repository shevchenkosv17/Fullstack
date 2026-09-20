import { useForm } from 'react-hook-form';
import Input from './Input';

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthdate: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    alert(`Форму React Hook Form успішно відправлено!\nІм'я: ${data.name}\nТелефон: ${data.phone}`);
    reset();
  };

  const nameReg = register('name', { required: 'Це поле є обов\'язковим', minLength: { value: 2, message: 'Мінімум 2 символи' } });
  const emailReg = register('email', { 
    required: 'Це поле є обов\'язковим', 
    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9]{2,}\$/i, message: 'Некоректний формат електронної пошти' } 
  });
  const phoneReg = register('phone', { required: 'Це поле є обов\'язковим', minLength: { value: 10, message: 'Введіть корисний номер' } });
  const dateReg = register('birthdate', { required: 'Це поле є обов\'язковим' });

  return (
    <div className="form-container">
      <h2>Альтернативна реєстрація (Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          id="hook-name"
          label="Ваше ім'я:"
          name={nameReg.name}
          onChange={nameReg.onChange}
          onBlur={nameReg.onBlur}
          error={errors.name?.message}
          touched={touchedFields.name}
        />

        <Input
          id="hook-email"
          label="Електронна пошта:"
          name={emailReg.name}
          type="email"
          onChange={emailReg.onChange}
          onBlur={emailReg.onBlur}
          error={errors.email?.message}
          touched={touchedFields.email}
        />

        <Input
          id="hook-phone"
          label="Номер телефону:"
          name={phoneReg.name}
          type="tel"
          placeholder="+380"
          onChange={phoneReg.onChange}
          onBlur={phoneReg.onBlur}
          error={errors.phone?.message}
          touched={touchedFields.phone}
        />

        <Input
          id="hook-date"
          label="Дата народження:"
          name={dateReg.name}
          type="date"
          onChange={dateReg.onChange}
          onBlur={dateReg.onBlur}
          error={errors.birthdate?.message}
          touched={touchedFields.birthdate}
        />

        <button type="submit" className="submit-btn" style={{ background: '#28a745' }}>
          Відправити через Hook Form
        </button>
      </form>
    </div>
  );
}
