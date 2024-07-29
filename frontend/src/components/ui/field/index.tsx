import { forwardRef } from 'react';
import clsx from 'clsx';

import type { TypeInputProps } from './index.types';

import classes from './index.module.scss';

const Field = forwardRef<HTMLInputElement, TypeInputProps>(
  ({ error, style, Icon, className, disabled, ...rest }, ref) => {
    return (
      <div>
        <label
          className={clsx(
            classes.field,
            Icon ? classes.fieldWithIcon : '',
            disabled ? classes.disabled : '',
            className,
          )}
          style={style}
        >
          {Icon && <Icon className={classes.icon} />}
          <input ref={ref} disabled={disabled} {...rest} />
        </label>
        {error && <div className={classes.error}>{error.message}</div>}
      </div>
    );
  },
);
Field.displayName = 'Field';

export default Field;
