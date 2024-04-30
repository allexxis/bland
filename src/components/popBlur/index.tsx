import { cn } from '@/utils';
import type { FC } from 'react';

interface PopBlurProps {
   className?: string;
   setShowPopup: (show: boolean) => void;
   children: React.ReactNode;
   show: boolean;
}
const PopBlur: FC<PopBlurProps> = ({
   className,
   setShowPopup,
   children,
   show,
}) => {
   if (!show) {
      return <></>;
   }
   return (
      <div className={className}>
         <div
            id="signin-overlay"
            onClick={() => setShowPopup(false)}
            aria-hidden="true"
            className="fixed inset-0 w-full h-full backdrop-blur-xl bg-black/50 cursor-pointer z-[9]"
         ></div>
         <div
            id="gg"
            className={cn(
               'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
               'bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center',
               'z-[20000]'
            )}
         >
            {children}
         </div>
      </div>
   );
};
export default PopBlur;
