import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { IdentityServer4MicroServiceClient } from 'jixiu.identityserver.angular2';

@Directive({
  selector: 'input[uploader]'
})
export class UploaderDirective {

  @Output() success: any = new EventEmitter();

  constructor(private el: ElementRef,
    private api: IdentityServer4MicroServiceClient) {
  }

  @HostListener('change',['$event'])
  fileChange(event)
  {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0)
    {
      let file: File = fileList[0];

      let formData: FormData = new FormData();

      formData.append('value', file, file.name);
      
      this.api.FileImage(formData).subscribe(x =>
      {
        this.success.emit(x.data);
      })
    }
  }

}
