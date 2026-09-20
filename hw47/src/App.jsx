import FormikForm from './components/Form';
import HookForm from './components/HookForm';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '40px', textAlign: 'center' }}>Тестування форм та валідації даних</h1>
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '1000px' }}>
        <FormikForm />
        <HookForm />
      </div>
    </div>
  );
}
