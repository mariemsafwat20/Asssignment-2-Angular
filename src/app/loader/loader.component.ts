import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading:Subject<boolean> = this.loaderSevice.isLoading;
 
  constructor(private loaderSevice:LoaderService) {}


}
