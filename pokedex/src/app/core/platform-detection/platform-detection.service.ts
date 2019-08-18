import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ 
  providedIn: 'root'
})
export class PlatformDetectionService { 
  constructor(@Inject(PLATFORM_ID) private _platformDetection: string){ }

  isPlatformBrowser(){
    return isPlatformBrowser(this._platformDetection);
  };
};