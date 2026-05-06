import "./LoadingSpinner.scss";

const className = "c-LoadingSpinner";

type LoadingSpinnerProps = {
  label?: string;
};

const LoadingSpinner = ({ label = "Loading" }: LoadingSpinnerProps) => {
  return (
    <span className={className} role="status" aria-label={label}>
      <span className={`${className}__emoji`} aria-hidden="true">
        🍸
      </span>
      <span className={`${className}__label`}>{label}</span>
    </span>
  );
};

export default LoadingSpinner;
