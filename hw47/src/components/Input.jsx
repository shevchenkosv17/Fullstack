export default function Input({ id, label, name, type = 'text', value, onChange, onBlur, error, touched, placeholder }) {
  const isInvalid = touched && error;
  
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
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
}
