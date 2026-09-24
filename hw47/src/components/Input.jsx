import { forwardRef } from 'react';

const Input = forwardRef(({ id, label, name, type = 'text', onChange, onBlur, error, touched, placeholder }, ref) => {
  const isInvalid = error;
  
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={isInvalid ? 'input-error' : ''}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-describedby={isInvalid ? `${id}-error` : undefined}
      />
      {isInvalid && (
        <div id={`${id}-error`} className="error-message" aria-live="assertive">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
