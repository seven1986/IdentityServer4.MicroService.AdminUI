import { Directive, ElementRef, HostListener, Output, EventEmitter  } from '@angular/core';
import { CampaignCoreIdentityClient } from 'campaign.core.identity';

@Directive({
  selector: 'input[uploader]'
})
export class UploaderDirective {

  @Output() success: any = new EventEmitter();

  constructor(private el: ElementRef,
    private api: CampaignCoreIdentityClient) {
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

      this.api.ImagePost(formData).subscribe(x =>
      {
        this.success.emit(x.data);
      })
    }
  }

}
