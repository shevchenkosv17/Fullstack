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

  return (
    <div className="form-container">
      <h2>Альтернативна реєстрація (Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          id="hook-name"
          label="Ваше ім'я:"
          error={errors.name?.message}
          touched={touchedFields.name}
          {...register('name', { 
            required: "Це поле є обов'язковим", 
            minLength: { value: 2, message: 'Мінімум 2 символи' } 
          })}
        />

        <Input
          id="hook-email"
          label="Електронна пошта:"
          type="email"
          error={errors.email?.message}
          touched={touchedFields.email}
          {...register('email', { 
            required: "Це поле є обов'язковим", 
            pattern: { 
              value: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z0-9]{2,}\$", "i"), 
              message: 'Некоректний формат електронної пошти' 
            } 
          })}
        />

        <Input
          id="hook-phone"
          label="Номер телефону:"
          type="tel"
          placeholder="+380"
          error={errors.phone?.message}
          touched={touchedFields.phone}
          {...register('phone', { 
            required: "Це поле є обов'язковим", 
            minLength: { value: 10, message: 'Введіть корисний номер' } 
          })}
        />

        <Input
          id="hook-date"
          label="Дата народження:"
          type="date"
          error={errors.birthdate?.message}
          touched={touchedFields.birthdate}
          {...register('birthdate', { required: "Це поле є обов'язковим" })}
        />

        <button type="submit" className="submit-btn" style={{ background: '#28a745' }}>
          Відправити через Hook Form
        </button>
      </form>
    </div>
  );
}
