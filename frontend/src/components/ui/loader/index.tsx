import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

import classes from './index.module.css';

const Loader = ({ className }: { className?: string }) => {
  return <Loader2 className={clsx(classes.loader, className)} />;
};

export default Loader;
