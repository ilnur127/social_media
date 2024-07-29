import { IButton } from './index.types';
import classes from './index.module.scss';
import Loader from '../loader';

const Button = ({ isLoading, children, ...rest }: IButton) => {
  return (
    <button className={classes.button} {...rest}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
