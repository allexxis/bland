export const Image = ({ src, width, height, alt, className }: any) => {
   return (
      <img
         src={src}
         width={width}
         height={height}
         alt={alt}
         className={className}
      />
   );
};
