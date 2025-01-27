"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function CloudImage({src,class_,width,height,alt}:{src:string,class_:string,width:number,height:number,alt:string}) {
  return (
    <CldImage
      src={src} // Use this sample image or upload your own via the Media Explorer
      className={class_}
      width={width}
      height={height}
      quality={'auto'}
      format='auto'
      alt={alt}
      gravity='auto'
      crop={{
        type: 'auto',
        source: true
      }}
    />
  );
}