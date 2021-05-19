import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class NavigationItem {
  public link!: string | ElementRef;
  public text!: string;
  public selected: Boolean = false;
  get isAnchor(): Boolean{
    return this.link instanceof ElementRef;
  }

  constructor(link: string | ElementRef, text: string, selected: Boolean = false){
    this.link = link;
    this.text = text;
    this.selected = selected;
  }
}

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  public selected!: number;
  @Input() navItems!: Array<NavigationItem>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.navItems[0].selected = true;
  }

  public navigate(navItem: NavigationItem){
    const oldItem = this.navItems.find(i => i.selected);
    if(oldItem){
      oldItem.selected = false;
    }
    navItem.selected = true;
    if(navItem.isAnchor){
      this.scrollToElement(navItem.link as ElementRef);
    } else {
      this.router.navigateByUrl(navItem.link as string);
    }
  }

  private scrollToElement($element: ElementRef): void {
    $element.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
